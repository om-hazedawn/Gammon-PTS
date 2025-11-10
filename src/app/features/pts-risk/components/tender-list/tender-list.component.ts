import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TenderListApiService, TenderItem, TenderSorted } from '../../../../core/services/tender-list-api.service';
import { ExcomDecisionPopupComponent } from '../excom-decision-popup/excom-decision-popup.component';
import { AddTenderPopupComponent } from '../add-tender-popup/add-tender-popup.component';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog.component';
import { AlertDialog } from '../alert-dialog/alert-dialog.component';
import { ReportDateDialog } from '../report-date/report-date.component';

import { FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MarketIntelligencepopup } from '../market-intelligencepopup/market-intelligencepopup.component';
import { TenderKeyDateListComponent } from '../tender-key-date-list/tender-key-date-list.component';
import { ReportDateWithMarketIntelDialog } from '../report-date-with-market-intel/report-date-with-market-intel.component';
import { Form20ControlsComponent } from '../form20-controls/form20-controls.component';


@Component({
  selector: 'app-tender-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    Form20ControlsComponent,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="form-list-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Tender Risk Management</mat-card-title>
          <mat-card-subtitle>Risk assessment for tenders</mat-card-subtitle>
          <button mat-raised-button class="action-btn" style="margin-left: auto;" (click)="openAddTenderPopup()">Add New Tender</button>
        </mat-card-header>
        <mat-card-content>
          @if (isLoading) {
            <div class="loading-spinner">
              <mat-progress-spinner mode="indeterminate" diameter="50"></mat-progress-spinner>
            </div>
          }
          @if (error) {
            <div class="error-message">
              {{ error }}
            </div>
          }
           @if (!isLoading && !error) {
          <table mat-table [dataSource]="dataSource" class="mat-elevation-z2" style="width: 100%;">
            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let element">{{ element.tenderStatus }}</td>
            </ng-container>

            <!-- Division Column -->
            <ng-container matColumnDef="division">
              <th mat-header-cell *matHeaderCellDef>Division</th>
              <td mat-cell *matCellDef="let element">{{ element.division }}</td>
            </ng-container>

            <!-- Expected Tender Submission Date Column -->
            <ng-container matColumnDef="expectedDate">
              <th mat-header-cell *matHeaderCellDef>
                Expected Tender<br />Submission Date
              </th>
              <td mat-cell *matCellDef="let element">{{ element.expectedTenderSubmissionDate | date }}</td>
            </ng-container>

            <!-- Bidding Gammon Entity Column -->
            <ng-container matColumnDef="entity">
              <th mat-header-cell *matHeaderCellDef>Bidding Gammon Entity</th>
              <td mat-cell *matCellDef="let element">{{ element.biddingGammonEntity?.name }}</td>
            </ng-container>

            <!-- Customer Name Column -->
            <ng-container matColumnDef="customerName">
              <th mat-header-cell *matHeaderCellDef>Customer Name</th>
              <td mat-cell *matCellDef="let element">{{ element.customerName }}</td>
            </ng-container>

            <!-- Project Name Column -->
            <ng-container matColumnDef="projectName">
              <th mat-header-cell *matHeaderCellDef>Project Name</th>
              <td mat-cell *matCellDef="let element">{{ element.projectName }}</td>
            </ng-container>

            <!-- Currency Column -->
            <ng-container matColumnDef="currency">
              <th mat-header-cell *matHeaderCellDef>Currency</th>
              <td mat-cell *matCellDef="let element">{{ element.currency?.code }}</td>
            </ng-container>

            <!-- Estimated Tender Value (Million) Column -->
            <ng-container matColumnDef="estimatedValue">
              <th mat-header-cell *matHeaderCellDef>
                Estimated Tender Value<br />(Million)
              </th>
              <td mat-cell *matCellDef="let element">{{ element.estimatedTenderValue }}</td>
            </ng-container>

            <!-- Response Column -->
            <ng-container matColumnDef="response">
              <th mat-header-cell *matHeaderCellDef>Response</th>
              <td mat-cell *matCellDef="let element">
                <div style="display:flex; gap:6px;">
                  <span style="flex: 0 0 80%;">{{ element.standardResponsePriorityLevel?.title }}</span>
                  <span class="ud-icon" style="flex: 0 0 20%; display:flex; gap:4px; justify-content: flex-end; align-items: center;">
                    <mat-icon *ngIf="isUpgrade(element)">arrow_upward</mat-icon>
                    <mat-icon *ngIf="isDowngrade(element)">arrow_downward</mat-icon>
                    <mat-icon *ngIf="isLevel(element)">swap_horiz</mat-icon>
                  </span>
                </div>
              </td>
            </ng-container>

            <!-- Up/Downgrade Column -->
            <ng-container matColumnDef="upDowngrade">
              <th mat-header-cell *matHeaderCellDef>Up/Downgrade</th>
              <td mat-cell *matCellDef="let element">{{ element.upgradeDowngradePriorityLevel?.title }}</td>
            </ng-container>

            <!-- Additional Note Column -->
            <ng-container matColumnDef="additionalNote">
              <th mat-header-cell *matHeaderCellDef>Additional Note</th>
              <td mat-cell *matCellDef="let element">{{ element.additionalNote }}</td>
            </ng-container>

            <!-- EXCOM Decision Column -->
            <ng-container matColumnDef="excomDecision">
              <th mat-header-cell *matHeaderCellDef>EXCOM Decision</th>
              <td mat-cell *matCellDef="let element">
                <div class="excom-decision-cell">
                  <button mat-icon-button color="primary" aria-label="Edit EXCOM Decision" (click)="$event.stopPropagation(); openExcomDecisionPopup(element)">
                    <mat-icon style="color: #1976d2;">edit</mat-icon>
                  </button>
                </div>
              </td>
            </ng-container>

            <!-- Market Intelligence Column -->
            <ng-container matColumnDef="marketIntelligence">
              <th mat-header-cell *matHeaderCellDef>Market<br />Intelligence</th>
              <td mat-cell *matCellDef="let element">
                <button mat-icon-button color="primary" aria-label="Edit Market Intelligence" (click)="$event.stopPropagation(); openMarketIntelligencePopup(element)">
                  <mat-icon style="color: #1976d2;">edit</mat-icon>
                </button>
              </td>
            </ng-container>

            <!-- Change Status for Tender Column -->
            <ng-container matColumnDef="changeStatus">
              <th mat-header-cell *matHeaderCellDef>
                Change Status for Tender
              </th>
              <td mat-cell *matCellDef="let element">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                  @if (showPendingExcomReview(element)) {
                    <button mat-raised-button class="action-btn" (click)="changeStatus($event, 'Pending EXCOM review', element)">Pending EXCOM review</button>
                  }
                  @if (showNoNeedForExcomReview(element)) {
                    <button mat-raised-button class="action-btn" (click)="changeStatus($event, 'No need for EXCOM approval', element)">No need for EXCOM approval</button>
                  }
                  @if (showWorkInView(element)) {
                    <button mat-raised-button class="action-btn" (click)="changeStatus($event, 'Work In View (Pending Tender Doc Released)', element)">Work In View (Pending Tender Doc Released)</button>
                  }
                  @if (showUnderPreparation(element)) {
                    <button mat-raised-button class="action-btn" (click)="changeStatus($event, 'Tender Under Preparation', element)">Tender Under Preparation</button>
                  }
                  @if (showBidSubmitted(element)) {
                    <button mat-raised-button class="action-btn" (click)="changeStatus($event, 'Bid Submitted (Pending Result Announcement)', element)">Bid submitted</button>
                  }
                  @if (showSuccessful(element)) {
                    <button mat-raised-button class="action-btn" (click)="changeStatus($event, 'Successful', element)">Successful</button>
                  }
                  @if (showUnsuccessful(element)) {
                    <button mat-raised-button class="action-btn" (click)="changeStatus($event, 'Unsuccessful', element)">Unsuccessful</button>
                  }
                  @if (showWithdraw(element)) {
                    <button mat-raised-button class="action-btn red" (click)="changeStatus($event, 'Withdraw / Declined', element)">Withdraw / Declined</button>
                  }
                  @if (showExpired(element)) {
                    <button mat-raised-button class="action-btn red" (click)="changeStatus($event, 'Expired', element)">Expired</button>
                  }
                  <button mat-raised-button class="action-btn green">Weekly Snapshot</button>
                  <button mat-raised-button class="action-btn green">Monthly Snapshot</button>
                </div>
              </td>
            </ng-container>

            <!-- Key Date Column -->
            <ng-container matColumnDef="keyDate">
              <th mat-header-cell *matHeaderCellDef>Key Date</th>
              <td mat-cell *matCellDef="let element">
                <button mat-icon-button color="primary" (click)="$event.stopPropagation(); openKeyDatePopup(element)">
                  <mat-icon style="color: #1976d2;">calendar_today</mat-icon>
                </button>
              </td>
            </ng-container>

            <!-- Form 20 Column -->
            <ng-container matColumnDef="form20">
              <th mat-header-cell *matHeaderCellDef>
                Form<br />20
              </th>
              <td mat-cell (click)="stopPropagation($event)" *matCellDef="let element"  fxLayoutAlign="center center" [ngClass]="columnBackgroundColor('Form20Id')">
                  <app-form20-controls [riskTenderId]="element.id" [form20Id]="element.form20Id" class="form20form30Cell"></app-form20-controls>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"
                (click)="onRowClick(row, $event)"
                [class.selected-row]="selectedRow === row"
                style="cursor: pointer;"></tr>
          </table>
          <mat-paginator
            [pageSize]="pageSize"
            [pageSizeOptions]="[5, 10, 25, 50]"
            [length]="totalItems"
            [pageIndex]="currentPage - 1"
            showFirstLastButtons
            (page)="handlePageEvent($event)"
            class="custom-paginator"
            #paginator>
          </mat-paginator>
           }
            <!-- Button Row Below Table -->
            <div style="display: flex; justify-content: flex-end; align-items: center; margin-top: 24px; gap: 24px;">
              <div style="flex: 1; display: flex; justify-content: center; gap: 12px;">
                <button mat-raised-button color="accent" class="action-btn">Generate Snapshot</button>
                <button mat-raised-button color="primary" class="action-btn">Generate Monthly Snapshot</button>
              </div>
              <button mat-raised-button color="primary" class="action-btn" (click)="exportExcel()">Export Excel</button>
            </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
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
      padding: 0;
      margin: 0;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
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
    }
    .mat-column-currency{
      width: 90px;
    }
    .mat-column-changeStatus .action-btn {
      line-height: 1.2;
      padding: 8px 12px;
      height: auto;
      text-align: center;
      word-break: break-word;
    }
    .mat-column-keyDate {
      max-width: 70px;
    }
      mat-card {
        margin: 0 auto;
        max-width: 100%;
        box-sizing: border-box;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(25, 118, 210, 0.12), 0 1.5px 6px rgba(0,0,0,0.08);
        overflow-x: auto;
      }
      .mat-card-content {
        padding: 0 !important;
        border-radius: 0 0 16px 16px;
        overflow-x: auto;
      }
      table {
        width: 100%;
        overflow-x: auto;
        display: table;
        margin: 0;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(25, 118, 210, 0.13), 0 1.5px 6px rgba(0,0,0,0.08);
        border-collapse: separate;
        border-spacing: 0;
      }
      th {
        background-color: #f5f7fa;
        color: #1976d2;
        font-weight: bold;
        white-space: normal;
        //word-break: normal;
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
        white-space: normal;
        word-break: break-word;
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
        margin: 2px 0 2px 0;
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
      .action-btn.red {
        background-color: #e53935 !important;
        color: #fff !important;
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
export class TenderListComponent implements OnInit, AfterViewInit {
  isLoading = false;
  error: string | null = null;
  selectedRow: TenderItem | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<TenderItem>([]);
  totalItems = 0;
  currentPage = 1;
  pageSize = 10;
  

  constructor(
    private dialog: MatDialog,
    private tenderListApiService: TenderListApiService
  ) {}

  tenderSort: TenderSorted = {
    column: '',
    order: 'desc',
    pageSize: this.pageSize,
    page: this.currentPage,
  };
  biddingEntityList: string[] = [];
  divisionList: string[] = [];

  divisionSearchFC: FormControl = new FormControl('', {});
  statusSearchFC: FormControl = new FormControl('', {});
  biddingEntitySearchFC: FormControl = new FormControl('', {});
  projectDescriptionSearchFC: FormControl = new FormControl('', {});
  projectNameSearchFC: FormControl = new FormControl('', {});
  customerNameSearchFC: FormControl = new FormControl('', {});
  tenderNoSearchFC: FormControl = new FormControl('', {});

  /**
   * For filter purpose
   */
  formGroup: FormGroup = new FormGroup({
    division: this.divisionSearchFC,
    tenderStatus: this.statusSearchFC,
    biddingGammonEntity: this.biddingEntitySearchFC,
    projectDescription: this.projectDescriptionSearchFC,
    projectName: this.projectNameSearchFC,
    customerName: this.customerNameSearchFC,
    tenderNoSearchFC: this.tenderNoSearchFC,
  });

  openAddTenderPopup(data?: any): void {
    console.log('Opening AddTenderPopup with data:', data);
    const dialogRef = this.dialog.open(AddTenderPopupComponent, {
      width: '1000px',
      maxWidth: '90vw',
      height: '90vh',
      disableClose: false,
      data: data || {}, // Pass the tender data if it exists
      panelClass: 'tender-details-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('AddTenderPopup closed with result:', result);
      if (result) {
        // Refresh the table
        this.refreshDataSource();
      }
    });
  }

  openExcomDecisionPopup(element: TenderItem): void {
    const dialogRef = this.dialog.open(ExcomDecisionPopupComponent, {
      width: '900px',
      maxWidth: 'none',
      disableClose: false,
      data: {
        tenderId: element.id, // Add tenderId
        excomDecisionItem: element.excomDecisionItem,
        excomDecisionPriorityLevelId: element.excomDecisionPriorityLevelId,
        excomDecisionNotes: element.excomDecisionNotes,
        excomDecisionDate: element.excomDecisionDate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the tender item with the new ExCom decision data
        element.excomDecisionItem = 'Upxxxsks';
        element.excomDecisionPriorityLevelId = result.excomDecisionPriorityLevelId;
        element.excomDecisionPriorityLevel = result.excomDecisionPriorityLevel;
        element.excomDecisionNotes = result.excomDecisionNotes;
        element.excomDecisionDate = new Date().toISOString();
        // Refresh the table while maintaining pagination
        const currentData = [...this.dataSource.data];
        this.dataSource = new MatTableDataSource<TenderItem>(currentData);
      }
    });
  }

  openMarketIntelligencePopup(element: TenderItem): void {
    const dialogRef = this.dialog.open(MarketIntelligencepopup, {
      width: '900px',
      maxWidth: 'none',
      disableClose: false,
      data: {
        tenderId: element.id,
        winningCompetitor: element.winningCompetitor,
        marginLost: element.marginLostPercentage,
        otherReasonForLoss: element.otherReasonsForLoss
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Market Intelligence dialog result:', result);
        // Update the tender item with the market intelligence data
        element.winningCompetitor = result.winningCompetitor;
        element.marginLostPercentage = result.marginLost;
        element.otherReasonsForLoss = result.otherReasonForLoss;
        // Refresh the table while maintaining pagination
        const currentData = [...this.dataSource.data];
        this.dataSource = new MatTableDataSource<TenderItem>(currentData);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openKeyDatePopup(element: TenderItem): void {
    const dialogRef = this.dialog.open(TenderKeyDateListComponent, {
      width: '900px',
      maxWidth: 'none',
      disableClose: false,
      data: {
        tenderId: element.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle any updates if necessary
        console.log('Key Date dialog closed with result:', result);
      }
    });
  }

  onRowClick(row: TenderItem, event: Event): void {
    // Prevent row click if the event came from a button
    if ((event.target as HTMLElement).tagName === 'BUTTON' ||
        (event.target as HTMLElement).closest('button')) {
      return;
    }

    if (!row || !row.id) {
      console.error('Invalid row data:', row);
      return;
    }

    this.selectedRow = row;
    console.log('Fetching details for tender ID:', row.id);
    
    // Show loading state
    this.isLoading = true;
    
    // Fetch full tender details when row is clicked
    this.tenderListApiService.getTenderById(row.id).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Tender details received:', response);
        if (response && response.data) {
          this.openAddTenderPopup(response.data);
        } else {
          this.error = 'Could not load tender details. Please try again.';
          console.error('No data in response:', response);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.error = 'Error loading tender details. Please try again later.';
        console.error('Error fetching tender details:', error);
        this.selectedRow = null;
      }
    });
  }

  displayedColumns: string[] = [
    'status',
    'division',
    'expectedDate',
    'entity',
    'customerName',
    'projectName',
    'currency',
    'estimatedValue',
    'response',
    'upDowngrade',
    'additionalNote',
    'excomDecision',
    'marketIntelligence',
    'changeStatus',
    'keyDate',
    'form20',
  ];

  exportExcel(): void {
    this.tenderListApiService.exportTenderExcel().subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'tender-list.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error exporting excel:', error);
      }
    );
  }

  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.tenderSort = {
      ...this.tenderSort,
      page: this.currentPage,
      pageSize: this.pageSize,
    };
    this.refreshDataSource();
  }

  ngOnInit() {
    this.refreshDataSource();
  }

  changeStatus($event: MouseEvent, tenderStatus: string, element: TenderItem) {
    $event.stopPropagation(); // stop propagate to row's onclick listener

    this.dialog
      .open(ConfirmDialog, {
        data: {
          title: 'Change status',
          message: 'Please confirm the status change to ' + tenderStatus,
          ok: 'Confirm',
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          if (
            [
              'Successful',
              'Unsuccessful',
              'Withdraw / Declined',
              'Expired',
            ].indexOf(tenderStatus) >= 0
          ) {
            this.tenderListApiService.getTenderById(element.id).subscribe((tender) => {
              if (['Unsuccessful'].indexOf(tenderStatus) >= 0) {
                this.dialog
                  .open(ReportDateWithMarketIntelDialog, {
                    width: '50vw',
                    minWidth: '600px',
                    disableClose: true,
                    data: {
                      tenderId: tender.data.id,
                    },
                  })
                  .afterClosed()
                  .subscribe((persistedTender: TenderItem) => {
                    if (persistedTender) {
                      this.toSaveStatus(
                        tenderStatus,
                        element,
                        // convert null -> undefined to match parameter type string | undefined
                        persistedTender.reportDate ?? undefined
                      );
                    } else {
                      this.dialog.open(AlertDialog, {
                        data: {
                          message: 'Status changes cancelled',
                        },
                      });
                    }
                  });
              } else {
                this.dialog
                  .open(ReportDateDialog, {
                    data: tender.data.reportDate,
                    disableClose: true,
                  })
                  .afterClosed()
                  .subscribe((reportDate) => {
                    if (reportDate) {
                      this.toSaveStatus(tenderStatus, element, reportDate);
                    } else {
                      this.dialog.open(AlertDialog, {
                        data: {
                          message: 'Status changes cancelled',
                        },
                      });
                    }
                  });
              }
            });
          } else {
            this.toSaveStatus(tenderStatus, element);
          }
        } else {
          this.dialog.open(AlertDialog, {
            data: {
              message: 'Status changes cancelled',
            },
          });
        }
      });
  }

  toSaveStatus(tenderStatus: string, tender: TenderItem, reportDate?: string) {
    this.tenderListApiService.updateStatus(tender.id, tenderStatus, reportDate).subscribe({
      next: () => {
        this.dialog.open(AlertDialog, {
          data: {
            message: 'Status updated',
          },
        });

        this.refreshDataSource();
      },
      error: (error) => {
        this.dialog.open(AlertDialog, {
          data: {
            title: 'Error',
            message: 'Status fail to change',
          },
        });
      },
    });
  }

  refreshDataSource() {
    //this.tenderApi.getTenderPage().subscribe((response) => {
    this.tenderListApiService
      .getTenderPageSorted(this.tenderSort)
      .subscribe((response) => {
        const list: TenderItem[] = response.items ?? [];
        this.totalItems = response.totalCount ?? list.length;
        this.dataSource.data = list.filter((tender: TenderItem) => this._filter(tender));

        this.divisionList = list.reduce(
          (prev: string[], current: TenderItem) => {
            if (prev.indexOf(current.division) < 0) {
              prev.push(current.division);
            }
            return prev;
          },
          []
        );

        this.divisionList.sort();

        this.biddingEntityList = list.reduce(
          (prev: string[], current: TenderItem) => {
            const entity = current.biddingGammonEntity?.shortName;
            if (entity === undefined) return prev;
            if (prev.indexOf(entity) < 0) {
              prev.push(entity);
            }
            return prev;
          },
          []
        );
      });
  }

  showPendingExcomReview(element: TenderItem): boolean {
    return (
      element.tenderStatus.toLowerCase() ==
        'No need for EXCOM approval'.toLowerCase() ||
      element.tenderStatus.toLowerCase() ==
        'Work In View (Pending Tender Doc Released)'.toLowerCase()
    );
  }

  showNoNeedForExcomReview(element: TenderItem): boolean {
  return (
    element.tenderStatus.toLowerCase() ==
      'Pending EXCOM review'.toLowerCase() ||
    element.tenderStatus.toLowerCase() ==
      'Work In View (Pending Tender Doc Released)'.toLowerCase()
    );
}

  showWorkInView(element: TenderItem): boolean {
    return (
      element.tenderStatus.toLowerCase() ==
        'Pending EXCOM review'.toLowerCase() ||
      element.tenderStatus.toLowerCase() ==
        'No need for EXCOM approval'.toLowerCase()
    );
  }

  showUnderPreparation(element: TenderItem): boolean {
    return (
      element.tenderStatus.toLowerCase() ==
      'Work In View (Pending Tender Doc Released)'.toLowerCase()
    );
  }

  showBidSubmitted(element: TenderItem): boolean {
    return (
      element.tenderStatus.toLowerCase() ==
      'Tender Under Preparation'.toLowerCase()
    );
  }

  showSuccessful(element: TenderItem): boolean {
    return (
      element.tenderStatus.toLowerCase() ==
      'Bid Submitted (Pending Result Announcement)'.toLowerCase()
    );
  }
  
  showUnsuccessful(element: TenderItem): boolean {
    return (
      element.tenderStatus.toLowerCase() ==
      'Bid Submitted (Pending Result Announcement)'.toLowerCase()
    );
  }

  showWithdraw(element: TenderItem): boolean {
    return (
      [
        'Bid Submitted (Pending Result Announcement)'.toLowerCase(),
        'Tender Under Preparation'.toLowerCase(),
        'Work In View (Pending Tender Doc Released)'.toLowerCase(),
      ].indexOf(element.tenderStatus.toLowerCase()) >= 0
    );
  }

  showExpired(element: TenderItem): boolean {
    return (
      ['Bid Submitted (Pending Result Announcement)'.toLowerCase()].indexOf(
        element.tenderStatus.toLowerCase()
      ) >= 0
    );
  }

  ngAfterViewInit() {
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  columnBackgroundColor(colName: string) {
    if (this.displayedColumns.indexOf(colName) >= 0) {
      if (this.displayedColumns.indexOf(colName) % 2 == 1) {
        return 'cusColumnBackgroundColor1';
      } else {
        return 'cusColumnBackgroundColor2';
      }
    }
    return '';
  }

  _filter(item: any): boolean {
    let results: boolean[] = [];
    if (this.formGroup.value) {
      let searchKeys = Object.keys(this.formGroup.value);
      // console.log("searchKeys", searchKeys);
      for (let i = 0; i < searchKeys.length; i++) {
        results[i] = true;
      }

      for (let i = 0; i < searchKeys.length; i++) {
        // console.log("results", results);
        // console.log("i", i);
        let aKey = searchKeys[i];
        if (this.formGroup.value[aKey]) {
          let itemVal = item[aKey];
          // This is very ugly hardcode, need to update API return model
          if (aKey === 'biddingGammonEntity') {
            itemVal = item[aKey]?.shortName;
          }

          // console.log(aKey + '\t' + this.formGroup.value[aKey] + '\t' + itemVal);
          if (Array.isArray(this.formGroup.value[aKey])) {
            if (
              this.formGroup.value[aKey].length > 0 &&
              this.formGroup.value[aKey].indexOf(itemVal) < 0
            ) {
              // console.log("1");
              results[i] = false;
              continue;

              return false;
            }
          } else if (!itemVal) {
            // console.log("2");
            results[i] = false;
            continue;

            return false;
          } else if (
            (Number(itemVal) && Number(this.formGroup.value[aKey].trim())) ||
            (Number(this.formGroup.value[aKey].trim().substring(1)) &&
              ['>', '<'].indexOf(this.formGroup.value[aKey].trim()[0]) >= 0)
          ) {
            if (
              Number(this.formGroup.value[aKey]) &&
              +itemVal != +this.formGroup.value[aKey]
            ) {
              // console.log("3");
              results[i] = false;
              continue;

              return false;
            }
            if (
              this.formGroup.value[aKey].trim()[0] === '>' &&
              +itemVal < +this.formGroup.value[aKey].trim().substring(1)
            ) {
              // console.log("4");
              results[i] = false;
              continue;

              return false;
            }
            if (
              this.formGroup.value[aKey].trim()[0] === '<' &&
              +itemVal >= +this.formGroup.value[aKey].trim().substring(1)
            ) {
              // console.log("5");
              results[i] = false;
              continue;

              return false;
            }
          } else if (
            this.formGroup.value[aKey]
              .toLowerCase()
              .split(' ')
              .some((val: string) => itemVal.toLowerCase().indexOf(val) < 0)
          ) {
            // console.log("6");
            results[i] = false;
            continue;

            return false;
          }
        }
      }
    }
    // console.log("7");
    // results[i] = false;
    const checker = results.every((r) => r === true);
    // if (checker === true) console.log('checker', checker);
    return checker;
    // return true;
  }

  isUpgrade(tender: TenderItem): boolean {
    const sr = tender.standardResponsePriorityLevel?.ranking;
    const ud = tender.upgradeDowngradePriorityLevel?.ranking;

    if (sr === undefined || ud === undefined || ud === -1) return false;
    if (sr === ud) return false;
    if (sr < ud) return true;

    return false;
  }

  isDowngrade(tender: TenderItem): boolean {
    const sr = tender.standardResponsePriorityLevel?.ranking;
    const ud = tender.upgradeDowngradePriorityLevel?.ranking;

    if (sr === undefined || ud === undefined || ud === -1) return false;
    if (sr === ud) return false;
    if (sr > ud) return true;

    return false;
  }

  isLevel(tender: TenderItem): boolean {
    if (tender.upgradeDowngradePriorityLevel?.ranking === -1) return true;

    if (!this.isUpgrade(tender) && !this.isDowngrade(tender)) {
      if (
        tender.upgradeDowngradePriorityLevelId !== undefined &&
        (tender.upgradeDowngradePriorityLevelId ?? 0) > 0
      )
        return true;
      return false;
    }
    return false;
  }
}

