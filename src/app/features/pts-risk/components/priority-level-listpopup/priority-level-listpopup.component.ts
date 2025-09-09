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
    <h3 mat-dialog-title>Priority Level/h3>
    <form [formGroup]="tenderForm" (ngSubmit)="handleSubmit()">
      <div mat-dialog-content>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Title</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              formControlName="Title"
              placeholder="Enter title"
              [maxlength]="TitleLength"
            />
            <mat-hint>
              {{ tenderForm.get('Title')?.value?.length || 0 }} / {{ TitleLength }}
            </mat-hint>
          </mat-form-field>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Ranking</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              formControlName="Ranking"
              placeholder="Enter ranking"
              type="number"
              [maxlength]="RankingLength"
            />
            <mat-hint>
              {{ tenderForm.get('Ranking')?.value?.length || 0 }} / {{ RankingLength }}
            </mat-hint>
          </mat-form-field>
        </div>

        <div style="width: 100%; margin-bottom: 16px;">
            <mat-label>Status</mat-label>
            <mat-radio-group
              style="display: flex; flex-direction: row; gap: 16px; margin-top: 8px;"
            >
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
export class PriorityLevelListPopupComponent {
  tenderForm: FormGroup;
  TitleLength = 50;
  RankingLength = 10;
  busy = false;

  constructor(
    public dialogRef: MatDialogRef<PriorityLevelListPopupComponent>,
    private fb: FormBuilder
  ) {
    this.tenderForm = this.fb.group({
      Title: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.TitleLength),
      ]),
      Ranking: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.RankingLength),
      ]),
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
