import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { MarketSector } from '../../../../core/services/market-sector-list.api.service';

@Component({
  selector: 'app-market-sector-list-popup',
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
    <h3 mat-dialog-title>{{ data.mode === 'edit' ? 'Edit' : 'Add' }} Market Sector</h3>
    <form [formGroup]="marketSectorForm" (ngSubmit)="handleSubmit()">
      <div mat-dialog-content>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Name</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter name" />

            <mat-hint> {{ marketSectorForm.get('name')?.value?.length || 0 }} / 100 </mat-hint>
            @if (nameControl.invalid && (nameControl.dirty || nameControl.touched)) {
            <mat-error>
              <i class="fas fa-exclamation mx-1"></i>
              @if (nameControl.errors?.['required']) {
              <span>Name is required</span>
              } @else if (nameControl.errors?.['maxlength']) {
              <span>Name cannot exceed 100 characters</span>
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

        <div mat-dialog-actions align="end" style="gap: 8px; margin-top: 16px;">
          <button mat-button type="button" [disabled]="isBusy" (click)="dialogRef.close()">Cancel</button>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button mat-raised-button color="primary" type="submit" [disabled]="marketSectorForm.invalid || isBusy">
              {{ data.mode === 'edit' ? 'Save Changes' : 'Create' }}
            </button>
            @if (isBusy) {
            <mat-spinner diameter="20" style="margin-left: 8px;"></mat-spinner>
            }
          </div>
       </div>
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
export class MarketSectorListPopupComponent {
  marketSectorForm: FormGroup;
  isBusy = false;

  constructor(
    public dialogRef: MatDialogRef<MarketSectorListPopupComponent>,
    private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: {mode: 'edit' | 'add'; marketsector?: MarketSector}
  ) {
    this.marketSectorForm = this.fb.group({
      name: new FormControl(this.data.marketsector?.name || '', [Validators.required, Validators.maxLength(100)]),
      status: new FormControl(this.data.marketsector?.status || 'ACTIVE', [Validators.required]),
    });
  }

  handleSubmit(): void {
    if (this.marketSectorForm.valid && !this.isBusy) {
      this.isBusy = true;
      try {
        const formData = this.data.mode === 'edit'
          ? { ...this.data.marketsector, ...this.marketSectorForm.value }
          : { ...this.marketSectorForm.value };
        this.dialogRef.close(formData);
      } finally {
        this.isBusy = false;
      }
    }
  }

    get nameControl(): FormControl {
    return this.marketSectorForm.get('name') as FormControl;
    }

    get statusControl(): FormControl {
    return this.marketSectorForm.get('status') as FormControl;
    }
}