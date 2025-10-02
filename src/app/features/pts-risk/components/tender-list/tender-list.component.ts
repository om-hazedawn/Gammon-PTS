import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TenderListApiService, TenderItem } from '../../../../core/services/tender-list-api.service';
import { ExcomDecisionPopupComponent } from '../excom-decision-popup/excom-decision-popup.component';
import { AddTenderPopupComponent } from '../add-tender-popup/add-tender-popup.component';
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
              <td mat-cell *matCellDef="let element">{{ element.standardResponsePriorityLevel?.title }}</td>
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
                  @if (element.excomDecisionPriorityLevel) {
                    <div class="excom-info">
                      <span class="excom-title">{{ element.excomDecisionPriorityLevel?.title }}</span>
                    </div>
                  }
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
                  <button mat-raised-button class="action-btn">No need for Excom approval</button>
                  <button mat-raised-button class="action-btn">work in View (pending Tender Doc Released)</button>
                  <button mat-raised-button class="action-btn green">Weekly Snapshot</button>
                  <button mat-raised-button class="action-btn green">Monthly Snapshot</button>
                </div>
              </td>
            </ng-container>

            <!-- Key Date Column -->
            <ng-container matColumnDef="keyDate">
              <th mat-header-cell *matHeaderCellDef>Key Date</th>
              <td mat-cell *matCellDef="let element">
                <button mat-icon-button color="primary" (click)="picker.open()">
                  <mat-icon style="color: #1976d2;">calendar_today</mat-icon>
                </button>
                <mat-datepicker #picker></mat-datepicker>
              </td>
            </ng-container>

            <!-- Form 20 Column -->
            <ng-container matColumnDef="form20">
              <th mat-header-cell *matHeaderCellDef>
                Form<br />20
              </th>
              <td mat-cell *matCellDef="let element">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                  <button mat-stroked-button color="primary" class="form-btn">Add</button>
                  <button mat-stroked-button color="primary" class="form-btn">Select</button>
                </div>
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
            [length]="dataSource.data.length"
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
              <button mat-raised-button color="primary" class="action-btn">Export Excel</button>
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
        min-width: 600px;
        max-width: 100%;
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
        this.loadTenders();
      }
    });
  }

  openExcomDecisionPopup(element: TenderItem): void {
    const dialogRef = this.dialog.open(ExcomDecisionPopupComponent, {
      width: '900px',
      maxWidth: 'none',
      disableClose: false,
      data: {
        excomDecisionItem: 'Upxxxsks',
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
        // Refresh the table
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  openMarketIntelligencePopup(element: TenderItem): void {
    const dialogRef = this.dialog.open(MarketIntelligencepopup, {
      width: '900px',
      maxWidth: 'none',
      disableClose: false,
      data: {
        winningCompetitor: element.winningCompetitor,
        marginLost: element.marginLostPercentage,
        otherReasonForLoss: element.otherReasonsForLoss
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the tender item with the market intelligence data
        element.winningCompetitor = result.winningCompetitor;
        element.marginLostPercentage = result.marginLost;
        element.otherReasonsForLoss = result.otherReasonForLoss;
        // Refresh the table
        this.dataSource.data = [...this.dataSource.data];
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

  loadTenders() {
    this.isLoading = true;
    // Fetch all data at once using pageSize=-1
    this.tenderListApiService.getTenders(-1, 1).subscribe({
      next: (response) => {
        if (response.data && response.data.length > 0) {
          // Store all data in the MatTableDataSource
          this.dataSource.data = response.data;
          this.totalItems = response.data.length;
          
          // Initialize paginator after data is loaded
          setTimeout(() => {
            if (this.paginator) {
              this.dataSource.paginator = this.paginator;
            }
          });
        }
      },
      error: (error) => {
        console.error('Error loading tenders:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    
    // No need to fetch data, just let MatTableDataSource handle pagination
    if (this.dataSource.paginator) {
      this.dataSource.paginator.pageSize = this.pageSize;
      this.dataSource.paginator.pageIndex = this.currentPage - 1;
    }
  }

  ngOnInit() {
    this.loadTenders();
  }

  ngAfterViewInit() {
    // Connect paginator with dataSource and initialize settings
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
      this.dataSource.paginator = this.paginator;
    }
  }
}
