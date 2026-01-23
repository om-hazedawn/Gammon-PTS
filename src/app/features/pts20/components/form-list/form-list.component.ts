import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { StatusFilterComponent } from './status-filter/status-filter.component';
import { BusinessUnitFilterComponent } from './business-unit-filter/business-unit-filter.component';
import { TitleFilterComponent } from './title-filter/title-filter.component';
import { ClientFilterComponent } from './client-filter/client-filter.component';
import { TenderNoFilterComponent } from './tender-no-filter/tender-no-filter.component';

@Component({
  selector: 'app-form-list',
  standalone: true,
  imports: [
    RouterModule,
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
    MatCheckboxModule,
    FormsModule,
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
            <!-- <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let form">{{ form.id }}</td>
            </ng-container> -->

            <ng-container matColumnDef="status">
              <th
                mat-header-cell
                *matHeaderCellDef
                (click)="openStatusFilter($event)"
                style="cursor: pointer; user-select: none;"
              >
                Tender Status
                <mat-icon style="font-size: 16px; display: inline; margin-left: 4px;"
                  >filter_list</mat-icon
                >
              </th>
              <td mat-cell *matCellDef="let form">{{ form.status }}</td>
            </ng-container>

            <ng-container matColumnDef="tenderNo">
              <th mat-header-cell *matHeaderCellDef (click)="openTenderNoFilter($event)" style="cursor: pointer; user-select: none;">
                Tender No
                <mat-icon style="font-size: 16px; display: inline; margin-left: 4px;">filter_list</mat-icon>
              </th>
              <td mat-cell *matCellDef="let form">{{ form.tenderNo }}</td>
            </ng-container>

            <ng-container matColumnDef="businessUnitCode">
              <th
                mat-header-cell
                *matHeaderCellDef
                (click)="openBusinessUnitFilter($event)"
                style="cursor: pointer; user-select: none;"
              >
                Business Unit
                <mat-icon style="font-size: 16px; display: inline; margin-left: 4px;"
                  >filter_list</mat-icon
                >
              </th>
              <td mat-cell *matCellDef="let form">
                {{ getBusinessUnitDisplayName(form.businessUnitCode) }}
              </td>
            </ng-container>

            <ng-container matColumnDef="title">
              <th
                mat-header-cell
                *matHeaderCellDef
                (click)="openTitleFilter($event)"
                style="cursor: pointer; user-select: none;"
              >
                Title
                <mat-icon style="font-size: 16px; display: inline; margin-left: 4px;"
                  >filter_list</mat-icon
                >
              </th>
              <td mat-cell *matCellDef="let form">{{ form.title }}</td>
            </ng-container>

            <ng-container matColumnDef="country">
              <th mat-header-cell *matHeaderCellDef>Country</th>
              <td mat-cell *matCellDef="let form">{{ form.country }}</td>
            </ng-container>

            <ng-container matColumnDef="client">
              <th
                mat-header-cell
                *matHeaderCellDef
                (click)="openClientFilter($event)"
                style="cursor: pointer; user-select: none;"
              >
                Client
                <mat-icon style="font-size: 16px; display: inline; margin-left: 4px;"
                  >filter_list</mat-icon
                >
              </th>
              <td mat-cell *matCellDef="let form">{{ form.client }}</td>
            </ng-container>

            <ng-container matColumnDef="contractValue">
              <th mat-header-cell *matHeaderCellDef>Approximate Value</th>
              <td mat-cell *matCellDef="let form">
                @if (shortFormValue(form.approximateValue?.toString() || '')) {
                {{ form.currency }} {{ shortFormValue(form.approximateValue?.toString() || '') }}
                }
              </td>
            </ng-container>

            <ng-container matColumnDef="contractPeriod">
              <th mat-header-cell *matHeaderCellDef>Contract Period</th>
              <td mat-cell *matCellDef="let form">{{ form.period }} {{ form.periodUnit }}</td>
            </ng-container>

            <ng-container matColumnDef="bidTypeId">
              <th mat-header-cell *matHeaderCellDef>Bid Type</th>
              <td mat-cell *matCellDef="let form">
                @if (form.bidTypeId === 1) { Solo Bid } @else if (form.bidTypeId === 2) { Joint
                Venture Bid }
              </td>
            </ng-container>

            <ng-container matColumnDef="dueDate">
              <th mat-header-cell *matHeaderCellDef>Due Date</th>
              <td mat-cell *matCellDef="let form">{{ form.dueDate | date }}</td>
            </ng-container>

            <ng-container matColumnDef="keyDate">
              <th mat-header-cell *matHeaderCellDef>Key Date</th>
              <td mat-cell *matCellDef="let form">{{ form.keyDate | date }}</td>
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
                <button mat-icon-button (click)="openAttachmentDialog(form.id, $event)">
                  <mat-icon>attach_file</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr
              mat-row
              *matRowDef="let row; columns: displayedColumns"
              (click)="onRowClick(row)"
              style="cursor: pointer;"
            ></tr>
          </table>
          <mat-paginator
            #paginator
            [length]="allData.length"
            [pageSize]="pageSize"
            [pageSizeOptions]="pageSizeOptions"
            [pageIndex]="0"
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
      mat-card-header {
        padding: 16px 20px !important;
      }
      .mat-card-content {
        padding: 0 !important;
        border-radius: 0 0 16px 16px;
        overflow-x: auto;
      }
      table {
        width: 100%;
        min-width: auto;
        max-width: 100%;
        overflow-x: auto;
        display: table;
        margin: 0;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(25, 118, 210, 0.13), 0 1.5px 6px rgba(0, 0, 0, 0.08);
        border-collapse: separate;
        border-spacing: 0;
        font-size: 12px;
      }
      th {
        background-color: #f5f7fa;
        color: #1976d2;
        font-weight: 600;
        white-space: normal;
        word-break: break-word;
        line-height: 1.1;
        padding-top: 8px;
        padding-bottom: 8px;
        padding-left: 6px;
        padding-right: 6px;
        text-align: center;
        font-size: 12px;
        overflow-wrap: break-word;
        border-bottom: 2px solid #e0e0e0;
      }
      td {
        text-align: center;
        vertical-align: middle;
        white-space: normal;
        word-wrap: break-word;
        padding: 8px 6px;
        background-color: #fff;
        font-size: 12px;
        border-bottom: 1px solid #e0e0e0;
        max-width: 90px;
        overflow-wrap: break-word;
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
      .mat-column-status {
        max-width: 60px !important;
        width: 60px !important;
      }
      .mat-column-tenderNo {
        max-width: 60px !important;
        width: 60px !important;
      }
      .mat-column-businessUnitCode {
        max-width: 70px !important;
        width: 70px !important;
      }
      .mat-column-title {
        width: 220px !important;
        max-width: 220px !important;
        text-align: left !important;
      }
      .mat-column-client {
        width: 220px !important;
        max-width: 220px !important;
        text-align: left !important;
      }
      .mat-column-country {
        max-width: 60px !important;
        width: 60px !important;
      }
      .mat-column-dueDate {
        max-width: 60px !important;
        width: 60px !important;
      }
      .mat-column-contractValue {
        max-width: 85px !important;
        width: 85px !important;
      }
      .mat-column-contractPeriod {
        max-width: 60px !important;
        width: 60px !important;
      }
      .mat-column-bidTypeId {
        max-width: 60px !important;
        width: 60px !important;
      }
      .mat-column-keyDate {
        max-width: 60px !important;
        width: 60px !important;
      }
      .mat-column-print {
        max-width: 50px !important;
        width: 50px !important;
      }
      .mat-column-attachment {
        max-width: 80px !important;
        width: 80px !important;
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
  onRowClick(row: Form20List): void {
    this.router.navigate(['/pts20/form', row.id]);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Form20List>();
  loading = false;
  error: string | null = null;
  allData: Form20List[] = [];
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];
  selectedStatuses: string[] = [];
  availableStatuses: string[] = [];
  selectedBusinessUnits: string[] = [];
  availableBusinessUnits: string[] = ['Building', 'CSD'];
  titleSearchText: string = '';
  clientSearchText: string = '';
  tenderNoSearchText: string = '';
  tenderNoSortOrder: string = 'ascending';

  displayedColumns: string[] = [
    // 'id',
    'status',
    'tenderNo',
    'businessUnitCode',
    'title',
    'country',
    'client',
    'contractValue',
    'contractPeriod',
    'bidTypeId',
    'dueDate',
    'keyDate',
    'print',
    'attachment',
  ];

  constructor(
    private form20ListService: Form20ListService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  loadForms(): void {
    this.loading = true;
    this.form20ListService.getForm20List().subscribe({
      next: (data: any) => {
        console.log(
          'API Response data:',
          data,
          'Type:',
          typeof data,
          'IsArray:',
          Array.isArray(data)
        );

        // Check if data is wrapped in a paginated response
        let formsArray: Form20List[] = [];

        if (Array.isArray(data)) {
          formsArray = data;
        } else if (data && typeof data === 'object') {
          // Check if it's a paginated response with items property
          if ('items' in data && Array.isArray(data.items)) {
            formsArray = data.items as Form20List[];
            console.log('Found paginated response with items array');
          } else if ('data' in data && Array.isArray(data.data)) {
            formsArray = data.data as Form20List[];
            console.log('Found wrapped response with data array');
          } else {
            console.warn('Unknown response structure:', data);
          }
        }

        console.log('Forms array to display:', formsArray);
        this.allData = formsArray.reverse(); // Reverse the array to show latest data first
        this.extractAvailableStatuses(); // Extract available statuses for filtering
        this.dataSource = new MatTableDataSource<Form20List>(this.allData);
        this.loading = false;
        this.cdr.detectChanges(); // Trigger change detection
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
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

  openAttachmentDialog(formId: string, event: MouseEvent): void {
    // Prevent row click event from triggering
    event.stopPropagation();
    const dialogRef = this.dialog.open(FormAttachmentComponent, {
      width: '500px',
      disableClose: false,
      data: { formId },
    });

    dialogRef.afterClosed().subscribe((result: { file: File; type: string } | undefined) => {
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
          type: result.type,
        });

        this.snackBar.open('File uploaded successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    });
  }

  openStatusFilter(event: MouseEvent): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(StatusFilterComponent, {
      width: '300px',
      disableClose: false,
      data: {
        availableStatuses: this.availableStatuses,
        selectedStatuses: this.selectedStatuses,
      },
    });

    dialogRef.afterClosed().subscribe((result: string[] | undefined) => {
      if (result !== undefined) {
        this.selectedStatuses = result;
        this.applyFilter();
      }
    });
  }

  openBusinessUnitFilter(event: MouseEvent): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(BusinessUnitFilterComponent, {
      width: '300px',
      disableClose: false,
      data: {
        availableUnits: this.availableBusinessUnits,
        selectedUnits: this.selectedBusinessUnits,
      },
    });

    dialogRef.afterClosed().subscribe((result: string[] | undefined) => {
      if (result !== undefined) {
        this.selectedBusinessUnits = result;
        this.applyFilter();
      }
    });
  }

  openTitleFilter(event: MouseEvent): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(TitleFilterComponent, {
      width: '400px',
      disableClose: false,
      data: {
        searchText: this.titleSearchText,
      },
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result !== undefined) {
        this.titleSearchText = result;
        this.applyFilter();
      }
    });
  }

  openClientFilter(event: MouseEvent): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ClientFilterComponent, {
      width: '400px',
      disableClose: false,
      data: {
        searchText: this.clientSearchText,
      },
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result !== undefined) {
        this.clientSearchText = result;
        this.applyFilter();
      }
    });
  }

  openTenderNoFilter(event: MouseEvent): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(TenderNoFilterComponent, {
      width: '400px',
      disableClose: false,
      data: {
        searchText: this.tenderNoSearchText,
        sortOrder: this.tenderNoSortOrder,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        this.tenderNoSearchText = result.searchText;
        this.tenderNoSortOrder = result.sortOrder;
        this.applyFilter();
      }
    });
  }

  applyFilter(): void {
    let filteredData = this.allData;

    // Filter by status
    if (this.selectedStatuses.length > 0) {
      filteredData = filteredData.filter((form) => this.selectedStatuses.includes(form.status));
    }

    // Filter by business unit
    if (this.selectedBusinessUnits.length > 0) {
      // Convert display names to codes for filtering
      const businessUnitCodes = this.selectedBusinessUnits.map((unit) =>
        this.getBusinessUnitCode(unit)
      );
      filteredData = filteredData.filter((form) =>
        businessUnitCodes.includes(form.businessUnitCode)
      );
    }

    // Filter by title (case-insensitive search)
    if (this.titleSearchText.trim().length > 0) {
      filteredData = filteredData.filter((form) =>
        form.title?.toLowerCase().includes(this.titleSearchText.toLowerCase())
      );
    }

    // Filter by client (case-insensitive search)
    if (this.clientSearchText.trim().length > 0) {
      filteredData = filteredData.filter((form) =>
        form.client?.toLowerCase().includes(this.clientSearchText.toLowerCase())
      );
    }

    // Filter by tender no (case-insensitive search)
    if (this.tenderNoSearchText.trim().length > 0) {
      filteredData = filteredData.filter((form) =>
        form.tenderNo?.toLowerCase().includes(this.tenderNoSearchText.toLowerCase())
      );
    }

    // Sort by tender no
    if (this.tenderNoSortOrder === 'ascending') {
      filteredData.sort((a, b) => {
        const tenderA = a.tenderNo?.toLowerCase() || '';
        const tenderB = b.tenderNo?.toLowerCase() || '';
        return tenderA.localeCompare(tenderB);
      });
    } else {
      filteredData.sort((a, b) => {
        const tenderA = a.tenderNo?.toLowerCase() || '';
        const tenderB = b.tenderNo?.toLowerCase() || '';
        return tenderB.localeCompare(tenderA);
      });
    }

    this.dataSource.data = filteredData;

    // Reset paginator to first page
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  private extractAvailableStatuses(): void {
    this.availableStatuses = [
      'DRAFT',
      'SUBMITTED',
      'BID',
      'NO_BID',
      'REJECTED',
      'HOE_ENDORSED',
      'CM_ENDORSED',
      'DIR_ENDORSED',
      'ED_APPROVED',
    ];
  }

  getBusinessUnitDisplayName(code: string): string {
    const businessUnitMap: { [key: string]: string } = {
      BDG: 'Building',
    };
    return businessUnitMap[code] || code;
  }

  getBusinessUnitCode(displayName: string): string {
    const codeMap: { [key: string]: string } = {
      Building: 'BDG',
    };
    return codeMap[displayName] || displayName;
  }

  shortFormValue(numericVal: string): string {
    if (
      !numericVal ||
      numericVal === '0' ||
      numericVal === '' ||
      numericVal === 'null' ||
      numericVal === 'undefined'
    ) {
      return '';
    }

    let val = numericVal.replace(new RegExp(',', 'g'), ''); // Remove commas
    if (val && Number(val)) {
      if (+val >= 1000000000) {
        return Math.round(+val / 10000000) / 100 + 'B'; // Billions
      }
      if (+val >= 1000000) {
        return Math.round(+val / 10000) / 100 + 'M'; // Millions
      }
      if (+val >= 1000) {
        return Math.round(+val / 10) / 100 + 'K'; // Thousands
      }
      return val; // Return original value if less than 1000
    }
    return ''; // Return empty string if not a valid number
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
