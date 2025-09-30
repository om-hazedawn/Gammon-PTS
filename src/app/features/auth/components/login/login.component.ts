import { Component } from '@angular/core';
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
      <mat-card class="login-card">
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
              You need to authenticate with Azure Active Directory to access the Procurement Tender
              System.
            </p>

            @if (isLoading) {
              <div class="loading-container">
                <mat-spinner diameter="40"></mat-spinner>
                <p>Signing you in...</p>
              </div>
            }

            @if (errorMessage) {
              <div class="error-message">
                <mat-icon color="warn">error</mat-icon>
                <p>{{ errorMessage }}</p>
              </div>
            }
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button
            mat-raised-button
            color="primary"
            (click)="signIn()"
            [disabled]="isLoading"
            class="sign-in-button"
          >
            <mat-icon>login</mat-icon>
            Sign in with Microsoft
          </button>

          <button mat-button (click)="signInPopup()" [disabled]="isLoading" class="popup-button">
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
      }

      .sign-in-button {
        width: 100%;
        margin-bottom: 8px;
      }

      .popup-button {
        width: 100%;
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
export class LoginComponent {
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
