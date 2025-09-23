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

            <ng-container matColumnDef="tenderStatus">
              <th mat-header-cell *matHeaderCellDef>Tender Status</th>
              <td mat-cell *matCellDef="let form">{{ form.tenderStatus }}</td>
            </ng-container>

            <ng-container matColumnDef="tenderNo">
              <th mat-header-cell *matHeaderCellDef>Tender No</th>
              <td mat-cell *matCellDef="let form">{{ form.tenderNo }}</td>
            </ng-container>

            <ng-container matColumnDef="businessUnit">
              <th mat-header-cell *matHeaderCellDef>Business Unit</th>
              <td mat-cell *matCellDef="let form">{{ form.businessUnit }}</td>
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

            <ng-container matColumnDef="approximateValueContractPeriod">
              <th mat-header-cell *matHeaderCellDef>Contract Value/Period</th>
              <td mat-cell *matCellDef="let form">{{ form.approximateValueContractPeriod }}</td>
            </ng-container>

            <ng-container matColumnDef="bidType">
              <th mat-header-cell *matHeaderCellDef>Bid Type</th>
              <td mat-cell *matCellDef="let form">{{ form.bidType }}</td>
            </ng-container>

            <ng-container matColumnDef="dueDate">
              <th mat-header-cell *matHeaderCellDef>Due Date</th>
              <td mat-cell *matCellDef="let form">{{ form.dueDate | date }}</td>
            </ng-container>

            <ng-container matColumnDef="keyDates">
              <th mat-header-cell *matHeaderCellDef>Key Dates</th>
              <td mat-cell *matCellDef="let form">{{ form.keyDates }}</td>
            </ng-container>

            <ng-container matColumnDef="attachment">
              <th mat-header-cell *matHeaderCellDef>Attachment</th>
              <td mat-cell *matCellDef="let form">{{ form.attachment }}</td>
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
    'tenderStatus',
    'tenderNo',
    'businessUnit',
    'title',
    'country',
    'client',
    'approximateValueContractPeriod',
    'bidType',
    'dueDate',
    'keyDates',
    'attachment'
  ];

  // Mock data - will be replaced with actual service calls
  forms = [
    {
      id: 1,
      tenderStatus: 'Draft',
      tenderNo: 'T2024001',
      businessUnit: 'Unit A',
      title: 'Project Alpha',
      country: 'HKG',
      client: 'Client X',
      approximateValueContractPeriod: '1,000,000 / 12 months',
      bidType: 'Solo Bid',
      dueDate: '2024-09-30',
      keyDates: '2024-08-15',
      attachment: 'specs.pdf'
    },
    {
      id: 2,
      tenderStatus: 'Submitted',
      tenderNo: 'T2024002',
      businessUnit: 'Unit B',
      title: 'Project Beta',
      country: 'SGP',
      client: 'Client Y',
      approximateValueContractPeriod: '2,500,000 / 24 months',
      bidType: 'Joint Venture',
      dueDate: '2024-10-15',
      keyDates: '2024-09-01',
      attachment: 'documents.pdf'
    }
  ];

  ngOnInit(): void {
    // TODO: Load forms from service
  }

  viewPDF(formId: number): void {
    // TODO: Implement PDF generation
    console.log('View PDF for form:', formId);
  }
  
}
