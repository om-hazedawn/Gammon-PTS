import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tender-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Tender Risk Management</mat-card-title>
          <mat-card-subtitle>Risk assessment for tenders</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>
            This page will contain the tender risk management functionality migrated from the
            pts-risk module.
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
      }
    `,
  ],
})
export class TenderListComponent {}
