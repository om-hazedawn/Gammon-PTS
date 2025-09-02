import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  PublicClientApplication,
  AccountInfo,
  AuthenticationResult,
  SilentRequest,
} from '@azure/msal-browser';
import { msalConfig, loginRequest, ptsApiScopes } from '../config/msal.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private msalInstance: PublicClientApplication;
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  private _userInfo = new BehaviorSubject<AccountInfo | null>(null);
  private _accessToken = new BehaviorSubject<string | null>(null);

  constructor() {
    this.msalInstance = new PublicClientApplication(msalConfig);
    this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {
    try {
      await this.msalInstance.initialize();

      // Handle redirect response (if returning from login)
      const response = await this.msalInstance.handleRedirectPromise();
      if (response && response.account) {
        this.setActiveAccount(response.account);
        this._accessToken.next(response.accessToken);
      } else {
        // Check if user is already logged in
        const accounts = this.msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          this.setActiveAccount(accounts[0]);
          await this.acquireTokenSilently();
        }
      }
    } catch (error) {
      console.error('MSAL initialization error:', error);
    }
  }

  private setActiveAccount(account: AccountInfo): void {
    this.msalInstance.setActiveAccount(account);
    this._userInfo.next(account);
    this._isAuthenticated.next(true);
  }

  private async acquireTokenSilently(): Promise<string | null> {
    try {
      const account = this.msalInstance.getActiveAccount();
      if (!account) {
        return null;
      }

      const request: SilentRequest = {
        scopes: ptsApiScopes.scopes,
        account: account,
      };

      const response = await this.msalInstance.acquireTokenSilent(request);
      this._accessToken.next(response.accessToken);
      return response.accessToken;
    } catch (error) {
      console.error('Silent token acquisition failed:', error);
      // If silent token acquisition fails, we might need to acquire token interactively
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this._isAuthenticated.value;
  }

  isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  getUserInfo(): AccountInfo | null {
    return this._userInfo.value;
  }

  getUserInfo$(): Observable<AccountInfo | null> {
    return this._userInfo.asObservable();
  }

  getUserDisplayName(): string {
    const userInfo = this._userInfo.value;
    return userInfo ? userInfo.name || userInfo.username || '' : '';
  }

  getUserEmail(): string {
    const userInfo = this._userInfo.value;
    return userInfo ? userInfo.username : '';
  }

  async login(): Promise<void> {
    try {
      // Use redirect for login (recommended for production)
      await this.msalInstance.loginRedirect(loginRequest);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async loginPopup(): Promise<AuthenticationResult | null> {
    try {
      const response = await this.msalInstance.loginPopup(loginRequest);
      if (response && response.account) {
        this.setActiveAccount(response.account);
        this._accessToken.next(response.accessToken);
      }
      return response;
    } catch (error) {
      console.error('Popup login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const account = this.msalInstance.getActiveAccount();
      if (account) {
        await this.msalInstance.logoutRedirect({
          account: account,
          postLogoutRedirectUri: msalConfig.auth.postLogoutRedirectUri,
        });
      }

      this._isAuthenticated.next(false);
      this._userInfo.next(null);
      this._accessToken.next(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async getAccessToken(): Promise<string | null> {
    try {
      // First try to get token silently
      const token = await this.acquireTokenSilently();
      if (token) {
        return token;
      }

      // If silent acquisition fails, try interactive acquisition
      const account = this.msalInstance.getActiveAccount();
      if (!account) {
        throw new Error('No active account found');
      }

      // For redirect-based token acquisition, we need to redirect the user
      // This will cause a page redirect, so we can't return a token directly
      await this.msalInstance.acquireTokenRedirect(ptsApiScopes);
      return null; // Token will be available after redirect
    } catch (error) {
      console.error('Token acquisition error:', error);
      return null;
    }
  }

  getAccessToken$(): Observable<string | null> {
    return this._accessToken.asObservable();
  }

  // Helper method to get token for HTTP interceptors
  getTokenForRequest(): Observable<string | null> {
    return from(this.getAccessToken()).pipe(
      catchError((error) => {
        console.error('Error getting token for request:', error);
        return of(null);
      })
    );
  }

  // Check if user has specific role or permission
  hasRole(role: string): boolean {
    const account = this._userInfo.value;
    if (!account) return false;

    // Extract roles from account claims if available
    const roles = (account.idTokenClaims?.['roles'] as string[]) || [];
    return roles.includes(role);
  }

  // Check if user has specific permission
  hasPermission(permission: string): boolean {
    const account = this._userInfo.value;
    if (!account) return false;

    // Extract permissions from account claims if available
    const permissions = (account.idTokenClaims?.['permissions'] as string[]) || [];
    return permissions.includes(permission);
  }
}
