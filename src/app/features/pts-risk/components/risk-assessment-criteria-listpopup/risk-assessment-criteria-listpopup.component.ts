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

            @if (codeControl.invalid && (codeControl.dirty || codeControl.touched)) {
              <mat-error>
                <i class="fas fa-exclamation mx-1"></i>
                @if (codeControl.errors && codeControl.errors['required']) {
                  <span>This field is required.</span>
                }
                @if (codeControl.hasError('error422')) {
                  <span>{{ codeControl.getError('error422') }}</span>
                }
              </mat-error>
            }
            
          </mat-form-field>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Title</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              formControlName="Title"
              placeholder="Enter Title"
              [maxlength]="TitleLength"
            />
            <mat-hint>
              {{ tenderForm.get('Title')?.value?.length || 0 }} /
              {{ TitleLength }}
            </mat-hint>

            @if (titleControl.invalid && (titleControl.dirty || titleControl.touched)) {
              <mat-error>
                <i class="fas fa-exclamation mx-1"></i>
                @if (titleControl.errors && titleControl.errors['required']) {
                  <span>This field is required.</span>
                }
                @if (titleControl.hasError('error422')) {
                  <span>{{ titleControl.getError('error422') }}</span>
                }
              </mat-error>
            }

          </mat-form-field>
        </div>

        <div style="width: 100%; margin-bottom: 16px;">
          <mat-label>Status</mat-label>
          <mat-radio-group formControlName="Status" style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;">
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
export class RiskAssessmentCriteriaListPopupComponent {
  tenderForm: FormGroup;
  Codelength = 2;
  TitleLength = 50;
  busy = false;

  constructor(public dialogRef: MatDialogRef<RiskAssessmentCriteriaListPopupComponent>, private fb: FormBuilder) {
    this.tenderForm = this.fb.group({
      Code: new FormControl('', [Validators.required, Validators.maxLength(this.Codelength)]),
      Title: new FormControl('', [Validators.required, Validators.maxLength(this.TitleLength)]),
      Status: new FormControl('', [Validators.required]),
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

  get codeControl(): FormControl {
    return this.tenderForm.get('Code') as FormControl;
  }

  get titleControl(): FormControl {
    return this.tenderForm.get('Title') as FormControl;
  }

  get statusControl(): FormControl {
    return this.tenderForm.get('Status') as FormControl;
  }
}
