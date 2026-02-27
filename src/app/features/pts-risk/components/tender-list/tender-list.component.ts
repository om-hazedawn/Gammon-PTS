import { Component, ViewChild, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TenderListApiService } from '../../../../core/services/tender-list-api.service';
import { TenderItem } from '../../../../model/entity/pts-risk/TenderItem';
import { TenderSorted } from '../../../../model/entity/pts-risk/TenderSorted';
import { ExcomDecisionPopupComponent } from '../excom-decision-popup/excom-decision-popup.component';
import { AddTenderPopupComponent } from '../add-tender-popup/add-tender-popup.component';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog.component';
import { AlertDialog } from '../alert-dialog/alert-dialog.component';
import { ReportDateDialog } from '../report-date/report-date.component';
import { ChangeStatusToggleDialogComponent } from '../change-status-toggle-dialog/change-status-toggle-dialog.component';
import { ChangeStatusMenuDialogComponent } from '../change-status-menu-dialog/change-status-menu-dialog.component';
import { PerMillionPipe } from '../../../../core/pipes/per-million.pipe';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GenerateSnapshotDialogComponent } from '../generate-snapshot-dialog/generate-snapshot-dialog.component';
import { GenerateMonthlySnapshotDialogComponent } from '../generate-monthly-snapshot-dialog/generate-monthly-snapshot-dialog.component';

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
    ReactiveFormsModule,
    MatIconModule,
    Form20ControlsComponent,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    PerMillionPipe,
    MatCheckboxModule,
  ],
  template: `
    <div class="form-list-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Tender Risk Management</mat-card-title>
          <mat-card-subtitle>Risk assessment for tenders</mat-card-subtitle>
          <button
            mat-raised-button
            class="action-btn"
            style="margin-left: auto;"
            (click)="openAddTenderPopup()"
          >
            Add New Tender
          </button>
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
            <table
              mat-table
              [dataSource]="dataSource"
              class="mat-elevation-z2"
              style="width: 100%;"
            >
              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef 
                  (click)="openStatusFilterPopup($event)"
                  style="cursor: pointer; user-select: none;"
                >
                  Status
                </th>
                <td mat-cell *matCellDef="let element">{{ element.tenderStatus }}</td>
              </ng-container>
              <!-- Division Column -->
              <ng-container matColumnDef="division">
                <th mat-header-cell *matHeaderCellDef 
                  (click)="openDivisionFilterPopup($event)"
                  style="cursor: pointer; user-select: none;"
                >
                  Division
                </th>
                <td mat-cell *matCellDef="let element">{{ element.division }}</td>
              </ng-container>

              <!-- Expected Tender Submission Date Column -->
              <ng-container matColumnDef="expectedDate">
                <th mat-header-cell *matHeaderCellDef 
                  (click)="toggleSort('expectedTenderSubmissionDate')"
                  style="cursor: pointer; user-select: none;"
                >
                  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;">
                    <div style="text-align: center;">Expected Tender<br />Submission Date</div>
                    @if (tenderSort.column === 'expectedTenderSubmissionDate' && tenderSort.order === 'asc') {
                      <mat-icon style="font-size: 14px; width: 14px; height: 14px; color: #1976d2;">arrow_upward</mat-icon>
                    } @else if (tenderSort.column === 'expectedTenderSubmissionDate' && tenderSort.order === 'desc') {
                      <mat-icon style="font-size: 14px; width: 14px; height: 14px; color: #1976d2;">arrow_downward</mat-icon>
                    }
                  </div>
                </th>
                <td mat-cell *matCellDef="let element">
                  {{ element.expectedTenderSubmissionDate | date }}
                </td>
              </ng-container>

              <!-- Bidding Gammon Entity Column -->
              <ng-container matColumnDef="entity">
                <th mat-header-cell *matHeaderCellDef 
                  (click)="openBiddingEntityFilterPopup($event)"
                  style="cursor: pointer; user-select: none;"
                >
                  Bidding Gammon Entity
                </th>
                <td mat-cell *matCellDef="let element">{{ element.biddingGammonEntity?.name }}</td>
              </ng-container>

              <!-- Customer Name Column -->
              <ng-container matColumnDef="customerName">
                <th mat-header-cell *matHeaderCellDef 
                  (click)="openCustomerNameFilterPopup($event)"
                  style="cursor: pointer; user-select: none;"
                >
                  Customer Name
                </th>
                <td mat-cell *matCellDef="let element">{{ element.customerName }}</td>
              </ng-container>

              <!-- Project Name Column -->
              <ng-container matColumnDef="projectName">
                <th mat-header-cell *matHeaderCellDef 
                  (click)="openProjectNameFilterPopup($event)"
                  style="cursor: pointer; user-select: none;"
                >
                  Project Name
                </th>
                <td mat-cell *matCellDef="let element">{{ element.projectName }}</td>
              </ng-container>

              <!-- Currency Column -->
              <ng-container matColumnDef="currency">
                <th mat-header-cell *matHeaderCellDef>Currency</th>
                <td mat-cell *matCellDef="let element">{{ element.currency?.code }}</td>
              </ng-container>

              <!-- Estimated Tender Value (Million) Column -->
              <ng-container matColumnDef="estimatedValue">
                <th mat-header-cell *matHeaderCellDef>Estimated Tender Value<br />(Million)</th>
                <td mat-cell *matCellDef="let element">{{ element.estimatedTenderValue | perMillion }}</td>
              </ng-container>

              <!-- Response Column -->
              <ng-container matColumnDef="response">
                <th mat-header-cell *matHeaderCellDef>Response</th>
                <td mat-cell *matCellDef="let element">
                  <div style="display:flex; gap:0px; align-items: center; width: 100%; justify-content: flex-start;">
                    <span
                      style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; flex: 1;"
                      >{{ element.standardResponsePriorityLevel?.title }}</span
                    >
                    <span
                      class="ud-icon"
                      style="flex-shrink: 0; display:flex; gap:0px; margin-left: 8px;"
                    >
                      @if (isUpgrade(element)) {
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style="color: currentColor;"
                        >
                          <path
                            d="M7 11L12 6L17 11M7 18L12 13L17 18"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      }
                      @if (isDowngrade(element)) {
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style="color: currentColor;"
                        >
                          <path
                            d="M7 13L12 18L17 13M7 6L12 11L17 6"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      }
                      @if (isLevel(element)) {
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 17H4M4 17L8 13M4 17L8 21M4 7H20M20 7L16 3M20 7L16 11"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      }
                    </span>
                  </div>
                </td>
              </ng-container>

              <!-- Up/Downgrade Column -->
              <ng-container matColumnDef="upDowngrade">
                <th mat-header-cell *matHeaderCellDef>Up/Downgrade</th>
                <td mat-cell *matCellDef="let element">
                  @if (element.upgradeDowngradePriorityLevel?.title) {
                    <span style="background-color: #c8e6c9; padding: 4px 8px; border-radius: 4px; display: inline-block;">
                      {{ element.upgradeDowngradePriorityLevel?.title }}
                    </span>
                  }
                </td>
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
                     @if (element.excomDecisionPriorityLevel?.title) {
                    <span style="background-color: #1976d2; padding: 4px 8px; border-radius: 4px; display: inline-block;">
                      {{ element.excomDecisionPriorityLevel?.title }}
                    </span>
                  }
                    <button
                      mat-icon-button
                      color="primary"
                      aria-label="Edit EXCOM Decision"
                      (click)="$event.stopPropagation(); openExcomDecisionPopup(element)"
                    >
                      <mat-icon style="color: #1976d2;">edit</mat-icon>
                    </button>
                  </div>
                </td>
              </ng-container>

              <!-- Market Intelligence Column -->
              <ng-container matColumnDef="marketIntelligence">
                <th mat-header-cell *matHeaderCellDef>Market<br />Intelligence</th>
                <td mat-cell *matCellDef="let element">
                  <button
                    mat-icon-button
                    color="primary"
                    aria-label="Edit Market Intelligence"
                    (click)="$event.stopPropagation(); openMarketIntelligencePopup(element)"
                  >
                    <mat-icon style="color: #1976d2;">edit</mat-icon>
                  </button>
                </td>
              </ng-container>

              <!-- Change Status for Tender Column -->
              <ng-container matColumnDef="changeStatus">
                <th 
                  mat-header-cell 
                  *matHeaderCellDef
                  (click)="openChangeStatusTogglePopup($event)"
                  style="cursor: pointer; user-select: none;"
                >
                  @if (!isChangeStatusHidden) {
                    <span>Change Status for Tender</span>
                  } @else {
                    <mat-icon style="font-size: 20px; width: 20px; height: 20px; color: #1976d2;">settings</mat-icon>
                  }
                </th>
                <td mat-cell *matCellDef="let element">
                  @if (!isChangeStatusHidden) {
                    <div
                      style="display: flex; flex-direction: column; align-items: center; gap: 6px;"
                    >
                    @if (showPendingExcomReview(element)) {
                      <button
                        mat-raised-button
                        class="action-btn"
                        (click)="changeStatus($event, 'Pending EXCOM review', element)"
                      >
                        Pending EXCOM review
                      </button>
                    }
                    @if (showNoNeedForExcomReview(element)) {
                      <button
                        mat-raised-button
                        class="action-btn"
                        (click)="changeStatus($event, 'No need for EXCOM approval', element)"
                      >
                        No need for EXCOM approval
                      </button>
                    }
                    @if (showWorkInView(element)) {
                      <button
                        mat-raised-button
                        class="long-text-btn"
                        (click)="
                          changeStatus(
                            $event,
                            'Work In View (Pending Tender Doc Released)',
                            element
                          )
                        "
                      >
                        Work In View (Pending Tender Doc Released)
                      </button>
                    }
                    @if (showUnderPreparation(element)) {
                      <button
                        mat-raised-button
                        class="action-btn"
                        (click)="changeStatus($event, 'Tender Under Preparation', element)"
                      >
                        Tender Under Preparation
                      </button>
                    }
                    @if (showBidSubmitted(element)) {
                      <button
                        mat-raised-button
                        class="action-btn"
                        (click)="
                          changeStatus(
                            $event,
                            'Bid Submitted (Pending Result Announcement)',
                            element
                          )
                        "
                      >
                        Bid submitted
                      </button>
                    }
                    @if (showSuccessful(element)) {
                      <button
                        mat-raised-button
                        class="action-btn"
                        (click)="changeStatus($event, 'Successful', element)"
                      >
                        Successful
                      </button>
                    }
                    @if (showUnsuccessful(element)) {
                      <button
                        mat-raised-button
                        class="action-btn"
                        (click)="changeStatus($event, 'Unsuccessful', element)"
                      >
                        Unsuccessful
                      </button>
                    }
                    @if (showWithdraw(element)) {
                      <button
                        mat-raised-button
                        class="action-btn red"
                        (click)="changeStatus($event, 'Withdraw / Declined', element)"
                      >
                        Withdraw / Declined
                      </button>
                    }
                    @if (showExpired(element)) {
                      <button
                        mat-raised-button
                        class="action-btn red"
                        (click)="changeStatus($event, 'Expired', element)"
                      >
                        Expired
                      </button>
                    }
                    <button mat-raised-button class="action-btn green" (click)="$event.stopPropagation(); openWeeklySnapshotForTender(element)">Weekly Snapshot</button>
                    <button mat-raised-button class="action-btn green" (click)="$event.stopPropagation(); openMonthlySnapshotForTender(element)">Monthly Snapshot</button>
                  </div>
                  } @else {
                    <button 
                      mat-icon-button 
                      (click)="openStatusMenuPopup($event, element)"
                      style="color: #1976d2;"
                    >
                      <mat-icon>more_vert</mat-icon>
                    </button>
                  }
                </td>
              </ng-container>

              <!-- Key Date Column -->
              <ng-container matColumnDef="keyDate">
                <th mat-header-cell *matHeaderCellDef>Key Date</th>
                <td mat-cell *matCellDef="let element">
                  <button
                    mat-icon-button
                    color="primary"
                    (click)="$event.stopPropagation(); openKeyDatePopup(element)"
                  >
                    <mat-icon style="color: #1976d2;">calendar_today</mat-icon>
                  </button>
                </td>
              </ng-container>

              <!-- Form 20 Column -->
              <ng-container matColumnDef="form20">
                <th mat-header-cell *matHeaderCellDef 
                  (click)="openForm20FilterPopup($event)"
                  style="cursor: pointer; user-select: none;"
                >
                  Form 20
                </th>
                <td
                  mat-cell
                  (click)="stopPropagation($event)"
                  *matCellDef="let element"
                  fxLayoutAlign="center center"
                  [ngClass]="columnBackgroundColor('Form20Id')"
                >
                  <app-form20-controls
                    [riskTenderId]="element.id"
                    [form20Id]="element.form20Id"
                    class="form20form30Cell"
                  ></app-form20-controls>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr
                mat-row
                *matRowDef="let row; columns: displayedColumns"
                (click)="onRowClick(row, $event)"
                [class.selected-row]="selectedRow === row"
                style="cursor: pointer;"
              ></tr>
            </table>
            <mat-paginator
              [pageSize]="pageSize"
              [pageSizeOptions]="[10, 20, 50, 100]"
              [length]="totalItems"
              [pageIndex]="currentPage - 1"
              showFirstLastButtons
              (page)="handlePageEvent($event)"
              class="custom-paginator"
              #paginator
            >
            </mat-paginator>
          }
          <!-- Button Row Below Table -->
          <div
            style="display: flex; justify-content: flex-end; align-items: center; margin-top: 24px; gap: 24px;"
          >
            <div style="flex: 1; display: flex; justify-content: center; gap: 12px;">
              <button mat-raised-button color="accent" class="action-btn" (click)="openGenerateSnapshotDialog()">Generate Snapshot</button>
              <button mat-raised-button color="primary" class="action-btn" (click)="openGenerateMonthlySnapshotDialog()">
                Generate Monthly Snapshot
              </button>
            </div>
            <button mat-raised-button color="primary" class="action-btn" (click)="exportExcel()">
              Export Excel
            </button>
          </div>
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
        padding: 0;
        margin: 0;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        mat-card {
          margin: 0 !important;
          padding: 0 !important;
        }
        mat-card-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1976d2;
          letter-spacing: 1px;
          margin: 0 !important;
          text-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
          flex: 0 0 auto;
        }
        mat-card-subtitle {
          font-size: 1.15rem;
          font-weight: 400;
          color: #555;
          margin: 0 !important;
          letter-spacing: 0.5px;
          flex: 0 0 100%;
        }
      }
      .mat-column-status {
        width: 70px;
        min-width: 70px;
      }
      .mat-column-division {
        width: 45px;
        min-width: 45px;
      }
      .mat-column-expectedDate {
        width: 70px;
        min-width: 70px;
      }
      .mat-column-entity {
        width: 100px;
        min-width: 100px;
      }
      .mat-column-currency {
        width: 50px;
        min-width: 50px;
      }
      .mat-column-estimatedValue {
        width: 55
        px;
        min-width: 55px;
      }
      .mat-column-projectName {
        width: 150px;
        min-width: 150px;
      }
      
      .mat-column-response {
        width: 60px;
        min-width: 60px;
      }
      
      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        display: inline-block;
        visibility: visible;
      }
      mat-card {
        margin: 0 !important;
        padding: 0 !important;
        max-width: 100%;
        box-sizing: border-box;
        border-radius: 16px;
        box-shadow:
          0 8px 32px rgba(25, 118, 210, 0.12),
          0 1.5px 6px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }
      ::ng-deep .mat-mdc-card {
        padding: 0 !important;
      }
      mat-card-header {
        padding: 16px 16px 0 16px !important;
        margin: 0 !important;
        display: flex !important;
        align-items: flex-start;
        gap: 16px;
        flex-wrap: wrap;
      }
      mat-card-header button {
        margin-left: auto !important;
        margin-right: 0 !important;
        flex-shrink: 0;
        align-self: center;
      }
      ::ng-deep .mat-mdc-card-header {
        padding: 16px 16px 0 16px !important;
        margin: 0 !important;
        display: flex !important;
        align-items: flex-start;
        gap: 16px;
        flex-wrap: wrap;
      }
      ::ng-deep .mat-mdc-card-header button {
        margin-left: auto !important;
        margin-right: 0 !important;
        flex-shrink: 0;
        align-self: center;
      }
      .mat-card-content {
        padding: 0 !important;
        margin: 0 !important;
        border-radius: 0 0 16px 16px;
        overflow: hidden;
      }
      ::ng-deep .mat-mdc-card-content {
        padding: 0 !important;
        margin: 0 !important;
        overflow: hidden;
      }
      ::ng-deep .mat-mdc-card-content-container {
        padding: 0 !important;
        margin: 0 !important;
        overflow: hidden;
      }
      table {
        width: 100%;
        min-width: auto;
        max-width: 100%;
        display: table;
        margin: 0;
        margin-left: 0;
        margin-right: 0;
        border-radius: 0;
        box-shadow: none;
        border-collapse: collapse;
        border-spacing: 0;
        font-size: 12px;
        padding: 0;
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
        padding-left: 0px;
        padding-right: 0px;
        text-align: left;
        font-size: 12px;
        overflow-wrap: break-word;
        border-bottom: 2px solid #e0e0e0;
      }
      td {
        text-align: left;
        vertical-align: middle;
        white-space: normal;
        word-wrap: break-word;
        padding: 8px 0px;
        background-color: #fff;
        font-size: 12px;
        border-bottom: 1px solid #e0e0e0;
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
        min-width: 70px;
        padding: 4px 8px;
        margin: 2px 0 2px 0;
        border-radius: 6px;
        font-weight: 500;
        font-size: 12px;
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
        transition:
          background 0.2s,
          box-shadow 0.2s;
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
        min-width: 60px;
        padding: 4px 8px;
        margin: 2px 4px 2px 0;
        border-radius: 6px;
        font-weight: 500;
        font-size: 12px;
        transition:
          background 0.2s,
          box-shadow 0.2s;
      }
      .form-btn:hover:not([disabled]) {
        background: #43a047 !important;
        color: #fff !important;
      }
      .long-text-btn {
        min-width: auto !important;
        width: 100% !important;
        padding: 12px 12px !important;
        min-height: 50px !important;
        font-size: 12px !important;
        white-space: normal !important;
        word-wrap: break-word !important;
        line-height: 1.4 !important;
        text-align: center !important;
        background-color: var(--primary-color) !important;
        color: #fff !important;
        font-weight: 500 !important;
        border-radius: 6px !important;
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08) !important;
        transition: background 0.2s, box-shadow 0.2s !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .long-text-btn:hover:not([disabled]) {
        box-shadow: 0 4px 16px rgba(25, 118, 210, 0.15) !important;
      }
      .custom-paginator {
        margin-top: 12px;
        padding: 8px 12px !important;
        background-color: #f5f7fa;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
      }
      .loading-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 400px;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.9);
        z-index: 100;
      }
      .error-message {
        padding: 20px;
        background-color: #ffebee;
        color: #c62828;
        border-left: 4px solid #c62828;
        border-radius: 4px;
        margin-bottom: 16px;
        font-weight: 500;
      }
      ::ng-deep .change-status-toggle-popup {
        .mat-mdc-dialog-container {
          padding: 0 !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          border-radius: 4px !important;
        }
      }
      ::ng-deep .change-status-menu-popup {
        .mat-mdc-dialog-container {
          padding: 0 !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          border-radius: 4px !important;
        }
      }
    `,
  ],
})
export class TenderListComponent implements OnInit, AfterViewInit {
  isLoading = false;
  error: string | null = null;
  selectedRow: TenderItem | null = null;
  isChangeStatusHidden = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<TenderItem>([]);
  totalItems = 0;
  currentPage = 1;
  pageSize = 20;
  allFilteredTenders: TenderItem[] = []; // Store all filtered tenders

