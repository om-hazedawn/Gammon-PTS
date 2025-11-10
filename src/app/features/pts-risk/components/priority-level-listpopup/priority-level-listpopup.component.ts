import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PriorityLevel } from '../../../../model/entity/pts-risk/priority-level-list';
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
    <h3 mat-dialog-title>{{ data.mode === 'edit' ? 'Edit' : 'Add' }} Priority Level</h3>
    <form [formGroup]="tenderForm" (ngSubmit)="handleSubmit()">
      <div mat-dialog-content>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Title</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <mat-label>Title</mat-label>
            <input
              matInput
              formControlName="title"
              placeholder="Enter title"
              [maxlength]="titleLength"
            />
            <mat-hint>
              {{ tenderForm.get('title')?.value?.length || 0 }} / {{ titleLength }}
            </mat-hint>
            @if (titleControl.invalid && (titleControl.dirty || titleControl.touched)) {
            <mat-error>
              <i class="fas fa-exclamation mx-1"></i>
              @if (titleControl.errors && titleControl.errors['required']) {
              <span>This field is required.</span>
              }
            </mat-error>
            }
          </mat-form-field>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Ranking</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <mat-label>Ranking</mat-label>
            <input matInput formControlName="ranking" placeholder="Enter ranking" type="number" />
            @if (rankingControl.invalid && (rankingControl.dirty || rankingControl.touched)) {
            <mat-error>
              <i class="fas fa-exclamation mx-1"></i>
              @if (rankingControl.errors && rankingControl.errors['required']) {
              <span>This field is required.</span>
              }
            </mat-error>
            }
          </mat-form-field>
        </div>

        <div style="width: 100%; margin-bottom: 16px;">
          <mat-label>Status</mat-label>
          <mat-radio-group
            formControlName="status"
            style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
          >
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
export class PriorityLevelListPopupComponent {
  tenderForm: FormGroup;
  titleLength = 50;
  busy = false;

  constructor(
    public dialogRef: MatDialogRef<PriorityLevelListPopupComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'add' | 'edit'; priorityLevel?: PriorityLevel }
  ) {
    const priorityLevel = data?.priorityLevel || ({} as PriorityLevel);

    this.tenderForm = this.fb.group({
      title: new FormControl(priorityLevel.title || '', [
        Validators.required,
        Validators.maxLength(this.titleLength),
      ]),
      ranking: new FormControl(priorityLevel.ranking || '', [Validators.required]),
      status: new FormControl(priorityLevel.status || 'ACTIVE', [Validators.required]),
    });
  }

  isBusy(): boolean {
    return this.busy;
  }

  handleSubmit(): void {
    if (this.tenderForm.valid) {
      this.busy = true;
      const priorityLevelData =
        this.data.mode === 'edit'
          ? { ...this.data.priorityLevel, ...this.tenderForm.value }
          : this.tenderForm.value;
      this.dialogRef.close(priorityLevelData);
      this.busy = false;
    }
  }

  get rankingControl(): FormControl {
    return this.tenderForm.get('ranking') as FormControl;
  }

  get titleControl(): FormControl {
    return this.tenderForm.get('title') as FormControl;
  }

  get statusControl(): FormControl {
    return this.tenderForm.get('status') as FormControl;
  }
}
