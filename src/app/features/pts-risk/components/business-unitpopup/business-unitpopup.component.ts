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
    <h3 mat-dialog-title>Business Unit</h3>
    <form [formGroup]="tenderForm" (ngSubmit)="handleSubmit()">
      <div mat-dialog-content>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Name</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              formControlName="name"
              placeholder="Enter name"
              [maxlength]="nameLength"
            />
            <mat-hint>
              {{ tenderForm.get('name')?.value?.length || 0 }} / {{ nameLength }}
            </mat-hint>
            @if (nameControl.invalid && (nameControl.dirty || nameControl.touched)) {
              <mat-error>
                <i class="fas fa-exclamation mx-1"></i>
                @if (nameControl.errors && nameControl.errors['required']) {
                  <span>This field is required.</span>
                }
              </mat-error>
            }
          </mat-form-field>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Short Name</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              formControlName="shortName"
              placeholder="Enter short name"
              [maxlength]="shortNameLength"
            />
            <mat-hint>
              {{ tenderForm.get('shortName')?.value?.length || 0 }} / {{ shortNameLength }}
            </mat-hint>
            @if (shortNameControl.invalid && (shortNameControl.dirty || shortNameControl.touched)) {
              <mat-error>
                <i class="fas fa-exclamation mx-1"></i>
                @if (shortNameControl.errors && shortNameControl.errors['required']) {
                  <span>This field is required.</span>
                }
              </mat-error>
            }
          </mat-form-field>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Tail Threshold(Million HKD)</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              formControlName="tailThreshold"
              placeholder="Enter tail threshold"
              [maxlength]="tailThresholdLength"
            />
            <mat-hint>
              {{ tenderForm.get('tailThreshold')?.value?.length || 0 }} / {{ tailThresholdLength }}
            </mat-hint>
            @if (tailThresholdControl.invalid && (tailThresholdControl.dirty || tailThresholdControl.touched)) {
              <mat-error>
                <i class="fas fa-exclamation mx-1"></i>
                @if (tailThresholdControl.errors && tailThresholdControl.errors['required']) {
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
          Save
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
export class BusinessUnitPopupComponent {
  tenderForm: FormGroup;
  nameLength = 50;
  shortNameLength = 10;
  tailThresholdLength = 10;
  busy = false;

  constructor(public dialogRef: MatDialogRef<BusinessUnitPopupComponent>, private fb: FormBuilder) {
    this.tenderForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(this.nameLength)]),
      shortName: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.shortNameLength),
      ]),
      status: new FormControl('', [Validators.required]),
      tailThreshold: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.tailThresholdLength),
      ]),
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

  get nameControl(): FormControl {
    return this.tenderForm.get('name') as FormControl;
  }

  get shortNameControl(): FormControl {
    return this.tenderForm.get('shortName') as FormControl;
  }

  get statusControl(): FormControl {
    return this.tenderForm.get('status') as FormControl;
  }

  get tailThresholdControl(): FormControl {
    return this.tenderForm.get('tailThreshold') as FormControl;
  }
}
