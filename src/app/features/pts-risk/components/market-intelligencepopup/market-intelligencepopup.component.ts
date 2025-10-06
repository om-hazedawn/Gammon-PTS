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
import { TenderListApiService } from '../../../../core/services/tender-list-api.service';
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
  ],
  template: `
    <h3 mat-dialog-title>Tender - Lost tender market intelligence</h3>
    <form [formGroup]="tenderForm" (ngSubmit)="handleSubmit()">
      <div mat-dialog-content>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Winning competitor</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <textarea
              matInput
              formControlName="winningCompetitor"
              placeholder="Enter competitor name"
              maxlength="{{ winningCompetitorMaxLength }}"
            ></textarea>
            <mat-hint>{{ tenderForm.get('winningCompetitor')?.value?.length || 0 }} / {{ winningCompetitorMaxLength }}</mat-hint>
            @if (tenderForm.get('winningCompetitor')?.invalid && (tenderForm.get('winningCompetitor')?.dirty || tenderForm.get('winningCompetitor')?.touched))
              {
                <mat-error>
                  <i class="fas fa-exclamation mx-1"></i>
                  @if (tenderForm.get('winningCompetitor')?.errors?.['required']) {
                    <span>This field is required.</span>
                  }
                  @if (tenderForm.get('winningCompetitor')?.errors?.['maxlength']) {
                    <span>Maximum length of {{ winningCompetitorMaxLength }} characters exceeded.</span>
                  }
                </mat-error>
              }
          </mat-form-field>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Margin Lost(%)</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <input
              matInput
              type="number"
              formControlName="marginLost"
              placeholder="Enter margin lost (%)"
              min="0"
              max="100"
              inputmode="decimal"
              (keydown)="onNumberKeyDown($event)"
            />
            @if (tenderForm.get('marginLost')?.invalid && (tenderForm.get('marginLost')?.dirty || tenderForm.get('marginLost')?.touched))
              {
                <mat-error>
                  <i class="fas fa-exclamation mx-1"></i>
                  @if (tenderForm.get('marginLost')?.errors?.['min']) {
                    <span>Value must be at least 0.</span>
                  }
                  @if (tenderForm.get('marginLost')?.errors?.['max']) {
                    <span>Value cannot exceed 100.</span>
                  }
                  @if (tenderForm.get('marginLost')?.errors?.['pattern']) {
                    <span>Only numeric values are allowed.</span>
                  }
                </mat-error>
              }

          </mat-form-field>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <label style="width: 200px; font-weight: 500;">Other reason for loss, if any</label>
          <mat-form-field appearance="fill" style="flex: 1;">
            <textarea
              matInput
              formControlName="otherReasonForLoss"
              placeholder="Enter comment"
              maxlength="1000"
            ></textarea>
            <mat-hint>{{ tenderForm.get('otherReasonForLoss')?.value?.length || 0 }} / 1000</mat-hint>
              @if (tenderForm.get('otherReasonForLoss')?.invalid && (tenderForm.get('otherReasonForLoss')?.dirty || tenderForm.get('otherReasonForLoss')?.touched))
                {
                  <mat-error>
                    <i class="fas fa-exclamation mx-1"></i>
                    @if (tenderForm.get('otherReasonForLoss')?.errors?.['maxlength']) {
                      <span>Maximum length of 1000 characters exceeded.</span>
                    }
                  </mat-error>
                }
          </mat-form-field>
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
export class MarketIntelligencepopup {
  tenderForm: FormGroup;

  winningCompetitorMaxLength = 300;
  excomDecisionNotesMaxLength = 1000;
  busy = false;

  constructor(
    public dialogRef: MatDialogRef<MarketIntelligencepopup>,
    private fb: FormBuilder,
    private tenderListApiService: TenderListApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Component data:', data); // Debug log
    this.tenderForm = this.fb.group({
      winningCompetitor: new FormControl(data?.winningCompetitor || '', [
        Validators.required,
        Validators.maxLength(this.winningCompetitorMaxLength)
      ]),
      marginLost: new FormControl(data?.marginLost || null, [
        Validators.min(0),
        Validators.max(100),
        Validators.pattern(/^[0-9]*\.?[0-9]*$/) // Allow empty or decimal numbers
      ]),
      otherReasonForLoss: new FormControl(data?.otherReasonForLoss || null, [
        Validators.maxLength(1000)
      ]),
    });
  }

  isBusy(): boolean {
    return this.busy;
  }

  handleSubmit(): void {
    if (!this.data || !this.data.tenderId) {
      console.error('tenderId is missing:', this.data);
      return;
    }

    if (this.tenderForm.valid) {
      this.busy = true;
      
      const currentDate = new Date().toISOString();
      const requestData = {
        tenderId: this.data.tenderId,
        winningCompetitor: this.tenderForm.value.winningCompetitor || '',
        marginLostPercentage: this.tenderForm.value.marginLost || 0,
        otherReasonsForLoss: this.tenderForm.value.otherReasonForLoss || '',
        reportDate: currentDate
      };

      console.log('Sending data:', requestData);
      
      this.tenderListApiService.putTenderMarketIntelligence(
        requestData.tenderId,
        requestData.winningCompetitor,
        requestData.marginLostPercentage,
        requestData.otherReasonsForLoss,
        requestData.reportDate
      ).subscribe({
        next: () => {
          this.busy = false;
          const responseData = {
            winningCompetitor: requestData.winningCompetitor || 'N/A',
            marginLost: requestData.marginLostPercentage !== null ? requestData.marginLostPercentage : 0,
            otherReasonForLoss: requestData.otherReasonsForLoss || 'N/A'
          };
          console.log('Closing dialog with data:', responseData);
          this.dialogRef.close(responseData);
        },
        error: (error) => {
          console.error('Error saving market intelligence:', error);
          this.busy = false;
        }
      });
    }
  }

  get winningCompetitorControl(): FormControl {
    return this.tenderForm.get('winningCompetitor') as FormControl;
  }

  get marginLostPercentageControl(): FormControl {
    return this.tenderForm.get('marginLost') as FormControl;
  }

  get otherReasonsForLossControl(): FormControl {
    return this.tenderForm.get('otherReasonForLoss') as FormControl;
  }

  // Prevent non-numeric keys like e, E, +, - in number inputs; allow control/navigation keys
  onNumberKeyDown(event: KeyboardEvent): void {
    const allowed = [
      'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'
    ];
    if (allowed.includes(event.key)) return;

    // Block scientific notation and signs
    if (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-') {
      event.preventDefault();
      return;
    }

    // Allow digits and a single dot
    if (!/^[0-9.]$/.test(event.key)) {
      event.preventDefault();
      return;
    }

    // Prevent more than one dot
    const target = event.target as HTMLInputElement;
    if (event.key === '.' && target?.value?.includes('.')) {
      event.preventDefault();
    }
  }
}
