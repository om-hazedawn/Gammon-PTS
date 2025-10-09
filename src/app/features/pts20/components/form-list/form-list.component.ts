import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Form20ListService, Form20List } from '../../../../core/services/Form20/form20list.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="form-list-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Form 20 List</mat-card-title>
          <mat-card-subtitle>Procurement Tender Forms</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="actions">
            <button mat-raised-button color="primary" routerLink="/pts20/form/new">
              <mat-icon>add</mat-icon>
              New Form
            </button>
          </div>

          <div *ngIf="loading" class="loading-spinner">
            <mat-spinner diameter="40"></mat-spinner>
          </div>

          <table mat-table [dataSource]="forms" class="forms-table" *ngIf="!loading">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let form">{{ form.id }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Tender Status</th>
              <td mat-cell *matCellDef="let form">{{ form.status }}</td>
            </ng-container>

            <ng-container matColumnDef="tenderNo">
              <th mat-header-cell *matHeaderCellDef>Tender No</th>
              <td mat-cell *matCellDef="let form">{{ form.tenderNo }}</td>
            </ng-container>

            <ng-container matColumnDef="businessUnitCode">
              <th mat-header-cell *matHeaderCellDef>Business Unit</th>
              <td mat-cell *matCellDef="let form">{{ form.businessUnitCode }}</td>
            </ng-container>

            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Title</th>
              <td mat-cell *matCellDef="let form">{{ form.title }}</td>
            </ng-container>

            <ng-container matColumnDef="country">
              <th mat-header-cell *matHeaderCellDef>Country</th>
              <td mat-cell *matCellDef="let form">{{ form.country }}</td>
            </ng-container>

            <ng-container matColumnDef="client">
              <th mat-header-cell *matHeaderCellDef>Client</th>
              <td mat-cell *matCellDef="let form">{{ form.client }}</td>
            </ng-container>

            <ng-container matColumnDef="contractDetails">
              <th mat-header-cell *matHeaderCellDef>Contract Value/Period</th>
              <td mat-cell *matCellDef="let form">
                {{ form.approximateValue | number }} {{ form.currency }} / {{ form.period }} {{ form.periodUnit }}
                <span *ngIf="form.approximateValueRemark" class="remark"> ({{ form.approximateValueRemark }})</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="bidTypeId">
              <th mat-header-cell *matHeaderCellDef>Bid Type</th>
              <td mat-cell *matCellDef="let form">{{ form.bidTypeId }}</td>
            </ng-container>

            <ng-container matColumnDef="dueDate">
              <th mat-header-cell *matHeaderCellDef>Due Date</th>
              <td mat-cell *matCellDef="let form">{{ form.dueDate | date }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .form-list-container {
        padding: 20px;
      }

      .actions {
        margin-bottom: 20px;
      }

      .forms-table {
        width: 100%;
      }

      mat-card {
        margin-bottom: 20px;
      }

      .loading-spinner {
        display: flex;
        justify-content: center;
        padding: 20px;
      }

      .remark {
        color: #666;
        font-size: 0.9em;
      }

      .mat-mdc-row:hover {
        background-color: #f5f5f5;
        cursor: pointer;
      }
    `,
  ],
})
export class FormListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'status',
    'tenderNo',
    'businessUnitCode',
    'title',
    'country',
    'client',
    'contractDetails',
    'bidTypeId',
    'dueDate'
  ];

  forms: Form20List[] = [];
  loading = false;

  constructor(
    private form20ListService: Form20ListService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadForms();
  }
loadForms(): void {
  this.loading = true;
  this.form20ListService.getForm20List().subscribe({
    next: (data) => {
      this.forms = data;
      this.loading = false;
    },
    error: (error) => {
      console.error('Error loading forms:', error);
      this.loading = false;
      this.snackBar.open('Error loading forms. Please try again.', 'Close', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    }
  });
}
  
}
