import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TenderListApiService } from '../../../../core/services/tender-list-api.service';
import {
  BusinessUnitApiService,
  BusinessUnit,
} from '../../../../core/services/business-unit-api.service';
import {
  CurrencyListApiService,
  Currency,
} from '../../../../core/services/currency-list-api.service';
import {
  GammonEntityApiService,
  GammonEntity,
} from '../../../../core/services/gammon-entity-api.service';
import {
  RiskAssessmentCriteriaApiService,
  RiskAssessmentCriteria,
} from '../../../../core/services/risk-assessment-criteria-api.service';
import {
  PriorityLevelListApiService,
  PriorityLevel,
} from '../../../../core/services/priority-level-list-api.service';
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
            <input matInput formControlName="tenderStatus" />
          </mat-form-field>
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
              <mat-radio-button value="China">China</mat-radio-button>
              <mat-radio-button value="Hongkong">Hongkong</mat-radio-button>
              <mat-radio-button value="Macau">Macau</mat-radio-button>
              <mat-radio-button value="Singapore">Singapore</mat-radio-button>
              <mat-radio-button value="International">International</mat-radio-button>
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

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Attachment</mat-label>
            <input matInput formControlName="attachment" />
          </mat-form-field>

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
      <div mat-dialog-actions align="end">
        <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!tenderForm.valid">
          Save
        </button>
      </div>
    </form>
  `,
  styles: [
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
  tenderForm: FormGroup;
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

  upDownGradeOption: PriorityLevel[] = [];
  whetherSatisfyRiskOption: RiskAssessmentCriteria[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddTenderPopupComponent>,
    private fb: FormBuilder,
    private tenderListApiService: TenderListApiService,
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
      tenderStatus: [undefined, []],
      reportDate: [undefined, []],
      businessUnitId: [undefined, Validators.required],
      isExternal: [undefined, []],
      region: [undefined, []],
      projectName: ['', [Validators.required, Validators.maxLength(this.projectNameMaxLength)]],
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
            // Patch the form with the response data
            this.tenderForm.patchValue({
              ...response.data,
              standardResponsePriorityLevel: response.data.standardResponsePriorityLevel,
            });
          }
        },
        error: (error) => {
          console.error('Error fetching tender details:', error);
        },
      });
    }
  }


  handleSubmit(): void {
    if (this.tenderForm.valid) {
      this.dialogRef.close(this.tenderForm.value);
    }
  }

  get divisionControl(): FormControl {
    return this.tenderForm.get('division') as FormControl;
  }

  get tenderStatusControl(): FormControl {
    return this.tenderForm.get('tenderStatus') as FormControl;
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
