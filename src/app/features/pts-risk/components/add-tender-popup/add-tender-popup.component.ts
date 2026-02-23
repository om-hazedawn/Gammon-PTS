import { Component, Inject, OnInit } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';

interface FileUploadStatus {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TenderListApiService } from '../../../../core/services/tender-list-api.service';
import { TenderAttachmentApiService } from '../../../../core/services/tenderAttchemnt-api.service';
import { BusinessUnitApiService } from '../../../../core/services/business-unit-api.service';
import { BusinessUnit } from '../../../../model/entity/pts-risk/business-unit';
import { CurrencyListApiService } from '../../../../core/services/currency-list-api.service';
import { Currency } from '../../../../model/entity/pts-risk/currency-list';
import { GammonEntityApiService } from '../../../../core/services/gammon-entity-api.service';
import { GammonEntity } from '../../../../model/entity/pts-risk/gammon-entity';
import { RiskAssessmentCriteriaApiService } from '../../../../core/services/risk-assessment-criteria-api.service';
import { RiskAssessmentCriteria } from '../../../../model/entity/pts-risk/risk-assessment-criteria';
import { PriorityLevelListApiService } from '../../../../core/services/priority-level-list-api.service';
import { PriorityLevel } from '../../../../model/entity/pts-risk/priority-level-list';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-add-tender-popup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
  ],
  template: `
    <h2 mat-dialog-title>Tender</h2>
    <form [formGroup]="tenderForm" (ngSubmit)="handleSubmit()">
      <div mat-dialog-content>
        <fieldset
          style="border: 1px solid #1976d2; border-radius: 8px; padding: 16px; margin-bottom: 16px;"
        >
          <legend style="font-weight: 600; color: #1976d2; padding: 0 8px;">
            Project Information
          </legend>
          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Tender Status</mat-label>
            <input matInput [value]="tenderStatusValue" disabled />
          </mat-form-field>
          @if (isShowReportDate()) {
            <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
              <mat-label>Report Date</mat-label>
              <input matInput [matDatepicker]="reportDateDatepicker" formControlName="reportDate" readonly />
              <mat-datepicker-toggle matSuffix [for]="reportDateDatepicker"></mat-datepicker-toggle>
              <mat-datepicker #reportDateDatepicker></mat-datepicker>
            </mat-form-field>
          }
          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Business Unit</mat-label>
            <mat-select formControlName="businessUnitId">
              @for (option of BusinessUnitsOption; track option.id) {
              <mat-option [value]="option.id">
                {{ option.name }}
              </mat-option>
              }
            </mat-select>

            @if (businessUnitIdControl.invalid && (businessUnitIdControl.dirty ||
            businessUnitIdControl.touched)) {
            <mat-error>
              <i class="fas fa-exclamation mx-1"></i>
              @if (businessUnitIdControl.errors && businessUnitIdControl.errors['required']) {
              <span>This field is required.</span>
              }
            </mat-error>
            }
          </mat-form-field>
          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>External/Internal</mat-label>
            <mat-radio-group
              formControlName="isExternal"
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
            >
              <mat-radio-button value="Y">External</mat-radio-button>
              <mat-radio-button value="N">Internal</mat-radio-button>
            </mat-radio-group>
          </div>
          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>Region</mat-label>
            <mat-radio-group
              formControlName="region"
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
            >
              <mat-radio-button value="CN">China</mat-radio-button>
              <mat-radio-button value="HK">Hongkong</mat-radio-button>
              <mat-radio-button value="MO">Macau</mat-radio-button>
              <mat-radio-button value="SG">Singapore</mat-radio-button>
              <mat-radio-button value="IT">International</mat-radio-button>
            </mat-radio-group>
          </div>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Project Name</mat-label>
            <input matInput formControlName="projectName" [maxlength]="projectNameMaxLength" />
            @if (projectNameControl.invalid && (projectNameControl.dirty ||
            projectNameControl.touched)) {
            <mat-error>
              <i class="fas fa-exclamation mx-1"></i>
              @if (projectNameControl.errors && projectNameControl.errors['required']) {
              <span>Project name is required.</span>
              } @if (projectNameControl.errors && projectNameControl.errors['maxlength']) {
              <span>Project name cannot exceed {{ projectNameMaxLength }} characters.</span>
              }
            </mat-error>
            }
            <mat-hint
              >{{ tenderForm.get('projectName')?.value?.toString().length || 0 }} /
              {{ projectNameMaxLength }}</mat-hint
            >
          </mat-form-field>
          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Expected tender issue date</mat-label>
            <input
              matInput
              [matDatepicker]="expectedTenderIssueDateDatepicker"
              formControlName="expectedTenderIssueDate"
              readonly
            />
            <mat-datepicker-toggle
              matSuffix
              [for]="expectedTenderIssueDateDatepicker"
            ></mat-datepicker-toggle>
            <mat-datepicker #expectedTenderIssueDateDatepicker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Expected tender submission date</mat-label>
            <input
              matInput
              [matDatepicker]="expectedTenderSubmissionDateDatepicker"
              formControlName="expectedTenderSubmissionDate"
              readonly
            />
            <mat-datepicker-toggle
              matSuffix
              [for]="expectedTenderSubmissionDateDatepicker"
            ></mat-datepicker-toggle>
            <mat-datepicker #expectedTenderSubmissionDateDatepicker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Project Duration (in month)</mat-label>
            <input matInput type="number" formControlName="projectDuration" min="0" />
            @if (projectDurationControl.invalid && (projectDurationControl.dirty ||
            projectDurationControl.touched)) {
            <mat-error>
              <i class="fas fa-exclamation mx-1"></i>
              @if (projectDurationControl.errors && projectDurationControl.errors['min']) {
              <span>It must be greater than or equal to 0.</span>
              }
            </mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Bidding Gammon entity</mat-label>
            <mat-select formControlName="biddingGammonEntityId">
              @for (option of GammonEntitiesOption; track option.id) {
              <mat-option [value]="option.id">
                {{ option.name }}
              </mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Project description & location</mat-label>
            <textarea
              matInput
              cdkTextareaAutosize
              autocomplete="off"
              formControlName="projectDescriptionAndLocation"
              cdkAutosizeMaxRows="5"
              [maxlength]="projectDescriptionMaxLength"
              [cdkTextareaAutosize]="true"
            ></textarea>
            @if (projectDescriptionControl.invalid && (projectDescriptionControl.dirty ||
            projectDescriptionControl.touched)) {
            <mat-error>
              <i class="fas fa-exclamation mx-1"></i>
              @if (projectDescriptionControl.errors &&
              projectDescriptionControl.errors['maxlength']) {
              <span
                >Project description cannot exceed
                {{ projectDescriptionMaxLength }} characters.</span
              >
              }
            </mat-error>
            }
            <mat-hint
              >{{
                tenderForm.get('projectDescriptionAndLocation')?.value?.toString().length || 0
              }}
              / {{ projectDescriptionMaxLength }}</mat-hint
            >
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Customer Name</mat-label>
            <input
              matInput
              formControlName="customerName"
              [maxlength]="customerNameMaxLength"
              type="text"
            />
            <mat-hint
              >{{ tenderForm.get('customerName')?.value?.toString().length || 0 }} /
              {{ customerNameMaxLength }}</mat-hint
            >
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Market Sector</mat-label>
            <input
              matInput
              formControlName="marketSectorVal"
              [maxlength]="marketSectorValMaxLength"
              type="text"
            />
            <mat-hint
              >{{ tenderForm.get('marketSectorVal')?.value?.toString().length || 0 }} /
              {{ marketSectorValMaxLength }}</mat-hint
            >
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Currency</mat-label>
            <mat-select formControlName="currencyId">
              @for (option of currencyOption; track option.id) {
              <mat-option [value]="option.id">
                {{ option.code }}
              </mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Estimated tender value (in Millions)</mat-label>
            <input
              matInput
              formControlName="estimatedTenderValue"
              min="0"
              max="999999"
              type="number"
            />
            @if (estimatedTenderValueControl.invalid && (estimatedTenderValueControl.dirty ||
            estimatedTenderValueControl.touched)) {
            <mat-error>
              <i class="fas fa-exclamation mx-1"></i>
              @if (estimatedTenderValueControl.errors && estimatedTenderValueControl.errors['min'])
              {
              <span>Value must be greater than or equal to 0.</span>
              } @if (estimatedTenderValueControl.errors &&
              estimatedTenderValueControl.errors['max']) {
              <span>Value cannot exceed 999,999.</span>
              }
            </mat-error>
            }
          </mat-form-field>

          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>Whether external main contractor (For CSD only)</mat-label>
            <mat-radio-group
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
              formControlName="isExternalMainContractor"
            >
              <mat-radio-button value="Y">Yes</mat-radio-button>
              <mat-radio-button value="N">No</mat-radio-button>
            </mat-radio-group>
          </div>

          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>Whether key customer </mat-label><span class="text-danger">*</span>
            <mat-radio-group
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
              formControlName="isKeyCustomer"
            >
              <mat-radio-button value="Y">Yes</mat-radio-button>
              <mat-radio-button value="N">No</mat-radio-button>
            </mat-radio-group>
          </div>

          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>Whether key sector </mat-label><span class="text-danger">*</span>
            <mat-radio-group
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
              formControlName="isKeySector"
            >
              <mat-radio-button value="Y">Yes</mat-radio-button>
              <mat-radio-button value="N">No</mat-radio-button>
            </mat-radio-group>
          </div>

          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>Whether joint venture </mat-label><span class="text-danger">*</span>
            <mat-radio-group
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
              formControlName="isJointVenture"
            >
              <mat-radio-button value="Y">Yes</mat-radio-button>
              <mat-radio-button value="N">No</mat-radio-button>
            </mat-radio-group>
          </div>

          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>Foreseen BU capacity </mat-label><span class="text-danger">*</span>
            <mat-radio-group
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
              formControlName="foreseenBUCapacity"
            >
              <mat-radio-button value="FP">Full pipeline</mat-radio-button>
              <mat-radio-button value="WC">With capacity</mat-radio-button>
            </mat-radio-group>
          </div>

          <div class="standard-response-row">
            <div class="standard-response-label">Standard response</div>
            <div class="standard-response-content">
              <div class="evaluated-decision">{{ getStandardResponseTitle() }}</div>
              <div class="evaluated-decision">
                {{ tenderForm.get('standardResponseHint')?.value || '' }}
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset
          style="border: 1px solid #1976d2; border-radius: 8px; padding: 16px; margin-bottom: 16px;"
        >
          <legend style="font-weight: 600; color: #1976d2; padding: 0 8px;">
            Apply for up/ downgrade?
          </legend>
          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Up / downgrade</mat-label>
            <mat-select formControlName="upgradeDowngradePriorityLevelId">
              @for (option of upDownGradeOption; track option.id) {
              <mat-option [value]="option.id">
                {{ option.title }}
              </mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Rationale</mat-label>
            <textarea
              matInput
              cdkTextareaAutosize
              autocomplete="off"
              formControlName="upgradeDowngradeRationale"
              cdkAutosizeMaxRows="5"
              [maxlength]="upgradeDowngradeRationaleMaxLength"
              [cdkTextareaAutosize]="true"
            ></textarea>
            <mat-hint
              >{{ tenderForm.get('upgradeDowngradeRationale')?.value?.toString().length || 0 }} /
              {{ upgradeDowngradeRationaleMaxLength }}</mat-hint
            >
          </mat-form-field>
        </fieldset>

        <fieldset
          style="border: 1px solid #1976d2; border-radius: 8px; padding: 16px; margin-bottom: 16px;"
        >
          <legend style="font-weight: 600; color: #1976d2; padding: 0 8px;">Risk assessment</legend>
          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Whether satisfy risk assessment criteria</mat-label>
            <mat-select formControlName="riskAssessmentCriteriaId">
              @for (option of whetherSatisfyRiskOption; track option.id) {
              <mat-option [value]="option.id">
                {{ option.title }}
              </mat-option>
              }
            </mat-select>
            @if (riskAssessmentCriteriaIdControl.invalid && (riskAssessmentCriteriaIdControl.dirty
            || riskAssessmentCriteriaIdControl.touched)) {
            <mat-error>
              <i class="fas fa-exclamation mx-1"></i>
              @if (riskAssessmentCriteriaIdControl.errors &&
              riskAssessmentCriteriaIdControl.errors['required']) {
              <span>This field is required.</span>
              }
            </mat-error>
            }
          </mat-form-field>

          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>Risk assessment</mat-label>
            <mat-radio-group
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
              formControlName="riskAssessmentLevel"
            >
              <mat-radio-button value="HIGH">High</mat-radio-button>
              <mat-radio-button value="MEDIUM">Medium</mat-radio-button>
              <mat-radio-button value="LOW">Low</mat-radio-button>
            </mat-radio-group>
          </div>
          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Rationale</mat-label>
            <textarea
              matInput
              cdkTextareaAutosize
              autocomplete="off"
              formControlName="riskAssessmentRationale"
              cdkAutosizeMaxRows="5"
              [maxlength]="riskAssessmentRationaleMaxLength"
              [cdkTextareaAutosize]="true"
            ></textarea>
          </mat-form-field>

          <div style="width: 100%; margin-bottom: 16px;">
            <label style="font-weight: 600; color: #1976d2; display: block; margin-bottom: 8px;">Attachments</label>
            @if (tenderAttachments && tenderAttachments.length > 0) {
              <div>
                <ul style="padding-left: 16px;">
                  @for (att of tenderAttachments; track att.id) {
                    <li>
                      <span>{{ att.originalFileName }}</span>
                      <button
                        mat-icon-button
                        color="primary"
                        (click)="downloadAttachment(att)"
                        matTooltip="Download attachment"
                      >
                        <mat-icon>download</mat-icon>
                      </button>
                    </li>
                  }
                </ul>
              </div>
            }
            @if (!tenderAttachments || tenderAttachments.length === 0) {
              <div>
                <span>No attachments available.</span>
              </div>
            }
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px;">
              <button
                mat-icon-button
                matSuffix
                color="primary"
                (click)="fileInput.click()"
                type="button"
                [matTooltip]="'Maximum file size: 10MB'"
              >
                <mat-icon>attach_file</mat-icon>
              </button>
              @if (selectedFileName) {
                <span>{{ selectedFileName }}</span>
              }
              <button
                mat-raised-button
                color="accent"
                type="button"
                (click)="uploadSelectedFile()"
                [disabled]="!selectedFile"
              >
                Upload
              </button>
            </div>
            <input
              type="file"
              #fileInput
              hidden
              (change)="onFileSelected($event)"
              [accept]="acceptedFileTypes"
            />
            <div style="font-size: 12px; color: #888; margin-top: 4px;">Accepted formats: PDF, Word, Excel (max 10MB)</div>
          </div>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Additional Note</mat-label>
            <input
              formControlName="additionalNote"
              matInput
              [maxlength]="additionalNoteMaxLength"
              type="text"
            />
            <mat-hint
              >{{ tenderForm.get('additionalNote')?.value?.length || 0 }} /
              {{ additionalNoteMaxLength }}</mat-hint
            >
          </mat-form-field>
        </fieldset>
      </div>
      <div class="flex justify-between items-center">
        <div mat-dialog-actions align="start">
          @if(data.id) {
          <button mat-raised-button color="warn" type="button" (click)="onDelete()">Delete</button>
          }
        </div>
        <div mat-dialog-actions align="end">
          <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="!tenderForm.valid">
            Save
          </button>
        </div>
      </div>
    </form>
    <!-- Upload Status Summary -->
    @if (showUploadSummary) {
      <div class="upload-summary">
        <h3>Upload Summary</h3>
        @for (status of uploadStatuses; track status.file.name) {
          <div class="upload-status-item">
            <div class="file-info">
              <span>{{ status.file.name }}</span>
              <span [class]="'status-' + status.status">
                {{ status.status === 'uploading' ? status.progress + '%' : status.status }}
              </span>
            </div>
            @if (status.error) {
              <div class="error-message">
                {{ status.error }}
              </div>
            }
          </div>
        }
      </div>
    }
  `,
  styles: [
    `
      .upload-summary {
        margin-top: 16px;
        padding: 16px;
        background-color: #f5f5f5;
        border-radius: 4px;
      }
      .upload-status-item {
        margin-bottom: 8px;
        padding: 8px;
        background-color: white;
        border-radius: 4px;
      }
      .file-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .status-completed {
        color: #4caf50;
      }
      .status-error {
        color: #f44336;
      }
      .status-uploading {
        color: #2196f3;
      }
      .error-message {
        color: #f44336;
        font-size: 12px;
        margin-top: 4px;
      }
    `,
    `
      .standard-response-row {
        display: flex;
        align-items: center;
        padding: 12px 8px;
        margin: 12px 0;
        background-color: #f5f7fa;
        border-radius: 4px;
      }
      .standard-response-label {
        flex: 0 0 30%;
        font-weight: 500;
        color: #1976d2;
      }
      .standard-response-content {
        flex: 1;
      }
      .evaluated-decision {
        font-size: 15px;
        margin-bottom: 4px;
      }
      h2 {
        margin-bottom: 16px;
        font-size: 1.6rem;
        color: #1976d2;
        font-weight: 700;
      }
      mat-dialog-content {
        min-width: 400px;
        max-height: 80vh;
        overflow-y: auto;
        padding: 16px;
      }
      mat-form-field {
        width: 100%;
        margin-bottom: 16px;
      }
      mat-dialog-actions {
        margin: 16px -16px -16px;
        padding: 16px;
        background-color: #f5f5f5;
        border-top: 1px solid #e0e0e0;
      }
    `,
  ],
})
export class AddTenderPopupComponent implements OnInit {
      /**
       * Download attachment by fetching file blob from API and triggering browser download
       */
      downloadAttachment(att: any): void {
        if (!att?.id) return;
        this.tenderAttachmentService.getAttachment(att.id).subscribe({
          next: (blob: Blob) => {
            const filename = att.originalFileName || 'attachment';
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
            }, 100);
          },
          error: (error: any) => {
            console.error('Error downloading attachment:', error);
            alert('Failed to download attachment. Please try again.');
          },
        });
      }
    uploadSelectedFile(): void {
      if (!this.selectedFile || !this.data?.id) return;
      const tenderId = this.data.id;
      const uploadStatus: FileUploadStatus = {
        file: this.selectedFile,
        progress: 0,
        status: 'pending',
      };
      this.uploadStatuses.push(uploadStatus);
      this.tenderAttachmentService.uploadAttachment(tenderId, this.selectedFile).subscribe({
        next: (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              if (event.total) {
                uploadStatus.progress = Math.round((100 * event.loaded) / event.total);
                uploadStatus.status = 'uploading';
              }
              break;
            case HttpEventType.Response:
              uploadStatus.status = 'completed';
              uploadStatus.progress = 100;
              this.showUploadSummary = true;
              // Refresh attachments list after upload
              this.tenderListApiService.getTenderById(tenderId).subscribe({
                next: (refreshResponse) => {
                  const ta = refreshResponse.data.tenderAttachments;
                  if (Array.isArray(ta)) {
                    this.tenderAttachments = ta;
                  } else if (ta) {
                    this.tenderAttachments = [ta];
                  } else {
                    this.tenderAttachments = [];
                  }
                },
                error: (error) => {
                  console.error('Error refreshing attachments:', error);
                },
              });
              // Clear selected file after upload
              this.selectedFile = null;
              this.selectedFileName = null;
              break;
          }
        },
        error: (error: any) => {
          uploadStatus.status = 'error';
          uploadStatus.error = this.getErrorMessage(error);
          console.error('Error uploading file:', error);
          this.showUploadSummary = true;
        },
      });
    }
  tenderForm: FormGroup;
  tenderStatusValue: string | null = null;
  selectedFileName: string | null = null;
  selectedFile: File | null = null;
  uploadStatuses: FileUploadStatus[] = [];
  showUploadSummary = false;
  maxFileSize = 10 * 1024 * 1024; // 10MB
  acceptedFileTypes = '.pdf,.doc,.docx,.xls,.xlsx,.txt';
  projectNameMaxLength = 1000;
  projectDescriptionMaxLength = 1000;
  customerNameMaxLength = 300;
  upgradeDowngradeRationaleMaxLength = 1000;
  riskAssessmentRationaleMaxLength = 1000;
  additionalNoteMaxLength = 1000;
  marketSectorValMaxLength = 1000;

  BusinessUnitsOption: BusinessUnit[] = [];
  GammonEntitiesOption: GammonEntity[] = [];
  currencyOption: Currency[] = [];
  tenderAttachments: any[] = [];

  upDownGradeOption: PriorityLevel[] = [];
  whetherSatisfyRiskOption: RiskAssessmentCriteria[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddTenderPopupComponent>,
    private fb: FormBuilder,
    private tenderListApiService: TenderListApiService,
    private tenderAttachmentService: TenderAttachmentApiService,
    private businessUnitApiService: BusinessUnitApiService,
    private gammonEntityApiService: GammonEntityApiService,
    private currencyListApiService: CurrencyListApiService,
    private riskAssessmentCriteriaApiService: RiskAssessmentCriteriaApiService,
    private priorityLevelListApiService: PriorityLevelListApiService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
    this.tenderForm = this.fb.group({
      attachment: [''],
      division: [undefined, []],
      reportDate: [undefined, []],
      businessUnitId: [undefined, Validators.required],
      isExternal: [undefined, []],
      region: [undefined, []],
      projectName: ['', Validators.maxLength(this.projectNameMaxLength)],
      expectedTenderIssueDate: [undefined, []],
      expectedTenderSubmissionDate: [undefined, []],
      projectDuration: [undefined, []],
      biddingGammonEntityId: [undefined, []],
      projectDescriptionAndLocation: ['', [Validators.maxLength(this.projectDescriptionMaxLength)]],
      customerName: ['', [Validators.maxLength(this.customerNameMaxLength)]],
      marketSectorVal: ['', [Validators.maxLength(this.marketSectorValMaxLength)]],
      marketSectorId: [undefined, []],
      currencyId: [undefined, []],
      estimatedTenderValue: [undefined, [Validators.min(0), Validators.max(999999)]],
      isExternalMainContractor: [undefined, []],
      isKeyCustomer: [undefined, Validators.required],
      isKeySector: [undefined, Validators.required],
      isJointVenture: [undefined, Validators.required],
      foreseenBUCapacity: [undefined, Validators.required],
      standardResponsePriorityLevelId: [undefined, []],
      standardResponseHint: [undefined, []],
      standardResponsePriorityLevel: [undefined, []],
      upgradeDowngradePriorityLevelId: [undefined, []],
      upgradeDowngradeRationale: [
        '',
        [Validators.maxLength(this.upgradeDowngradeRationaleMaxLength)],
      ],
      riskAssessmentCriteriaId: [undefined, Validators.required],
      riskAssessmentLevel: [undefined, []],
      riskAssessmentRationale: ['', [Validators.maxLength(this.riskAssessmentRationaleMaxLength)]],
      additionalNote: ['', [Validators.maxLength(this.additionalNoteMaxLength)]],
    });
  }

  ngOnInit() {
    this.businessUnitApiService.getBussinessUnitDropdown().subscribe({
      next: (businessUnits) => {
        this.BusinessUnitsOption = businessUnits;
      },
      error: (error) => {
        console.error('Error fetching business units:', error);
      },
    });

    this.gammonEntityApiService.getgammonEntityDropdown().subscribe({
      next: (entities) => {
        this.GammonEntitiesOption = entities;
      },
      error: (error) => {
        console.error('Error fetching Gammon entities:', error);
      },
    });

    this.currencyListApiService.getCurrencyDropdown().subscribe({
      next: (currencies) => {
        this.currencyOption = currencies;
      },
      error: (error) => {
        console.error('Error fetching currencies:', error);
      },
    });

    this.riskAssessmentCriteriaApiService.getRiskAssessmentCriteriaForDropdown().subscribe({
      next: (criteria) => {
        this.whetherSatisfyRiskOption = criteria;
      },
      error: (error) => {
        console.error('Error fetching risk assessment criteria:', error);
      },
    });

    this.priorityLevelListApiService.getPriorityLevelsForDropdown().subscribe({
      next: (priorityLevels) => {
        this.upDownGradeOption = priorityLevels;
      },
      error: (error) => {
        console.error('Error fetching priority levels:', error);
      },
    });

    if (this.data?.id) {
      this.tenderListApiService.getTenderById(this.data.id).subscribe({
        next: (response) => {
          if (response && response.data) {
            // Store tender status separately (fetch-only, not user editable)
            this.tenderStatusValue = response.data.tenderStatus || null;
            
            this.tenderForm.patchValue({
              ...response.data,
              projectDescriptionAndLocation: response.data.projectDescription,
              standardResponsePriorityLevel: response.data.standardResponsePriorityLevel,
            });
            const ta = response.data.tenderAttachments;
            if (Array.isArray(ta)) {
              this.tenderAttachments = ta;
            } else if (ta) {
              this.tenderAttachments = [ta];
            } else {
              this.tenderAttachments = [];
            }
          }
        },
        error: (error) => {
          console.error('Error fetching tender details:', error);
        },
      });
    }
  }

  private getErrorMessage(error: any): string {
    if (error.error?.message) {
      return error.error.message;
    } else if (error.status === 413) {
      return 'File is too large. Maximum size allowed is 10MB';
    } else if (error.status === 415) {
      return `Invalid file type. Accepted formats are: ${this.acceptedFileTypes}`;
    } else {
      return error.message || 'Upload failed. Please try again.';
    }
  }

  handleSubmit(): void {
    // Clear previous upload statuses
    this.uploadStatuses = [];
    this.showUploadSummary = false;

    // Log the form data before submission
    console.log('Form data being submitted:', this.tenderForm.value);

    if (!this.tenderForm.valid) {
      const errors: string[] = [];
      Object.keys(this.tenderForm.controls).forEach((key) => {
        const control = this.tenderForm.get(key);
        if (control?.errors) {
          const fieldName = key.replace(/([A-Z])/g, ' $1').toLowerCase();
          const errorTypes = Object.keys(control.errors).map((type) => {
            switch (type) {
              case 'required':
                return 'is required';
              case 'maxlength':
                return 'exceeds maximum length';
              case 'min':
                return 'must be greater than or equal to 0';
              case 'max':
                return 'exceeds maximum value';
              default:
                return type;
            }
          });
          errors.push(`${fieldName}: ${errorTypes.join(', ')}`);
        }
      });

      const uploadStatus: FileUploadStatus = {
        file: this.selectedFile || new File([], 'form-validation'),
        progress: 0,
        status: 'error',
        error: `Please fix the following validation errors:\n${errors.join('\n')}`,
      };
      this.uploadStatuses = [uploadStatus];
      this.showUploadSummary = true;
      return;
    }

    if (this.tenderForm.valid) {
      const tenderData = {
        tender: {
          additionalNote: this.tenderForm.get('additionalNote')?.value || '',
          biddingGammonEntityId: this.tenderForm.get('biddingGammonEntityId')?.value || null,
          businessUnitId: this.tenderForm.get('businessUnitId')?.value,
          currencyId: this.tenderForm.get('currencyId')?.value || null,
          customerName: this.tenderForm.get('customerName')?.value || '',
          division: this.tenderForm.get('division')?.value || null,
          estimatedTenderValue: this.tenderForm.get('estimatedTenderValue')?.value || 0,
          expectedTenderIssueDate: this.tenderForm.get('expectedTenderIssueDate')?.value || null,
          expectedTenderSubmissionDate:
            this.tenderForm.get('expectedTenderSubmissionDate')?.value || null,
          foreseenBUCapacity: this.tenderForm.get('foreseenBUCapacity')?.value || null,
          id: this.data?.id || null,
          isExternal: this.tenderForm.get('isExternal')?.value || null,
          isExternalMainContractor: this.tenderForm.get('isExternalMainContractor')?.value || null,
          isJointVenture: this.tenderForm.get('isJointVenture')?.value || null,
          isKeyCustomer: this.tenderForm.get('isKeyCustomer')?.value || null,
          isKeySector: this.tenderForm.get('isKeySector')?.value || null,
          marketSectorId: this.tenderForm.get('marketSectorId')?.value || null,
          marketSectorVal: this.tenderForm.get('marketSectorVal')?.value || '',
          projectDescription: this.tenderForm.get('projectDescriptionAndLocation')?.value || '',
          projectDuration: this.tenderForm.get('projectDuration')?.value || null,
          projectName: this.tenderForm.get('projectName')?.value || '',
          region: this.tenderForm.get('region')?.value || null,
          reportDate: this.tenderForm.get('reportDate')?.value || null,
          riskAssessmentCriteriaId: this.tenderForm.get('riskAssessmentCriteriaId')?.value,
          riskAssessmentLevel: this.tenderForm.get('riskAssessmentLevel')?.value || null,
          riskAssessmentRationale: this.tenderForm.get('riskAssessmentRationale')?.value || '',
          tenderStatus: this.tenderStatusValue || null,
          upgradeDowngradePriorityLevelId:
            this.tenderForm.get('upgradeDowngradePriorityLevelId')?.value || null,
          upgradeDowngradeRationale: this.tenderForm.get('upgradeDowngradeRationale')?.value || '',
        },
      };

      console.log('Sending tender data to API:', tenderData);
      console.log('API URL:', '/api/ptsrisk/Tender/api/tender');

      this.tenderListApiService.putandaddTender(tenderData).subscribe({
        next: (response: any) => {
          console.log('API Response:', response);
          const tenderId = response.data?.id || this.data?.id;
          console.log('Tender ID received:', tenderId);

          if (this.selectedFile && tenderId) {
            // Create upload status entry
            const uploadStatus: FileUploadStatus = {
              file: this.selectedFile,
              progress: 0,
              status: 'pending',
            };
            this.uploadStatuses.push(uploadStatus);

            // Upload file directly without wrapping in FormData
            console.log('Uploading attachment using TenderListApiService');

            this.tenderAttachmentService.uploadAttachment(tenderId, this.selectedFile).subscribe({
              next: (event: HttpEvent<any>) => {
                switch (event.type) {
                  case HttpEventType.UploadProgress:
                    if (event.total) {
                      uploadStatus.progress = Math.round((100 * event.loaded) / event.total);
                      uploadStatus.status = 'uploading';
                    }
                    break;
                  case HttpEventType.Response:
                    uploadStatus.status = 'completed';
                    uploadStatus.progress = 100;
                    this.showUploadSummary = true;
                    // Refresh attachments list after upload
                    this.tenderListApiService.getTenderById(tenderId).subscribe({
                      next: (refreshResponse) => {
                        const ta = refreshResponse.data.tenderAttachments;
                        if (Array.isArray(ta)) {
                          this.tenderAttachments = ta;
                        } else if (ta) {
                          this.tenderAttachments = [ta];
                        } else {
                          this.tenderAttachments = [];
                        }
                      },
                      error: (error) => {
                        console.error('Error refreshing attachments:', error);
                      },
                    });
                    // Do not close the dialog automatically after upload
                    break;
                }
              },
              error: (error: any) => {
                uploadStatus.status = 'error';
                uploadStatus.error = this.getErrorMessage(error);
                console.error('Error uploading file:', error);
                this.showUploadSummary = true;
              },
            });
          } else {
            this.dialogRef.close(response);
          }

          console.log(`Tender ${tenderId ? 'updated' : 'created'} successfully:`, response);
        },
        error: (error) => {
          console.error('Error saving tender:', error);
        },
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const uploadStatus: FileUploadStatus = {
        file: file,
        progress: 0,
        status: 'pending',
      };

      // Check file size
      if (file.size > this.maxFileSize) {
        uploadStatus.status = 'error';
        uploadStatus.error = `File size (${(file.size / (1024 * 1024)).toFixed(
          2
        )}MB) exceeds maximum allowed size of 10MB`;
        this.uploadStatuses = [uploadStatus];
        this.showUploadSummary = true;
        return;
      }

      // Check file type
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const allowedExts = this.acceptedFileTypes.split(',').map((ext) => ext.replace('.', ''));
      if (!allowedExts.includes(fileExt || '')) {
        uploadStatus.status = 'error';
        uploadStatus.error = `Invalid file type ".${fileExt}". Accepted formats are: ${this.acceptedFileTypes}`;
        this.uploadStatuses = [uploadStatus];
        this.showUploadSummary = true;
        return;
      }

      this.selectedFile = file;
      this.selectedFileName = file.name;
      this.tenderForm.patchValue({
        attachment: file.name,
      });
    }
  }

  onDelete(): void {
    if (this.data?.id) {
      if (confirm('Are you sure you want to delete this tender?')) {
        this.tenderListApiService.deleteTender(this.data.id).subscribe({
          next: () => {
            console.log('Tender deleted successfully');
            alert('Tender deleted successfully');
            this.dialogRef.close({ deleted: true });
          },
          error: (error) => {
            console.error('Error deleting tender:', error);
            alert('Failed to delete tender. Please try again.');
          },
        });
      }
    }
  }

  get divisionControl(): FormControl {
    return this.tenderForm.get('division') as FormControl;
  }


  isShowReportDate(): boolean {
    return (
      ['Expired', 'Successful', 'Unsuccessful', 'Withdraw / Declined'].indexOf(
        this.tenderStatusValue || ''
      ) >= 0
    );
  }

  get reportDateControl(): FormControl {
    return this.tenderForm.get('reportDate') as FormControl;
  }

  get businessUnitIdControl(): FormControl {
    return this.tenderForm.get('businessUnitId') as FormControl;
  }

  get regionControl(): FormControl {
    return this.tenderForm.get('region') as FormControl;
  }

  get projectNameControl(): FormControl {
    return this.tenderForm.get('projectName') as FormControl;
  }

  get projectDurationControl(): FormControl {
    return this.tenderForm.get('projectDuration') as FormControl;
  }

  get biddingGammonEntityIdControl(): FormControl {
    return this.tenderForm.get('biddingGammonEntityId') as FormControl;
  }

  get projectDescriptionControl(): FormControl {
    return this.tenderForm.get('projectDescriptionAndLocation') as FormControl;
  }

  get customerNameControl(): FormControl {
    return this.tenderForm.get('customerName') as FormControl;
  }

  get marketSectorValControl(): FormControl {
    return this.tenderForm.get('marketSectorVal') as FormControl;
  }

  get marketSectorIdControl(): FormControl {
    return this.tenderForm.get('marketSectorId') as FormControl;
  }

  get currencyIdControl(): FormControl {
    return this.tenderForm.get('currencyId') as FormControl;
  }

  get estimatedTenderValueControl(): FormControl {
    return this.tenderForm.get('estimatedTenderValue') as FormControl;
  }

  get upgradeDowngradePriorityLevelIdControl(): FormControl {
    return this.tenderForm.get('upgradeDowngradePriorityLevelId') as FormControl;
  }

  get upgradeDowngradeRationaleControl(): FormControl {
    return this.tenderForm.get('upgradeDowngradeRationale') as FormControl;
  }

  get riskAssessmentCriteriaIdControl(): FormControl {
    return this.tenderForm.get('riskAssessmentCriteriaId') as FormControl;
  }

  get riskAssessmentRationaleControl(): FormControl {
    return this.tenderForm.get('riskAssessmentRationale') as FormControl;
  }

  get additionalNoteControl(): FormControl {
    return this.tenderForm.get('additionalNote') as FormControl;
  }

  getStandardResponseTitle(): string {
    const standardResponse = this.tenderForm.get('standardResponsePriorityLevel')?.value;
    return standardResponse?.title || 'Not set';
  }
}
