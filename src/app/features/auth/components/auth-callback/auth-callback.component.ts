import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, MatIconModule],
  template: `
    <div class="callback-container">
      <mat-card class="callback-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>security</mat-icon>
            Authentication
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="callback-content">
            <div *ngIf="isProcessing">
              <div class="loading-container">
                <mat-spinner diameter="40"></mat-spinner>
                <p>Processing authentication response...</p>
              </div>
            </div>

            <div *ngIf="isSuccess" class="success-message">
              <mat-icon color="primary">check_circle</mat-icon>
              <p>Authentication successful! Redirecting...</p>
            </div>

            <div *ngIf="errorMessage" class="error-message">
              <mat-icon color="warn">error</mat-icon>
              <p>{{ errorMessage }}</p>
              <button mat-button color="primary" (click)="goToLogin()">Try Again</button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .callback-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
        padding: 20px;
      }

      .callback-card {
        max-width: 400px;
        width: 100%;
        text-align: center;
      }

      .callback-content {
        margin: 20px 0;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        margin: 20px 0;
      }

      .success-message,
      .error-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 16px;
        border-radius: 4px;
        margin: 16px 0;
      }

      .success-message {
        color: #4caf50;
        background: #e8f5e8;
      }

      .error-message {
        color: #f44336;
        background: #ffebee;
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
export class AuthCallbackComponent implements OnInit {
  isProcessing = true;
  isSuccess = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      // Wait a moment for MSAL to process the redirect response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (this.authService.isAuthenticated()) {
        this.isSuccess = true;
        this.isProcessing = false;

        // Get return URL from query parameters
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

        // Redirect after a short delay to show success message
        setTimeout(() => {
          this.router.navigate([returnUrl]);
        }, 1500);
      } else {
        throw new Error('Authentication was not successful');
      }
    } catch (error: any) {
      console.error('Auth callback error:', error);
      this.errorMessage = error.message || 'Authentication failed';
      this.isProcessing = false;
    }
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
