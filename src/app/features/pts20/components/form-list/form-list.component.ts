import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Form20ListService, Form20List } from '../../../../core/services/Form20/form20list.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormAttachmentComponent } from './form-attachment/form-attchment.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
  ],
  template: `
    <div class="form-list-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Form 20 List</mat-card-title>
          <mat-card-subtitle>Procurement Tender Forms</mat-card-subtitle>
          <button
            mat-raised-button
            class="action-btn"
            style="margin-left: auto;"
            color="primary"
            routerLink="/pts20/form/new"
          >
            <mat-icon>add</mat-icon>
            New Form
          </button>
        </mat-card-header>
        <mat-card-content>
          @if(loading){
          <div class="loading-spinner">
            <mat-progress-spinner mode="indeterminate" diameter="50"></mat-progress-spinner>
          </div>
          } @if(error){
          <div class="error-message">
            {{ error }}
          </div>
          } @if(!loading && !error){
          <table
            mat-table
            [dataSource]="dataSource"
            matSort
            class="forms-table"
            style="width: 100%;"
          >
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
                {{ form.approximateValue | number }} {{ form.currency }} / {{ form.period }}
                {{ form.periodUnit }}
                <span *ngIf="form.approximateValueRemark" class="remark">
                  ({{ form.approximateValueRemark }})</span
                >
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

            <ng-container matColumnDef="print">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let form">
                <button mat-icon-button>
                  <mat-icon>print</mat-icon>
                </button>
              </td>
            </ng-container>

            <ng-container matColumnDef="attachment">
              <th mat-header-cell *matHeaderCellDef>Attachment</th>
              <td mat-cell *matCellDef="let form">
                <button mat-icon-button (click)="openAttachmentDialog(form.id)">
                  <mat-icon>attach_file</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
          <mat-paginator
            #paginator
            [length]="allData.length"
            [pageSize]="10"
            [pageSizeOptions]="[5, 10, 20, 50]"
            showFirstLastButtons
            class="custom-paginator"
          >
          </mat-paginator>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .selected-row {
        background-color: #e3f2fd !important;
      }
      .excom-decision-cell {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .excom-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .excom-item {
        font-weight: 500;
        color: #1976d2;
      }
      .excom-level {
        font-size: 0.9em;
        color: #666;
      }
      .loading-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
      }
      tr.mat-row:hover td {
        background-color: #e3f2fd;
        transition: background 0.2s;
      }
      .form-list-container {
        mat-card-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1976d2;
          letter-spacing: 1px;
          margin-bottom: 4px;
          text-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
        }
        mat-card-subtitle {
          font-size: 1.15rem;
          font-weight: 400;
          color: #555;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
        }
        padding: 0;
        margin: 0;
        width: 100%;
        box-sizing: border-box;
        overflow-x: auto;
      }
      mat-card {
        margin: 0 auto;
        max-width: 100%;
        box-sizing: border-box;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(25, 118, 210, 0.12), 0 1.5px 6px rgba(0, 0, 0, 0.08);
        overflow-x: auto;
      }
      .mat-card-content {
        padding: 0 !important;
        border-radius: 0 0 16px 16px;
        overflow-x: auto;
      }
      table {
        width: 100%;
        min-width: 600px;
        max-width: 100%;
        overflow-x: auto;
        display: table;
        margin: 0;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(25, 118, 210, 0.13), 0 1.5px 6px rgba(0, 0, 0, 0.08);
        border-collapse: separate;
        border-spacing: 0;
      }
      th {
        background-color: #f5f7fa;
        color: #1976d2;
        font-weight: bold;
        white-space: normal;
        word-break: keep-all;
        line-height: 1.2;
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        max-width: 120px;
        overflow-wrap: break-word;
        border-bottom: 2px solid #e0e0e0;
      }
      td {
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        padding: 14px 12px;
        background-color: #fff;
        font-size: 15px;
        border-bottom: 1px solid #e0e0e0;
      }
      tr.mat-row:nth-child(even) td {
        background-color: #f5f7fa;
      }
      tr.mat-row:hover td {
        background-color: #e3f2fd;
        transition: background 0.2s;
      }
      mat-form-field {
        font-size: 13px;
      }
      .mat-form-field-appearance-outline .mat-form-field-infix {
        padding: 0 8px;
      }
      .mat-form-field-appearance-outline .mat-form-field-wrapper {
        padding-bottom: 0;
      }
      .action-btn {
        min-width: 110px;
        margin: 2px 6px 2px 0;
        border-radius: 8px;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
        transition: background 0.2s, box-shadow 0.2s;
        background-color: var(--primary-color) !important;
        color: #fff !important;
      }
      .action-btn.green {
        background-color: #43a047 !important;
        color: #fff !important;
      }
      .action-btn:last-child {
        margin-right: 0;
      }
      .action-btn:hover:not([disabled]) {
        box-shadow: 0 4px 16px rgba(25, 118, 210, 0.15);
      }
      .form-btn {
        min-width: 80px;
        margin: 2px 6px 2px 0;
        border-radius: 8px;
        font-weight: 500;
        transition: background 0.2s, box-shadow 0.2s;
      }
      .form-btn:hover:not([disabled]) {
        background: #43a047 !important;
        color: #fff !important;
      }
      .custom-paginator {
        margin-top: 16px;
        background-color: #f5f7fa;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
      }
    `,
  ],
})
export class FormListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Form20List>();
  loading = false;
  error: string | null = null;
  allData: Form20List[] = [];

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
    'dueDate',
    'print',
    'attachment',
  ];

  constructor(
    private form20ListService: Form20ListService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  loadForms(): void {
    this.loading = true;
    this.form20ListService.getForm20List().subscribe({
      next: (data) => {
        this.allData = data;
        this.dataSource = new MatTableDataSource<Form20List>(this.allData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading forms:', error);
        this.loading = false;
        this.snackBar.open('Error loading forms. Please try again.', 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      },
    });
  }

  openAttachmentDialog(formId: string): void {
    const dialogRef = this.dialog.open(FormAttachmentComponent, {
      width: '500px',
      disableClose: false,
      data: { formId }
    });

    dialogRef.afterClosed().subscribe((result: {file: File, type: string} | undefined) => {
      if (result) {
        // Create FormData and append file
        const formData = new FormData();
        formData.append('file', result.file);
        formData.append('type', result.type);
        formData.append('formId', formId);

        // Here you would send the formData to your API
        console.log('Uploading attachment:', {
          formId,
          fileName: result.file.name,
          type: result.type
        });

        this.snackBar.open('File uploaded successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.loadForms();
  }
}