  constructor(
    private dialog: MatDialog,
    private tenderListApiService: TenderListApiService,
  ) {}

  tenderSort: TenderSorted = {
    column: '',
    order: '',
    pageSize: this.pageSize,
    page: this.currentPage,
  };
  biddingEntityList: string[] = [];
  divisionList: string[] = [];
  customerNameList: string[] = [];
  projectNameList: string[] = [];
  form20List: string[] = [];
  statusList: string[] = [
    'Pending EXCOM review',
    'No need for EXCOM approval',
    'Bid Submitted (Pending Result Announcement)',
    'Work In View (Pending Tender Doc Released)',
    'Withdraw / Declined',
    'Successful',
    'Tender Under Preparation',
    'Unsuccessful',
    'Expired',
  ];

  divisionSearchFC: FormControl = new FormControl<string[]>([], {});
  statusSearchFC: FormControl = new FormControl<string[]>([], {});
  biddingEntitySearchFC: FormControl = new FormControl<string[]>([], {});
  projectDescriptionSearchFC: FormControl = new FormControl('', {});
  customerNameSearchFC: FormControl = new FormControl<string[]>([], {});
  projectNameSearchFC: FormControl = new FormControl<string[]>([], {});
  tenderNoSearchFC: FormControl = new FormControl('', {});
  form20SearchFC: FormControl = new FormControl<string[]>([], {});

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
    form20Id: this.form20SearchFC,
  });

  openAddTenderPopup(data?: any): void {
    console.log('Opening AddTenderPopup with data:', data);
    const dialogRef = this.dialog.open(AddTenderPopupComponent, {
      width: '1000px',
      maxWidth: '90vw',
      height: '90vh',
      disableClose: false,
      data: data || {}, // Pass the tender data if it exists
      panelClass: 'tender-details-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('AddTenderPopup closed with result:', result);
      if (result) {
        // Refresh the table
        this.refreshDataSource();
      }
    });
  }

  openGenerateSnapshotDialog(): void {
    console.log('Opening GenerateSnapshotDialog');
    const dialogRef = this.dialog.open(GenerateSnapshotDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('GenerateSnapshotDialog closed with result:', result);
      if (result) {
        const { asOfDate, division } = result;
        console.log('Generate snapshot for division:', division, 'period:', asOfDate);
        // Call API to generate snapshot
        this.tenderListApiService.generateSnapshot(asOfDate, division).subscribe({
          next: (response) => {
            console.log('Snapshot generated successfully:', response);
            this.dialog.open(AlertDialog, {
              data: {
                message: `Snapshot generated successfully for ${division} as of ${asOfDate}`,
              },
            });
          },
          error: (error) => {
            console.error('Error generating snapshot:', error);
            this.dialog.open(AlertDialog, {
              data: {
                title: 'Error',
                message: 'Failed to generate snapshot. Please try again.',
              },
            });
          },
        });
      }
    });
  }

  openGenerateMonthlySnapshotDialog(): void {
    console.log('Opening GenerateMonthlySnapshotDialog');
    const dialogRef = this.dialog.open(GenerateMonthlySnapshotDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('GenerateMonthlySnapshotDialog closed with result:', result);
      if (result) {
        const { asOfDate, division } = result;
        console.log('Generate monthly snapshot for division:', division, 'period:', asOfDate);
        // Call API to generate monthly snapshot
        this.tenderListApiService.generateMonthlySnapshot(asOfDate, division).subscribe({
          next: (response) => {
            console.log('Monthly snapshot generated successfully:', response);
            this.dialog.open(AlertDialog, {
              data: {
                message: `Monthly snapshot generated successfully for ${division} as of ${asOfDate}`,
              },
            });
          },
          error: (error) => {
            console.error('Error generating monthly snapshot:', error);
            this.dialog.open(AlertDialog, {
              data: {
                title: 'Error',
                message: 'Failed to generate monthly snapshot. Please try again.',
              },
            });
          },
        });
      }
    });
  }

  openWeeklySnapshotForTender(element: TenderItem): void {
    console.log('Opening Weekly Snapshot for tender:', element.id);
    const dialogRef = this.dialog.open(GenerateSnapshotDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      disableClose: false,
      data: { hideDivision: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { asOfDate } = result;
        console.log('Generate weekly snapshot for tender ID:', element.id, 'period:', asOfDate);
        // Call API to generate weekly snapshot for specific tender
        this.tenderListApiService.generateWeeklySnapshotForTender(asOfDate, element.id).subscribe({
          next: (response) => {
            console.log('Weekly snapshot generated successfully:', response);
            this.dialog.open(AlertDialog, {
              data: {
                message: `Weekly snapshot generated successfully for tender ${element.id} with period ${asOfDate}`,
              },
            });
          },
          error: (error) => {
            console.error('Error generating weekly snapshot:', error);
            this.dialog.open(AlertDialog, {
              data: {
                title: 'Error',
                message: 'Failed to generate weekly snapshot. Please try again.',
              },
            });
          },
        });
      }
    });
  }

  openMonthlySnapshotForTender(element: TenderItem): void {
    console.log('Opening Monthly Snapshot for tender:', element.id);
    const dialogRef = this.dialog.open(GenerateMonthlySnapshotDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      disableClose: false,
      data: { hideDivision: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { asOfDate } = result;
        console.log('Generate monthly snapshot for tender ID:', element.id, 'period:', asOfDate);
        // Call API to generate monthly snapshot for specific tender
        this.tenderListApiService.generateMonthlySnapshotForTender(asOfDate, element.id).subscribe({
          next: (response) => {
            console.log('Monthly snapshot generated successfully:', response);
            this.dialog.open(AlertDialog, {
              data: {
                message: `Monthly snapshot generated successfully for tender ${element.id} with period ${asOfDate}`,
              },
            });
          },
          error: (error) => {
            console.error('Error generating monthly snapshot:', error);
            this.dialog.open(AlertDialog, {
              data: {
                title: 'Error',
                message: 'Failed to generate monthly snapshot. Please try again.',
              },
            });
          },
        });
      }
    });
  }

  openStatusFilterPopup(event: MouseEvent): void {
    event.stopPropagation();
    
    // Open inline filter dialog
    const dialogRef = this.dialog.open(StatusFilterDialogComponent, {
      width: '350px',
      disableClose: false,
      data: {
        statusList: this.statusList,
        selectedStatus: this.statusSearchFC.value || [],
      },
    });

    dialogRef.afterClosed().subscribe((selectedStatuses: string[]) => {
      if (selectedStatuses !== undefined && selectedStatuses !== null) {
        // Store as array for filtering
        this.statusSearchFC.setValue(selectedStatuses);
        // Reset paginator to first page and refresh
        if (this.paginator) {
          this.paginator.firstPage();
        }
        this.refreshDataSource();
      }
    });
  }

  openDivisionFilterPopup(event: MouseEvent): void {
    event.stopPropagation();
    
    // Open inline filter dialog for divisions
    const dialogRef = this.dialog.open(StatusFilterDialogComponent, {
      width: '350px',
      disableClose: false,
      data: {
        statusList: this.divisionList,
        selectedStatus: this.divisionSearchFC.value || [],
      },
    });

    dialogRef.afterClosed().subscribe((selectedDivisions: string[]) => {
      if (selectedDivisions !== undefined && selectedDivisions !== null) {
        // Store as array for filtering
        this.divisionSearchFC.setValue(selectedDivisions);
        // Reset paginator to first page and refresh
        if (this.paginator) {
          this.paginator.firstPage();
        }
        this.refreshDataSource();
      }
    });
  }

  openBiddingEntityFilterPopup(event: MouseEvent): void {
    event.stopPropagation();
    
    // Open inline filter dialog for bidding entities
    const dialogRef = this.dialog.open(StatusFilterDialogComponent, {
      width: '350px',
      disableClose: false,
      data: {
        statusList: this.biddingEntityList,
        selectedStatus: this.biddingEntitySearchFC.value || [],
      },
    });

    dialogRef.afterClosed().subscribe((selectedEntities: string[]) => {
      if (selectedEntities !== undefined && selectedEntities !== null) {
        // Store as array for filtering
        this.biddingEntitySearchFC.setValue(selectedEntities);
        // Reset paginator to first page and refresh
        if (this.paginator) {
          this.paginator.firstPage();
        }
        this.refreshDataSource();
      }
    });
  }

  openCustomerNameFilterPopup(event: MouseEvent): void {
    event.stopPropagation();
    
    // Open search filter dialog for customer names
    const dialogRef = this.dialog.open(SearchFilterDialogComponent, {
      width: '350px',
      disableClose: false,
      data: {
        filterList: this.customerNameList,
        selectedValue: this.customerNameSearchFC.value?.[0] || '',
      },
    });

    dialogRef.afterClosed().subscribe((selectedValue: string) => {
      if (selectedValue !== undefined && selectedValue !== null) {
        // Store as single search value
        this.customerNameSearchFC.setValue(selectedValue ? [selectedValue] : []);
        // Reset paginator to first page and refresh
        if (this.paginator) {
          this.paginator.firstPage();
        }
        this.refreshDataSource();
      }
    });
  }

  openProjectNameFilterPopup(event: MouseEvent): void {
    event.stopPropagation();
    
    // Open search filter dialog for project names
    const dialogRef = this.dialog.open(SearchFilterDialogComponent, {
      width: '350px',
      disableClose: false,
      data: {
        filterList: this.projectNameList,
        selectedValue: this.projectNameSearchFC.value?.[0] || '',
      },
    });

    dialogRef.afterClosed().subscribe((selectedValue: string) => {
      if (selectedValue !== undefined && selectedValue !== null) {
        // Store as single search value
        this.projectNameSearchFC.setValue(selectedValue ? [selectedValue] : []);
        // Reset paginator to first page and refresh
        if (this.paginator) {
          this.paginator.firstPage();
        }
        this.refreshDataSource();
      }
    });
  }

  openForm20FilterPopup(event: MouseEvent): void {
    event.stopPropagation();
    
    // Open search filter dialog for Form 20
    const dialogRef = this.dialog.open(SearchFilterDialogComponent, {
      width: '350px',
      disableClose: false,
      data: {
        filterList: this.form20List,
        selectedValue: this.form20SearchFC.value?.[0] || '',
      },
    });

    dialogRef.afterClosed().subscribe((selectedValue: string) => {
      if (selectedValue !== undefined && selectedValue !== null) {
        // Store as single search value
        this.form20SearchFC.setValue(selectedValue ? [selectedValue] : []);
        // Reset paginator to first page and refresh
        if (this.paginator) {
          this.paginator.firstPage();
        }
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
        excomDecisionDate: element.excomDecisionDate,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
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
        otherReasonForLoss: element.otherReasonsForLoss,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
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
        tenderId: element.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle any updates if necessary
        console.log('Key Date dialog closed with result:', result);
      }
    });
  }

  openChangeStatusTogglePopup(event: MouseEvent): void {
    event.stopPropagation();
    
    // Position the popup near the clicked header
    const dialogRef = this.dialog.open(ChangeStatusToggleDialogComponent, {
      width: 'auto',
      panelClass: 'change-status-toggle-popup',
      disableClose: false,
      data: {
        isHidden: this.isChangeStatusHidden,
      },
      position: {
        top: (event.clientY + 10) + 'px',
        left: (event.clientX - 100) + 'px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result !== null) {
        this.isChangeStatusHidden = result;
      }
    });
  }

  openStatusMenuPopup(event: MouseEvent, element: TenderItem): void {
    event.stopPropagation();
    
    // Build available options based on element status
    const options: Array<{ status: string; label: string }> = [];
    
    if (this.showPendingExcomReview(element)) {
      options.push({ status: 'Pending EXCOM review', label: 'Pending EXCOM review' });
    }
    if (this.showNoNeedForExcomReview(element)) {
      options.push({ status: 'No need for EXCOM approval', label: 'No need for EXCOM approval' });
    }
    if (this.showWorkInView(element)) {
      options.push({ status: 'Work In View (Pending Tender Doc Released)', label: 'Work In View (Pending Tender Doc Released)' });
    }
    if (this.showUnderPreparation(element)) {
      options.push({ status: 'Tender Under Preparation', label: 'Tender Under Preparation' });
    }
    if (this.showBidSubmitted(element)) {
      options.push({ status: 'Bid Submitted (Pending Result Announcement)', label: 'Bid submitted' });
    }
    if (this.showSuccessful(element)) {
      options.push({ status: 'Successful', label: 'Successful' });
    }
    if (this.showUnsuccessful(element)) {
      options.push({ status: 'Unsuccessful', label: 'Unsuccessful' });
    }
    if (this.showWithdraw(element)) {
      options.push({ status: 'Withdraw / Declined', label: 'Withdraw / Declined' });
    }
    if (this.showExpired(element)) {
      options.push({ status: 'Expired', label: 'Expired' });
    }
    options.push({ status: 'Weekly Snapshot', label: 'Weekly Snapshot' });
    options.push({ status: 'Monthly Snapshot', label: 'Monthly Snapshot' });
    
    // Open menu dialog
    const dialogRef = this.dialog.open(ChangeStatusMenuDialogComponent, {
      width: 'auto',
      panelClass: 'change-status-menu-popup',
      disableClose: false,
      data: {
        options: options,
      },
      position: {
        top: (event.clientY + 5) + 'px',
        left: (event.clientX - 50) + 'px',
      },
    });

    dialogRef.afterClosed().subscribe((selectedStatus) => {
      if (selectedStatus) {
        if (['Weekly Snapshot', 'Monthly Snapshot'].includes(selectedStatus)) {
          // Handle snapshot buttons separately
          console.log('Snapshot clicked:', selectedStatus);
        } else {
          // Handle status change
          this.changeStatus(event as any, selectedStatus, element);
        }
      }
    });
  }

  onRowClick(row: TenderItem, event: Event): void {
    // Prevent row click if the event came from a button
    if (
      (event.target as HTMLElement).tagName === 'BUTTON' ||
      (event.target as HTMLElement).closest('button')
    ) {
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
      },
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
      },
    );
  }

  handlePageEvent(event: any) {
    // Frontend handles pagination - slice data based on page and pageSize
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    
    // Slice the stored filtered list for current page
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    this.dataSource.data = this.allFilteredTenders.slice(startIndex, endIndex);
  }

  toggleSort(columnName: string) {
    // If clicking the same column, toggle order (asc -> desc -> blank)
    if (this.tenderSort.column === columnName) {
      if (this.tenderSort.order === 'asc') {
        this.tenderSort.order = 'desc';
      } else if (this.tenderSort.order === 'desc') {
        // Clear sort
        this.tenderSort.column = '';
        this.tenderSort.order = '';
      }
    } else {
      // Clicking a new column, start with asc
      this.tenderSort.column = columnName;
      this.tenderSort.order = 'asc';
    }
    
    // Reset to first page and refresh data
    this.currentPage = 1;
    if (this.paginator) {
      this.paginator.firstPage();
    }
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
            ['Successful', 'Unsuccessful', 'Withdraw / Declined', 'Expired'].indexOf(
              tenderStatus,
            ) >= 0
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
                        persistedTender.reportDate ?? undefined,
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
    this.isLoading = true;
    this.error = null;
    this.tenderListApiService.getTenderPageSorted(this.tenderSort).subscribe({
      next: (response) => {
        const list: TenderItem[] = response.items ?? [];
        const filteredList = list.filter((tender: TenderItem) => this._filter(tender));
        
        // Store full filtered list for pagination
        this.allFilteredTenders = filteredList;
        this.totalItems = filteredList.length;
        
        // Reset to first page when data is refreshed
        this.currentPage = 1;
        
        // Slice data based on pagination
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        const paginatedList = filteredList.slice(startIndex, endIndex);
        
        // Set paginated data to display
        this.dataSource.data = paginatedList;
        
        // Reset paginator to first page
        if (this.paginator) {
          this.paginator.firstPage();
        }

        this.divisionList = list.reduce((prev: string[], current: TenderItem) => {
          if (prev.indexOf(current.division) < 0) {
            prev.push(current.division);
          }
          return prev;
        }, []);

        this.divisionList.sort();

        this.biddingEntityList = list.reduce((prev: string[], current: TenderItem) => {
          const entity = current.biddingGammonEntity?.shortName;
          if (entity === undefined) return prev;
          if (prev.indexOf(entity) < 0) {
            prev.push(entity);
          }
          return prev;
        }, []);

        this.customerNameList = list.reduce((prev: string[], current: TenderItem) => {
          const customerName = current.customerName;
          if (!customerName) return prev;
          if (prev.indexOf(customerName) < 0) {
            prev.push(customerName);
          }
          return prev;
        }, []);
        this.customerNameList.sort();

        this.projectNameList = list.reduce((prev: string[], current: TenderItem) => {
          const projectName = current.projectName;
          if (!projectName) return prev;
          if (prev.indexOf(projectName) < 0) {
            prev.push(projectName);
          }
          return prev;
        }, []);
        this.projectNameList.sort();

        this.form20List = list.reduce((prev: string[], current: TenderItem) => {
          const form20Id = current.form20Id ? current.form20Id.toString() : '';
          if (!form20Id) return prev;
          if (prev.indexOf(form20Id) < 0) {
            prev.push(form20Id);
          }
          return prev;
        }, []);
        this.form20List.sort();

        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.error = 'Error loading tenders. Please try again later.';
        console.error('Error loading tenders:', error);
      },
    });
  }

  showPendingExcomReview(element: TenderItem): boolean {
    return (
      element.tenderStatus.toLowerCase() == 'No need for EXCOM approval'.toLowerCase() ||
      element.tenderStatus.toLowerCase() ==
        'Work In View (Pending Tender Doc Released)'.toLowerCase()
    );
  }

  showNoNeedForExcomReview(element: TenderItem): boolean {
    return (
      element.tenderStatus.toLowerCase() == 'Pending EXCOM review'.toLowerCase() ||
      element.tenderStatus.toLowerCase() ==
        'Work In View (Pending Tender Doc Released)'.toLowerCase()
    );
  }

  showWorkInView(element: TenderItem): boolean {
    return (
      element.tenderStatus.toLowerCase() == 'Pending EXCOM review'.toLowerCase() ||
      element.tenderStatus.toLowerCase() == 'No need for EXCOM approval'.toLowerCase()
    );
  }

  showUnderPreparation(element: TenderItem): boolean {
    return (
      element.tenderStatus.toLowerCase() ==
      'Work In View (Pending Tender Doc Released)'.toLowerCase()
    );
  }

  showBidSubmitted(element: TenderItem): boolean {
    return element.tenderStatus.toLowerCase() == 'Tender Under Preparation'.toLowerCase();
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
        element.tenderStatus.toLowerCase(),
      ) >= 0
    );
  }

  ngAfterViewInit() {}

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
          if (aKey === 'form20Id') {
            itemVal = item[aKey] ? item[aKey].toString() : '';
          }

          // console.log(aKey + '\t' + this.formGroup.value[aKey] + '\t' + itemVal);
          if (Array.isArray(this.formGroup.value[aKey])) {
            if (this.formGroup.value[aKey].length > 0) {
              // Case-insensitive partial matching for array values
              const searchValue = this.formGroup.value[aKey][0];
              const normalizedSearch = searchValue.toLowerCase();
              const normalizedItemVal = itemVal ? itemVal.toLowerCase() : '';
              
              if (!normalizedItemVal.includes(normalizedSearch)) {
                results[i] = false;
                continue;
              }
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
            if (Number(this.formGroup.value[aKey]) && +itemVal != +this.formGroup.value[aKey]) {
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

// Status Filter Dialog Component
@Component({
  selector: 'app-status-filter-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule],
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <h2 mat-dialog-title style="margin: 0; color: #1976d2; font-weight: 600;">Filter by Status</h2>
      
      <div style="display: flex; flex-direction: column; gap: 8px; max-height: 350px; overflow-y: auto; padding: 8px 0;">
        @for (status of data.statusList; track status) {
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: background 0.2s;">
            <input type="checkbox" [checked]="selectedStatuses.includes(status)" (change)="toggleStatus(status)">
            <span>{{ status }}</span>
          </label>
        }
      </div>
      
      <div style="display: flex; gap: 8px; justify-content: flex-end; padding-top: 8px;">
        <button mat-button (click)="cancel()">Cancel</button>
        <button mat-raised-button color="primary" (click)="applyFilter()">Apply</button>
      </div>
    </div>
  `,
  styles: [`
    label:hover {
      background-color: #e3f2fd;
    }
  `],
})
export class StatusFilterDialogComponent {
  selectedStatuses: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<StatusFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { statusList: string[]; selectedStatus: string[] },
  ) {
    // Initialize selected statuses from passed data
    if (data.selectedStatus && Array.isArray(data.selectedStatus) && data.selectedStatus.length > 0) {
      this.selectedStatuses = [...data.selectedStatus];
    }
  }

  toggleStatus(status: string): void {
    const index = this.selectedStatuses.indexOf(status);
    if (index > -1) {
      this.selectedStatuses.splice(index, 1);
    } else {
      this.selectedStatuses.push(status);
    }
  }

  applyFilter(): void {
    this.dialogRef.close(this.selectedStatuses);
  }

  cancel(): void {
    this.dialogRef.close(undefined);
  }
}

// Search Filter Dialog Component
@Component({
  selector: 'app-search-filter-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule],
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <h2 mat-dialog-title style="margin: 0; color: #1976d2; font-weight: 600;">Search</h2>
      
      <input 
        type="text"
        [(ngModel)]="searchValue" 
        (keyup.enter)="applyFilter()"
        placeholder="Type to search..."
        autofocus
        style="width: 100%; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; box-sizing: border-box;"
      />
      
      <div style="display: flex; gap: 8px; justify-content: flex-end; padding-top: 8px;">
        <button mat-button (click)="cancel()">Cancel</button>
        <button mat-raised-button color="primary" (click)="applyFilter()">Apply</button>
      </div>
    </div>
  `,
})
export class SearchFilterDialogComponent {
  searchValue: string = '';

  constructor(
    public dialogRef: MatDialogRef<SearchFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { filterList: string[]; selectedValue: string },
  ) {
    this.searchValue = data.selectedValue || '';
  }

  applyFilter(): void {
    this.dialogRef.close(this.searchValue);
  }

  cancel(): void {
    this.dialogRef.close(undefined);
  }
}