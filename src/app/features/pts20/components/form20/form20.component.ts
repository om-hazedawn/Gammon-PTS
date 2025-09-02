import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PtsApiService, Form20, ApiResponse } from '../../../../core/services/pts-api.service';

@Component({
  selector: 'app-form20',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            {{ isEdit ? 'Edit Form 20' : 'New Form 20' }}
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="form20Form" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Tender No</mat-label>
                <input matInput formControlName="tenderNo" placeholder="Enter tender number" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Project Name</mat-label>
                <input
                  matInput
                  formControlName="projectName"
                  placeholder="Enter project name"
                  required
                />
                <mat-error *ngIf="form20Form.get('projectName')?.hasError('required')">
                  Project name is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Client Name</mat-label>
                <input
                  matInput
                  formControlName="clientName"
                  placeholder="Enter client name"
                  required
                />
                <mat-error *ngIf="form20Form.get('clientName')?.hasError('required')">
                  Client name is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="quarter-width">
                <mat-label>Contract Value</mat-label>
                <input
                  matInput
                  type="number"
                  formControlName="contractValue"
                  placeholder="0.00"
                  required
                />
                <mat-error *ngIf="form20Form.get('contractValue')?.hasError('required')">
                  Contract value is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="quarter-width">
                <mat-label>Currency</mat-label>
                <mat-select formControlName="currency" required>
                  <mat-option *ngFor="let currency of currencies" [value]="currency.code">
                    {{ currency.name }}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Tender Closing Date</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="tenderClosingDate" />
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Contract Type</mat-label>
                <mat-select formControlName="contractType">
                  <mat-option *ngFor="let type of contractTypes" [value]="type.code">
                    {{ type.name }}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Project Description</mat-label>
                <textarea
                  matInput
                  formControlName="projectDescription"
                  rows="4"
                  placeholder="Enter project description"
                ></textarea>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Contract Duration (months)</mat-label>
                <input matInput type="number" formControlName="contractDuration" placeholder="24" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Status</mat-label>
                <mat-select formControlName="status">
                  <mat-option value="Draft">Draft</mat-option>
                  <mat-option value="Submitted">Submitted</mat-option>
                  <mat-option value="Approved">Approved</mat-option>
                  <mat-option value="Rejected">Rejected</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </form>
        </mat-card-content>

        <mat-card-actions align="end">
          <button mat-button type="button" (click)="onCancel()">Cancel</button>
          <button
            mat-raised-button
            color="primary"
            [disabled]="form20Form.invalid || loading"
            (click)="onSubmit()"
          >
            <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
            {{ isEdit ? 'Update' : 'Save' }}
          </button>
          <button
            mat-raised-button
            color="accent"
            *ngIf="isEdit && form20Form.value.status === 'Draft'"
            [disabled]="form20Form.invalid || loading"
            (click)="onSubmit(true)"
          >
            Submit for Approval
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .form-container {
        max-width: 1200px;
        margin: 20px auto;
        padding: 20px;
      }

      .form-row {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
      }

      .full-width {
        width: 100%;
      }

      .half-width {
        width: calc(50% - 8px);
      }

      .quarter-width {
        width: calc(25% - 12px);
      }

      mat-card {
        margin-bottom: 20px;
      }

      mat-card-content {
        padding: 24px;
      }

      .mat-mdc-form-field {
        width: 100%;
      }

      mat-spinner {
        margin-right: 8px;
      }
    `,
  ],
})
export class Form20Component implements OnInit {
  private fb = inject(FormBuilder);
  private ptsApi = inject(PtsApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  form20Form!: FormGroup;
  loading = false;
  isEdit = false;
  formId?: number;

  // Lookup data
  currencies: any[] = [];
  contractTypes: any[] = [];

  ngOnInit() {
    this.initializeForm();
    this.loadLookupData();

    // Check if editing existing form
    this.formId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.formId) {
      this.isEdit = true;
      this.loadForm(this.formId);
    }
  }

  private initializeForm() {
    this.form20Form = this.fb.group({
      tenderNo: [''],
      projectName: ['', Validators.required],
      clientName: ['', Validators.required],
      contractValue: [0, [Validators.required, Validators.min(0)]],
      currency: ['HKD', Validators.required],
      tenderClosingDate: [''],
      projectDescription: [''],
      contractType: [''],
      contractDuration: [24],
      status: ['Draft'],
    });
  }

  private loadLookupData() {
    // Load currencies
    this.ptsApi.getCurrencies().subscribe({
      next: (response) => {
        if (response.success) {
          this.currencies = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading currencies:', error);
        // Fallback data
        this.currencies = [
          { code: 'HKD', name: 'Hong Kong Dollar' },
          { code: 'USD', name: 'US Dollar' },
          { code: 'CNY', name: 'Chinese Yuan' },
        ];
      },
    });

    // Load contract types
    this.ptsApi.getContractTypes().subscribe({
      next: (response) => {
        if (response.success) {
          this.contractTypes = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading contract types:', error);
        // Fallback data
        this.contractTypes = [
          { code: 'LUMP_SUM', name: 'Lump Sum' },
          { code: 'UNIT_RATE', name: 'Unit Rate' },
          { code: 'COST_PLUS', name: 'Cost Plus' },
          { code: 'TARGET_COST', name: 'Target Cost' },
        ];
      },
    });
  }

  private loadForm(id: number) {
    this.loading = true;
    this.ptsApi.getForm(id).subscribe({
      next: (response) => {
        if (response.success) {
          const form = response.data;
          this.form20Form.patchValue({
            ...form,
            tenderClosingDate: form.tenderClosingDate ? new Date(form.tenderClosingDate) : null,
          });
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading form:', error);
        this.snackBar.open('Error loading form data', 'Close', { duration: 3000 });
        this.loading = false;
      },
    });
  }

  onSubmit(submit: boolean = false) {
    if (this.form20Form.invalid) {
      return;
    }

    this.loading = true;
    const formData: Form20 = {
      ...this.form20Form.value,
      id: this.formId,
    };

    if (submit) {
      formData.status = 'Submitted';
    }

    this.ptsApi.saveForm(formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open(
            submit ? 'Form submitted successfully' : 'Form saved successfully',
            'Close',
            { duration: 3000 }
          );

          if (!this.isEdit) {
            // Navigate to edit mode with the new ID
            this.router.navigate(['/pts20/form', response.data]);
          } else if (submit) {
            // Navigate back to list after submission
            this.router.navigate(['/pts20']);
          }
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error saving form:', error);
        this.snackBar.open('Error saving form', 'Close', { duration: 3000 });
        this.loading = false;
      },
    });
  }

  onCancel() {
    this.router.navigate(['/pts20']);
  }
}
