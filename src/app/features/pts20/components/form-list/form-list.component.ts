import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

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

          <table mat-table [dataSource]="forms" class="forms-table">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let form">{{ form.id }}</td>
            </ng-container>

            <ng-container matColumnDef="tenderNo">
              <th mat-header-cell *matHeaderCellDef>Tender No</th>
              <td mat-cell *matCellDef="let form">{{ form.tenderNo }}</td>
            </ng-container>

            <ng-container matColumnDef="projectName">
              <th mat-header-cell *matHeaderCellDef>Project Name</th>
              <td mat-cell *matCellDef="let form">{{ form.projectName }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let form">{{ form.status }}</td>
            </ng-container>

            <ng-container matColumnDef="createdDate">
              <th mat-header-cell *matHeaderCellDef>Created Date</th>
              <td mat-cell *matCellDef="let form">{{ form.createdDate | date }}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let form">
                <button mat-icon-button [routerLink]="['/pts20/form', form.id]">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button (click)="viewPDF(form.id)">
                  <mat-icon>picture_as_pdf</mat-icon>
                </button>
              </td>
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
    `,
  ],
})
export class FormListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'tenderNo',
    'projectName',
    'status',
    'createdDate',
    'actions',
  ];

  // Mock data - will be replaced with actual service calls
  forms = [
    {
      id: 1,
      tenderNo: 'T2024001',
      projectName: 'Sample Construction Project',
      status: 'Draft',
      createdDate: new Date(),
    },
    {
      id: 2,
      tenderNo: 'T2024002',
      projectName: 'Infrastructure Development',
      status: 'Submitted',
      createdDate: new Date(2024, 7, 15),
    },
  ];

  ngOnInit(): void {
    // TODO: Load forms from service
  }

  viewPDF(formId: number): void {
    // TODO: Implement PDF generation
    console.log('View PDF for form:', formId);
  }
}
