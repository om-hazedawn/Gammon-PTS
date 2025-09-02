import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  template: `
    <div class="form-detail-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditMode ? 'Edit Form 20' : 'New Form 20' }}</mat-card-title>
          <mat-card-subtitle>Procurement Tender Form</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
            <!-- Basic Information Section -->
            <div class="section">
              <h3>Basic Information</h3>
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Tender Number</mat-label>
                  <input matInput formControlName="tenderNo" [readonly]="!isEditMode" />
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Project Name</mat-label>
                  <input matInput formControlName="projectName" required />
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Client Name</mat-label>
                  <input matInput formControlName="clientName" required />
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Contract Value</mat-label>
                  <input matInput type="number" formControlName="contractValue" required />
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Currency</mat-label>
                  <mat-select formControlName="currency">
                    <mat-option value="HKD">HKD</mat-option>
                    <mat-option value="USD">USD</mat-option>
                    <mat-option value="CNY">CNY</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Tender Closing Date</mat-label>
                  <input matInput [matDatepicker]="picker" formControlName="tenderClosingDate" />
                  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                  <mat-datepicker #picker></mat-datepicker>
                </mat-form-field>
              </div>
            </div>

            <!-- Project Details Section -->
            <div class="section">
              <h3>Project Details</h3>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Project Description</mat-label>
                <textarea matInput rows="4" formControlName="projectDescription"></textarea>
              </mat-form-field>

              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Contract Type</mat-label>
                  <mat-select formControlName="contractType">
                    <mat-option value="lump-sum">Lump Sum</mat-option>
                    <mat-option value="measurement">Measurement</mat-option>
                    <mat-option value="design-build">Design & Build</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Contract Duration (months)</mat-label>
                  <input matInput type="number" formControlName="contractDuration" />
                </mat-form-field>
              </div>
            </div>

            <!-- Actions -->
            <div class="actions">
              <button type="button" mat-button (click)="goBack()">Cancel</button>
              <button type="submit" mat-raised-button color="primary" [disabled]="!formGroup.valid">
                {{ isEditMode ? 'Update' : 'Create' }}
              </button>
              <button
                type="button"
                mat-raised-button
                color="accent"
                (click)="saveDraft()"
                *ngIf="!isEditMode"
              >
                Save as Draft
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .form-detail-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .section {
        margin-bottom: 30px;
      }

      .section h3 {
        color: #1976d2;
        margin-bottom: 16px;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 8px;
      }

      .form-row {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
      }

      .form-row mat-form-field {
        flex: 1;
      }

      .full-width {
        width: 100%;
      }

      .actions {
        display: flex;
        gap: 16px;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #e0e0e0;
      }
    `,
  ],
})
export class FormDetailComponent implements OnInit {
  formGroup!: FormGroup;
  isEditMode = false;
  formId: number | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id'] && params['id'] !== 'new') {
        this.formId = +params['id'];
        this.isEditMode = true;
        this.loadForm(this.formId);
      }
    });
  }

  private initializeForm(): void {
    this.formGroup = this.fb.group({
      tenderNo: [''],
      projectName: ['', Validators.required],
      clientName: ['', Validators.required],
      contractValue: ['', Validators.required],
      currency: ['HKD', Validators.required],
      tenderClosingDate: [''],
      projectDescription: [''],
      contractType: [''],
      contractDuration: [''],
    });
  }

  private loadForm(id: number): void {
    // TODO: Load form data from service
    console.log('Loading form:', id);
    // Mock data
    this.formGroup.patchValue({
      tenderNo: 'T2024001',
      projectName: 'Sample Construction Project',
      clientName: 'ABC Construction Ltd',
      contractValue: 10000000,
      currency: 'HKD',
      tenderClosingDate: new Date(),
      projectDescription: 'Sample project description',
      contractType: 'lump-sum',
      contractDuration: 18,
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      if (this.isEditMode) {
        // TODO: Update form
        console.log('Updating form:', formData);
      } else {
        // TODO: Create new form
        console.log('Creating form:', formData);
      }
      this.goBack();
    }
  }

  saveDraft(): void {
    const formData = this.formGroup.value;
    // TODO: Save as draft
    console.log('Saving draft:', formData);
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['/pts20/forms']);
  }
}
