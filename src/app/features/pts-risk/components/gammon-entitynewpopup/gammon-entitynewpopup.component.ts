import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GammonEntity } from '../../../../core/services/gammon-entity-api.service';
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
    <h3 mat-dialog-title>{{ data.mode === 'edit' ? 'Edit' : 'Add' }} Entity</h3>
    <form [formGroup]="entityForm" (ngSubmit)="handleSubmit()">
      <div mat-dialog-content>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Name</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <mat-label>Name</mat-label>
            <input
              matInput
              formControlName="name"
              placeholder="Enter name"
            />
            @if (nameControl.invalid && (nameControl.dirty || nameControl.touched)) {
              <mat-error>
                Name is required
              </mat-error>
            }
          </mat-form-field>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Short Name</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <mat-label>Short Name</mat-label>
            <input
              matInput
              formControlName="shortName"
              placeholder="Enter short name"
            />
            @if (shortNameControl.invalid && (shortNameControl.dirty || shortNameControl.touched)) {
              <mat-error>
                Short name is required
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
        <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="entityForm.invalid || isBusy">
          {{ data.mode === 'edit' ? 'Save Changes' : 'Create' }}
        </button>
        @if (isBusy) {
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
export class GammonEntitynewpopupComponent {
  entityForm: FormGroup;
  isBusy = false;

  constructor(
    public dialogRef: MatDialogRef<GammonEntitynewpopupComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'edit' | 'add'; entity?: GammonEntity }
  ) {
    this.entityForm = this.fb.group({
      name: [data.entity?.name || '', Validators.required],
      shortName: [data.entity?.shortName || '', Validators.required],
      status: [data.entity?.status || 'ACTIVE', Validators.required]
    });
  }

  handleSubmit(): void {
    if (this.entityForm.valid) {
      this.isBusy = true;
      const formData = this.data.mode === 'edit'
        ? { ...this.data.entity, ...this.entityForm.value }
        : { ...this.entityForm.value };
      this.dialogRef.close(formData);
      this.isBusy = false;
    }
  }

  get nameControl(): FormControl {
    return this.entityForm.get('name') as FormControl;
  }

  get shortNameControl(): FormControl {
    return this.entityForm.get('shortName') as FormControl;
  }

  get statusControl(): FormControl {
    return this.entityForm.get('status') as FormControl;
  }
}
