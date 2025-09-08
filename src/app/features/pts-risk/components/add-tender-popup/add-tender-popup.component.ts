import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
          <div fxFlex="30">Tender Status</div>
          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Business Unit</mat-label>
            <mat-select  required>
              <mat-option *ngFor="let option of BusinessUnitsOption" [value]="option.id">
                {{ option.title }}
              </mat-option>
            </mat-select>
          </mat-form-field>
          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>External/Internal</mat-label>
            <mat-radio-group
              formControlName="externalInternal"
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
            >
              <mat-radio-button value="External">External</mat-radio-button>
              <mat-radio-button value="Internal">Internal</mat-radio-button>
            </mat-radio-group>
          </div>
          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>Region</mat-label>
            <mat-radio-group
              formControlName="externalInternal"
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
            <input matInput formControlName="projectName" maxlength="1000" required />
            <mat-hint
              >{{ tenderForm.get('otherReasonForLoss')?.value?.length || 0 }} / 1000</mat-hint
            >
            <mat-error
              *ngIf="
                tenderForm.get('otherReasonForLoss')?.invalid &&
                (tenderForm.get('otherReasonForLoss')?.dirty ||
                  tenderForm.get('otherReasonForLoss')?.touched)
              "
            >
              <span *ngIf="tenderForm.get('otherReasonForLoss')?.errors?.['maxlength']"
                >Maximum length exceeded.</span
              >
            </mat-error>
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
            <input matInput type="number" formControlName="projectDuration" required />
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Bidding Gammon entity</mat-label>
            <mat-select required>
              <mat-option *ngFor="let option of GammonEntitiesOption" [value]="option.id">
                {{ option.title }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Project description & location</mat-label>
            <input matInput required />
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Customer Name</mat-label>
            <input matInput required />
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Market Sector</mat-label>
            <input matInput required />
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Currency</mat-label>
            <mat-select required>
              <mat-option *ngFor="let option of currencyOption" [value]="option.id">
                {{ option.title }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Estimated tender value (in Millions)</mat-label>
            <input matInput required />
          </mat-form-field>

          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>Whether external main contractor (For CSD only)</mat-label>
            <mat-radio-group
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
            >
              <mat-radio-button value="China">Yes</mat-radio-button>
              <mat-radio-button value="Hongkong">No</mat-radio-button>
            </mat-radio-group>
          </div>

          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>Whether key customer </mat-label>
            <mat-radio-group
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
            >
              <mat-radio-button value="China">Yes</mat-radio-button>
              <mat-radio-button value="Hongkong">No</mat-radio-button>
            </mat-radio-group>
          </div>

          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>Whether key sector</mat-label>
            <mat-radio-group
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
            >
              <mat-radio-button value="China">Yes</mat-radio-button>
              <mat-radio-button value="Hongkong">No</mat-radio-button>
            </mat-radio-group>
          </div>

          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>Whether joint venture</mat-label>
            <mat-radio-group
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
            >
              <mat-radio-button value="China">Yes</mat-radio-button>
              <mat-radio-button value="Hongkong">No</mat-radio-button>
            </mat-radio-group>
          </div>

          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>Foreseen BU capacity </mat-label>
            <mat-radio-group
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
            >
              <mat-radio-button value="China">Yes</mat-radio-button>
              <mat-radio-button value="Hongkong">No</mat-radio-button>
            </mat-radio-group>
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
            <mat-select  required>
              <mat-option *ngFor="let option of GammonEntitiesOption" [value]="option.id">
                {{ option.title }}
              </mat-option>
            </mat-select>

          </mat-form-field>
          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Rationale</mat-label>
            <input matInput required />
          </mat-form-field>
        </fieldset>

        <fieldset
          style="border: 1px solid #1976d2; border-radius: 8px; padding: 16px; margin-bottom: 16px;"
        >
          <legend style="font-weight: 600; color: #1976d2; padding: 0 8px;">Risk assessment</legend>
          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Whether satisfy risk assessment criteria</mat-label>
            <mat-select  required>
              <mat-option *ngFor="let option of whetherSatisfyRiskOption" [value]="option.id">
                {{ option.title }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>Risk assessment</mat-label>
            <mat-radio-group
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
            >
              <mat-radio-button value="China">High</mat-radio-button>
              <mat-radio-button value="Hongkong">Medium</mat-radio-button>
              <mat-radio-button value="Macau">Low</mat-radio-button>
            </mat-radio-group>
          </div>
          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Rationale</mat-label>
            <input matInput required />
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Attachment</mat-label>
            <input matInput required />
          </mat-form-field>

          <mat-form-field appearance="fill" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Additional Note</mat-label>
            <input matInput required />
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
      h2 {
        margin-bottom: 16px;
        font-size: 1.6rem;
        color: #1976d2;
        font-weight: 700;
      }
      mat-dialog-content {
        min-width: 350px;
        padding-bottom: 8px;
      }
      mat-form-field {
        width: 100%;
      }
      mat-dialog-actions {
        margin-top: 16px;
      }
    `,
  ],
})
export class AddTenderPopupComponent {
  tenderForm: FormGroup;
  BusinessUnitsOption = [
    { id: 1, title: 'Building(BDG)' },
    { id: 2, title: 'Civil(CVL)' },
    { id: 3, title: 'CSD(CSD)' },
    { id: 4, title: 'E&M(E&M)' },
    { id: 5, title: 'Facade(FAC)' },
    { id: 6, title: 'Foundation(FDN)' },
    { id: 7, title: 'Singapore(SGP)' }
  ];
  GammonEntitiesOption = [
    { id: 1, title: 'Entasis' },
    { id: 2, title: 'Gammon Construction and Eng. Pte Ltd' },
    { id: 3, title: 'Gammon Construction Limited' },
    { id: 4, title: 'Gammon E&M Ltd' },
    { id: 5, title: 'Gammon Management Services Limited' },
    { id: 6, title: 'Gammon Plant Ltd(HK)' },
    { id: 7, title: 'Gammon Pte Ltd(SGP)' },
    { id: 8, title: 'GBCL' },
    { id: 9, title: 'GBCML' },
    { id: 10, title: 'GECCL' },
  ];
  currencyOption = [
    { id: 1, title: 'CYN' },
    { id: 2, title: 'GBP' },
    { id: 3, title: 'HKD' },
    { id: 4, title: 'MOP' },
    { id: 5, title: 'SGD' },
    { id: 6, title: 'USD' },
  ]

  upDownGradeOption = [
    { id: 1, title: 'For EXCOM Review' },
    { id: 2, title: 'NO go' },
    { id: 3, title: 'Lean' },
    { id: 4, title: 'Target' },
    { id: 5, title: 'Top priority' },
    { id: 6, title: 'Go' },
  ]
  whetherSatisfyRiskOption = [
    { id: 1, title: 'Unique partnership' },
    { id: 2, title: 'New customer' },
    { id: 3, title: 'New techinical capability required' },
    { id: 4, title: 'Technical risk' },
    { id: 5, title: 'Contractual risk' },
    { id: 6, title: 'Financial risk' },
    { id: 7, title: 'customer credit risk' },
    { id: 8, title: 'Multiple please specify in Rationale' },
    { id: 9, title: 'None of the above' },
  ]

  constructor(public dialogRef: MatDialogRef<AddTenderPopupComponent>, private fb: FormBuilder) {
    this.tenderForm = this.fb.group({
      tenderName: ['', Validators.required],
      division: ['', Validators.required],
      businessunit: ['', Validators.required],
      projectName: ['', [Validators.required, Validators.maxLength(1000)]],
      externalInternal: ['External', Validators.required],
      expectedTenderIssueDate: ['', Validators.required],
      expectedTenderSubmissionDate: ['', Validators.required],
      expectedDate: ['', Validators.required],
      projectDuration: ['', Validators.required],
      projectDescriptionAndLocation: ['', Validators.required],
      estimatedValue: ['', [Validators.required, Validators.min(0)]],
      currency: ['', Validators.required],
    });
  }

  handleSubmit(): void {
    if (this.tenderForm.valid) {
      this.dialogRef.close(this.tenderForm.value);
    }
  }
}
