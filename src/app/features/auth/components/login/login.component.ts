import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule],
  template: `
    <div class="login-container">
      <mat-card class="login-card animate-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>security</mat-icon>
            PTS - Procurement Tender System
          </mat-card-title>
          <mat-card-subtitle>Please sign in with your Azure AD account</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="login-content">
            <p>
              You need to authenticate with Azure Active Directory to access the Procurement Tender System.
            </p>

            <div *ngIf="isLoading" class="loading-container">
              <mat-spinner diameter="40"></mat-spinner>
              <p>Signing you in...</p>
            </div>

            <div *ngIf="errorMessage" class="error-message enhanced-error">
              <mat-icon color="warn">error</mat-icon>
              <span>{{ errorMessage }}</span>
            </div>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button
            mat-raised-button
            color="primary"
            (click)="signIn()"
            [disabled]="isLoading"
            class="sign-in-button enhanced-btn"
          >
            <mat-icon>login</mat-icon>
            Sign in with Microsoft
          </button>

          <button mat-stroked-button (click)="signInPopup()" [disabled]="isLoading" class="popup-button enhanced-btn">
            <mat-icon>open_in_new</mat-icon>
            Sign in (Popup)
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
        padding: 20px;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      }

      .login-card {
        max-width: 400px;
        width: 100%;
        text-align: center;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
        border-radius: 18px;
        transition: box-shadow 0.3s;
      }

      .animate-card {
        animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1);
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .logo-container {
        display: flex;
        justify-content: center;
        margin-top: 24px;
        margin-bottom: 8px;
      }

      .login-logo {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(31, 38, 135, 0.15);
        background: #fff;
        object-fit: contain;
      }

      .login-content {
        margin: 20px 0;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        margin: 20px 0;
      }

      .error-message {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #f44336;
        background: #ffebee;
        padding: 12px;
        border-radius: 4px;
        margin: 16px 0;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(244, 67, 54, 0.08);
      }

      .enhanced-error {
        font-size: 1.1em;
        border-left: 4px solid #f44336;
      }

      .sign-in-button {
        width: 100%;
        margin-bottom: 8px;
      }

      .popup-button {
        width: 100%;
      }

      .enhanced-btn {
        font-size: 1.05em;
        font-weight: 500;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
        transition: background 0.2s, box-shadow 0.2s;
      }
      .enhanced-btn:hover:not([disabled]) {
        background: #1565c0;
        color: #fff;
        box-shadow: 0 4px 16px rgba(25, 118, 210, 0.15);
      }

      mat-card-title {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #1976d2;
      }

      mat-card-title mat-icon {
        font-size: 24px;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  errorMessage = '';
  returnUrl = '/dashboard';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get return URL from query parameters
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    // Check if user is already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  async signIn(): Promise<void> {
    try {
      this.isLoading = true;
      this.errorMessage = '';

      await this.authService.login();
      // After redirect, user will be back at the callback URL
    } catch (error: any) {
      console.error('Login failed:', error);
      this.errorMessage = error.message || 'Login failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  async signInPopup(): Promise<void> {
    try {
      this.isLoading = true;
      this.errorMessage = '';

      const result = await this.authService.loginPopup();
      if (result) {
        this.router.navigate([this.returnUrl]);
      }
    } catch (error: any) {
      console.error('Popup login failed:', error);
      this.errorMessage = error.message || 'Login failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
