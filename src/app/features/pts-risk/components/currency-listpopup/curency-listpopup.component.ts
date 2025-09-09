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
import { MatRadioModule } from '@angular/material/radio';

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
    MatRadioModule,
  ],
  template: `
    <h3 mat-dialog-title>Currency</h3>
    <form [formGroup]="tenderForm" (ngSubmit)="handleSubmit()">
      <div mat-dialog-content>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Code</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              formControlName="Code"
              placeholder="Enter Code"
              [maxlength]="Codelength"
            />
            <mat-hint>
              {{ tenderForm.get('Code')?.value?.length || 0 }} / {{ Codelength }}
            </mat-hint>
          </mat-form-field>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Exchange Rate To HKD</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              type="number"
              formControlName="ExchangeRateToHKD"
              placeholder="Enter Exchange Rate"
              [maxlength]="ExchangeRateToHKDlength"
            />
            <mat-hint>
              {{ tenderForm.get('ExchangeRateToHKD')?.value?.length || 0 }} /
              {{ ExchangeRateToHKDlength }}
            </mat-hint>
          </mat-form-field>
        </div>

        <div style="width: 100%; margin-bottom: 16px;">
          <mat-label>Status</mat-label>
          <mat-radio-group style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;">
            <mat-radio-button value="China">Active</mat-radio-button>
            <mat-radio-button value="Hongkong">Inactive</mat-radio-button>
          </mat-radio-group>
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
export class CurrencyListPopupComponent {
  tenderForm: FormGroup;
  Codelength = 3;
  ExchangeRateToHKDlength = 10;
  busy = false;

  constructor(public dialogRef: MatDialogRef<CurrencyListPopupComponent>, private fb: FormBuilder) {
    this.tenderForm = this.fb.group({
      Code: new FormControl('', [Validators.required, Validators.maxLength(this.Codelength)]),
      ExchangeRateToHKD: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
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
