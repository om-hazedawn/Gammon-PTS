import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
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
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: '',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <h3 mat-dialog-title>Tender-Lost tender market intelligence</h3>
    <form [formGroup]="tenderForm" (ngSubmit)="handleSubmit()">
      <div mat-dialog-content>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Winning competitor</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <textarea
              matInput
              formControlName="winningCompetitor"
              placeholder="Enter competitor name"
              maxlength="{{ winningCompetitorMaxLength }}"
            ></textarea>
            <mat-hint>{{ tenderForm.get('winningCompetitor')?.value?.length || 0 }} / {{ winningCompetitorMaxLength }}</mat-hint>
            <mat-error *ngIf="tenderForm.get('winningCompetitor')?.invalid && (tenderForm.get('winningCompetitor')?.dirty || tenderForm.get('winningCompetitor')?.touched)">
              <span *ngIf="tenderForm.get('winningCompetitor')?.errors?.['required']">This field is required.</span>
              <span *ngIf="tenderForm.get('winningCompetitor')?.errors?.['maxlength']">Maximum length exceeded.</span>
            </mat-error>
          </mat-form-field>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Margin Lost(%)</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              type="number"
              formControlName="marginLost"
              placeholder="Enter margin lost (%)"
              min="0"
              max="100"
            />
            <mat-error *ngIf="tenderForm.get('marginLost')?.invalid && (tenderForm.get('marginLost')?.dirty || tenderForm.get('marginLost')?.touched)">
              <span *ngIf="tenderForm.get('marginLost')?.errors?.['required']">This field is required.</span>
              <span *ngIf="tenderForm.get('marginLost')?.errors?.['min']">Value must be at least 0.</span>
              <span *ngIf="tenderForm.get('marginLost')?.errors?.['max']">Value cannot exceed 100.</span>
            </mat-error>
          </mat-form-field>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Other reason for loss, if any</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <textarea
              matInput
              formControlName="otherReasonForLoss"
              placeholder="Enter comment"
              maxlength="1000"
            ></textarea>
            <mat-hint>{{ tenderForm.get('otherReasonForLoss')?.value?.length || 0 }} / 1000</mat-hint>
            <mat-error *ngIf="tenderForm.get('otherReasonForLoss')?.invalid && (tenderForm.get('otherReasonForLoss')?.dirty || tenderForm.get('otherReasonForLoss')?.touched)">
              <span *ngIf="tenderForm.get('otherReasonForLoss')?.errors?.['maxlength']">Maximum length exceeded.</span>
            </mat-error>
          </mat-form-field>
        </div>
      </div>
      <div mat-dialog-actions align="end">
        <button mat-button type="button" (click)="dialogRef.close()">Close</button>
        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="!tenderForm.valid || isBusy()"
        >
          Save
        </button>
        <mat-spinner *ngIf="isBusy()" diameter="20"></mat-spinner>
      </div>
    </form>
  `,
  styles: [
    `
      h2 {
        margin-bottom: 16px;
      }
      mat-form-field {
        margin-bottom: 16px;
      }
    `,
  ],
})
export class MarketIntelligencepopup {
  tenderForm: FormGroup;
  excomDecisionPriorityLevelIdControl: FormControl;
  excomDecisionNotesControl: FormControl;
  winningCompetitorMaxLength = 300;
  excomDecisionNotesMaxLength = 1000;
  busy = false;

  constructor(public dialogRef: MatDialogRef<MarketIntelligencepopup>, private fb: FormBuilder) {
    this.excomDecisionPriorityLevelIdControl = new FormControl('', [Validators.required]);
    this.excomDecisionNotesControl = new FormControl('', [Validators.required, Validators.maxLength(this.excomDecisionNotesMaxLength)]);
    this.tenderForm = this.fb.group({
      excomDecisionPriorityLevelId: this.excomDecisionPriorityLevelIdControl,
      excomDecisionNotes: this.excomDecisionNotesControl,
      winningCompetitor: new FormControl('', [Validators.required, Validators.maxLength(this.winningCompetitorMaxLength)]),
      marginLost: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
      otherReasonForLoss: new FormControl('', [Validators.maxLength(1000)]),
    });
  }

  isBusy(): boolean {
    return this.busy;
  }

  handleSubmit(): void {
    if (this.tenderForm.valid) {
      this.busy = true;
      // Simulate save
      setTimeout(() => {
        this.busy = false;
        this.dialogRef.close(this.tenderForm.value);
      }, 1000);
    }
  }
}
