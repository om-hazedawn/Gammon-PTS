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
              formControlName="Key"
              placeholder="Enter Key"
              [maxlength]="Keylength"
            />
            <mat-hint>
              {{ tenderForm.get('Key')?.value?.length || 0 }} / {{ Keylength }}
            </mat-hint>
          </mat-form-field>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Description</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              formControlName="Description"
              placeholder="Enter Description"
              [maxlength]="descriptionLength"
            />
            <mat-hint>
              {{ tenderForm.get('Description')?.value?.length || 0 }} /
              {{ descriptionLength }}
            </mat-hint>
          </mat-form-field>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Value</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              formControlName="Value"
              placeholder="Enter Value"
              [maxlength]="ValueLength"
            />
            <mat-hint>
              {{ tenderForm.get('Value')?.value?.length || 0 }} /
              {{ ValueLength }}
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
export class SystemConfigPopupComponent {
  tenderForm: FormGroup;
  Keylength = 30;
  descriptionLength = 50;
  ValueLength = 20;
  busy = false;

  constructor(public dialogRef: MatDialogRef<SystemConfigPopupComponent>, private fb: FormBuilder) {
    this.tenderForm = this.fb.group({
      Key: new FormControl('', [Validators.required, Validators.maxLength(this.Keylength)]),
      Description: new FormControl('', [Validators.required, Validators.maxLength(this.descriptionLength)]),
      Value: new FormControl('', [Validators.required, Validators.maxLength(this.ValueLength)]),
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
