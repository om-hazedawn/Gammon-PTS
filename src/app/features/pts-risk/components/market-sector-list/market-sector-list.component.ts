import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-market-sector-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="form-list-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Market Sector Management</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Market sector configuration and management.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .form-list-container {
        padding: 20px;
      }
    `,
  ],
})
export class MarketSectorListComponent {}
