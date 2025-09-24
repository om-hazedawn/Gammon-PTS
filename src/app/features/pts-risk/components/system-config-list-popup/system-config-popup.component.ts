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
    <h3 mat-dialog-title>System Config</h3>
    <form [formGroup]="tenderForm" (ngSubmit)="handleSubmit()">
      <div mat-dialog-content>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Key</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              formControlName="key"
              placeholder="Enter Key"
              [maxlength]="keyLength"
            />
            <mat-hint>
              {{ tenderForm.get('key')?.value?.length || 0 }} / {{ keyLength }}
            </mat-hint>

            @if (keyControl.invalid && (keyControl.dirty || keyControl.touched)) {
              <mat-error>
                <i class="fas fa-exclamation mx-1"></i>
                @if (keyControl.errors && keyControl.errors['required']) {
                  <span>This field is required.</span>
                }
              </mat-error>
            }
          </mat-form-field>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Description</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              formControlName="description"
              placeholder="Enter Description"
              [maxlength]="descriptionLength"
            />
            <mat-hint>
              {{ tenderForm.get('description')?.value?.length || 0 }} /
              {{ descriptionLength }}
            </mat-hint>

            @if (descriptionControl.invalid && (descriptionControl.dirty || descriptionControl.touched)) {
              <mat-error>
                <i class="fas fa-exclamation mx-1"></i>
                @if (descriptionControl.errors && descriptionControl.errors['required']) {
                  <span>This field is required.</span>
                }
              </mat-error>
            }

          </mat-form-field>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Value</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              formControlName="value"
              placeholder="Enter Value"
              [maxlength]="valueLength"
            />
            <mat-hint>
              {{ tenderForm.get('value')?.value?.length || 0 }} /
              {{ valueLength }}
            </mat-hint>

            @if (valueControl.invalid && (valueControl.dirty || valueControl.touched)) {
            <mat-error>
              <i class="fas fa-exclamation mx-1"></i>
              @if (valueControl.errors && valueControl.errors['required']) {
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
export class SystemConfigPopupComponent {
  tenderForm: FormGroup;
  keyLength = 30;
  descriptionLength = 50;
  valueLength = 20;
  busy = false;

  constructor(public dialogRef: MatDialogRef<SystemConfigPopupComponent>, private fb: FormBuilder) {
    this.tenderForm = this.fb.group({
      key: new FormControl('', [Validators.required, Validators.maxLength(this.keyLength)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(this.descriptionLength)]),
      value: new FormControl('', [Validators.required, Validators.maxLength(this.valueLength)]),
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

  get keyControl(): FormControl {
    return this.tenderForm.get('key') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.tenderForm.get('description') as FormControl;
  }

  get valueControl(): FormControl {
    return this.tenderForm.get('value') as FormControl;
  }

}
