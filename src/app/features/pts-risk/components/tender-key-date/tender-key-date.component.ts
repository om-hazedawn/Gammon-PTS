import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TenderKeyDateApiService, KeyDateType } from '../../../../core/services/tender.keydate-api.service';
import { Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

// Custom date formats to ensure consistency
const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-tender-key-date',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  template: `
    <div class="container">
      <h2 mat-dialog-title>Add Key Date</h2>

      <form [formGroup]="keyDateForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Type</mat-label>
          <mat-select formControlName="type" required>
            @for (type of keyDateTypes; track type) {
              <mat-option [value]="type">{{type}}</mat-option>
            }
          </mat-select>
          @if (keyDateForm.get('type')?.hasError('required') && keyDateForm.get('type')?.touched) {
            <mat-error>Type is required</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Key Date</mat-label>
          <input matInput 
                 [matDatepicker]="picker" 
                 formControlName="keyDate" 
                 required
                 (dateChange)="onDateChange($event)">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          @if (keyDateForm.get('keyDate')?.hasError('required') && keyDateForm.get('keyDate')?.touched) {
            <mat-error>Date is required</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Remark</mat-label>
          <textarea matInput formControlName="remark" rows="3"></textarea>
        </mat-form-field>

        <div class="button-container">
          <button mat-button type="button" (click)="onCancel()">Cancel</button>
          <button 
            mat-raised-button 
            color="primary" 
            type="submit" 
            [disabled]="keyDateForm.invalid || isSubmitting">
            {{ isSubmitting ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      min-width: 400px;
    }
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    .button-container {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
    }
    h2 {
      margin: 0 0 20px 0;
    }
  `]
})
export class TenderKeyDateComponent {
  keyDateForm: FormGroup;
  isSubmitting = false;
  keyDateTypes: KeyDateType[] = [
    'COMMERCIAL',
    'FINANCIAL',
    'LEGAL',
    'EXCO',
    'CTC',
    'GTC',
    'SHAREHOLDER'
  ];

  constructor(
    private fb: FormBuilder,
    private keyDateService: TenderKeyDateApiService,
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>,
    public dialogRef: MatDialogRef<TenderKeyDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tenderId: number }
  ) {
    // Set date adapter locale to ensure consistent date handling
    this.dateAdapter.setLocale('en-GB');

    const today = new Date();
    today.setHours(18, 30, 0, 0);

    this.keyDateForm = this.fb.group({
      type: ['', Validators.required],
      keyDate: [today, Validators.required],
      remark: ['']
    });

    // Log initial date value
    console.log('Initial date value:', today.toISOString());
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const selectedDate = new Date(event.value);
      selectedDate.setHours(18, 30, 0, 0);
      
      console.log('Date changed:', {
        original: event.value,
        modified: selectedDate,
        iso: selectedDate.toISOString()
      });

      this.keyDateForm.patchValue({
        keyDate: selectedDate
      });
    }
  }

  private formatDate(date: Date | null): string {
    if (!date) {
      throw new Error('Date is required');
    }

    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      throw new Error('Invalid date');
    }

    // Set to 6:30 PM in local time
    selectedDate.setHours(18, 30, 0, 0);

    console.log('Formatting date:', {
      input: date,
      modified: selectedDate,
      iso: selectedDate.toISOString()
    });

    return selectedDate.toISOString();
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      panelClass: ['error-snackbar']
    });
  }

  onSubmit(): void {
    if (this.keyDateForm.valid && !this.isSubmitting) {
      const formValue = this.keyDateForm.value;
      console.log('Form values:', formValue);

      try {
        const formattedDate = this.formatDate(formValue.keyDate);
        
        const payload = {
          id: 0, // Send empty id for new records
          type: formValue.type as KeyDateType,
          keyDate: formattedDate,
          remark: formValue.remark || ''
        };

        console.log('Submitting payload:', payload);
        this.isSubmitting = true;

        this.keyDateService.createKeyDate(this.data.tenderId, payload).subscribe({
          next: (response) => {
            console.log('Key date created:', response);
            this.snackBar.open('Key date created successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'end'
            });
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('API Error:', error);
            this.isSubmitting = false;
            
            let errorMessage = 'Failed to create key date';
            if (error.error?.message) {
              errorMessage = error.error.message;
            }
            this.showError(errorMessage);
          }
        });
      } catch (error) {
        console.error('Date formatting error:', error);
        this.isSubmitting = false;
        this.showError('Please select a valid date');
      }
    } else {
      console.warn('Form validation errors:', {
        form: this.keyDateForm.errors,
        type: this.keyDateForm.get('type')?.errors,
        keyDate: this.keyDateForm.get('keyDate')?.errors,
        remark: this.keyDateForm.get('remark')?.errors,
        value: this.keyDateForm.get('keyDate')?.value
      });
      
      this.showError('Please fill in all required fields correctly');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
