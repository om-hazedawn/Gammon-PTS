import { Component,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Currency } from '../../../../core/services/currency-list-api.service';
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
    <h3 mat-dialog-title>{{ data.mode === 'edit' ? 'Edit' : 'Add' }} Currency</h3>
    <form [formGroup]="tenderForm" (ngSubmit)="handleSubmit()">
      <div mat-dialog-content>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Code</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              formControlName="code"
              placeholder="Enter Code"
              [maxlength]="codelength"
            />
            <mat-hint>
              {{ tenderForm.get('code')?.value?.length || 0 }} / {{ codelength }}
            </mat-hint>
            @if (codeControl.invalid && (codeControl.dirty || codeControl.touched)) {
              <mat-error>
                <i class="fas fa-exclamation mx-1"></i>
                @if (codeControl.errors && codeControl.errors['required']) {
                  <span>This field is required.</span>
                }
              </mat-error>
            }
          </mat-form-field>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Exchange Rate To HKD</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              type="number"
              formControlName="exchangeRateToHKD"
              placeholder="Enter Exchange Rate"
            />
            @if (exchangeRateControl.invalid && (exchangeRateControl.dirty || exchangeRateControl.touched)) {
              <mat-error>
                <i class="fas fa-exclamation mx-1"></i>
                @if (exchangeRateControl.errors && exchangeRateControl.errors['required']) {
                  <span>This field is required.</span>
                }
              </mat-error>
            }
          </mat-form-field>
        </div>

        <div style="width: 100%; margin-bottom: 16px;">
          <mat-label>Status</mat-label>
          <mat-radio-group formControlName="status" style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;">
            <mat-radio-button value="ACTIVE">Active</mat-radio-button>
            <mat-radio-button value="INACTIVE">Inactive</mat-radio-button>
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
          {{ data.mode === 'edit' ? 'Save Changes' : 'Create' }}
        </button>
        @if (isBusy()) {
          <mat-spinner diameter="20"></mat-spinner>
        }
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
  codelength = 3;
  busy = false;

  constructor(public dialogRef: MatDialogRef<CurrencyListPopupComponent>, 
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'add' | 'edit'; currency?: Currency }) {

    const currency = data?.currency || {} as Currency;

    this.tenderForm = this.fb.group({
      code: new FormControl(currency.code || '', [
        Validators.required, 
        Validators.maxLength(this.codelength)
      ]),
      exchangeRateToHKD: new FormControl(currency.exchangeRateToHKD || '', [
        Validators.required
      ]),
      status: new FormControl(currency.status || 'ACTIVE', [
        Validators.required
      ]),
    });
  }

  isBusy(): boolean {
    return this.busy;
  }

  handleSubmit(): void {
    if (this.tenderForm.valid) {
      this.busy = true;
      const currencyData = this.data.mode === 'edit' 
        ? { ...this.data.currency, ...this.tenderForm.value }
        : this.tenderForm.value;
      this.dialogRef.close(currencyData);
      this.busy = false;
    }
  }

  get codeControl(): FormControl {
    return this.tenderForm.get('code') as FormControl;
  }

  get exchangeRateControl(): FormControl {
    return this.tenderForm.get('exchangeRateToHKD') as FormControl;
  }

  get statusControl(): FormControl {
    return this.tenderForm.get('status') as FormControl;
  }
}
