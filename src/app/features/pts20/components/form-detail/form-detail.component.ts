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
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
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
    MatIconModule,
    MatRadioModule,
  ],
  template: `
    <div class="form-detail-container">
      <mat-card>
        <mat-card-header>
          <h3>{{ isEditMode ? 'Edit Form 20' : 'New Form 20' }}</h3>
          <button class="draft-btn">Draft</button>

          <div class="header-icons">
            <button mat-icon-button aria-label="Save">
              <mat-icon>save</mat-icon>
            </button>
            <button mat-icon-button aria-label="Delete">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div class="form-navigation">
            <div
              *ngFor="let step of steps; let i = index"
              class="step-item"
              [class.active]="currentStep === i + 1"
              (click)="goToStep(i + 1)"
            >
              <span class="step-number">{{ i + 1 }}</span>
              <span class="step-label">{{ step }}</span>
            </div>
          </div>
          <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
            <!-- Step 1: Project Section -->
            <div *ngIf="currentStep === 1" class="section">
              <h3>Project</h3>
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Form 30</mat-label>
                  <input matInput formControlName="form30" [readonly]="!isEditMode" />
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Business Unit</mat-label>
                  <mat-select formControlName="businessUnit">
                    <mat-option value="unit1">Unit 1</mat-option>
                    <mat-option value="unit2">Unit 2</mat-option>
                    <mat-option value="unit3">Unit 3</mat-option>
                  </mat-select>
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Due Date</mat-label>
                  <input
                    matInput
                    [matDatepicker]="picker"
                    formControlName="tenderClosingDate"
                    placeholder="Select a date"
                  />
                  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                  <mat-datepicker #picker></mat-datepicker>
                </mat-form-field>
              </div>
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Tender no</mat-label>
                  <input matInput formControlName="tenderNo" required />
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Project Title</mat-label>
                  <input matInput formControlName="projectTitle" required />
                </mat-form-field>
              </div>
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Bid Manager</mat-label>
                  <input matInput formControlName="BidManager" required />
                </mat-form-field>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Estimator</mat-label>
                  <input matInput formControlName="Estimator" required />
                </mat-form-field>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Planner</mat-label>
                  <input matInput formControlName="Planner" required />
                </mat-form-field>
              </div>
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Region</mat-label>
                  <mat-select formControlName="Region">
                    <mat-option value="region1">Region 1</mat-option>
                    <mat-option value="region2">Region 2</mat-option>
                    <mat-option value="region3">Region 3</mat-option>
                  </mat-select>
                </mat-form-field>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Location</mat-label>
                  <input matInput formControlName="Location" required />
                </mat-form-field>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Planner</mat-label>
                  <input matInput formControlName="Planner" required />
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>TenderType</mat-label>
                  <mat-select formControlName="TenderType">
                    <mat-option value="type1">Type 1</mat-option>
                    <mat-option value="type2">Type 2</mat-option>
                    <mat-option value="type3">Type 3</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Brief Description</mat-label>
                  <textarea matInput formControlName="BriefDescription" rows="3"></textarea>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-label class="block mb-1">Approximate Value</mat-label>
                <div style="display: flex; gap: 10px;">
                  <!-- Dropdown -->
                  <mat-form-field appearance="outline" style="flex: 1;">
                    <mat-select formControlName="ApproximateValueType" placeholder="Select type">
                      <mat-option value="type1">Type 1</mat-option>
                      <mat-option value="type2">Type 2</mat-option>
                      <mat-option value="type3">Type 3</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <!-- Input box -->
                  <mat-form-field appearance="outline" style="flex: 1;">
                    <input
                      matInput
                      formControlName="ApproximateValueInput"
                      placeholder="Enter value"
                    />
                  </mat-form-field>
                </div>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Approximate Value Remarks</mat-label>
                  <input matInput formControlName="ApproximateValue" />
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Approximate Margin</mat-label>
                  <input matInput formControlName="Approxmargin" />
                </mat-form-field>
              </div>

              <div class="form-row">
                <!-- Shared label -->
                <label class="block mb-1">Maintenance / Defect</label>

                <!-- Flex container for 3 fields -->
                <div style="display: flex; gap: 10px;">
                  <!-- First Select -->
                  <mat-form-field appearance="outline" style="flex: 1;">
                    <mat-select formControlName="maintenanceType" placeholder="Select option">
                      <mat-option value="type1">Type 1</mat-option>
                      <mat-option value="type2">Type 2</mat-option>
                      <mat-option value="type3">Type 3</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <!-- Number Input -->
                  <mat-form-field appearance="outline" style="flex: 1;">
                    <input
                      matInput
                      type="number"
                      formControlName="maintenanceValue"
                      placeholder="Enter number"
                    />
                  </mat-form-field>

                  <!-- Second Select -->
                  <mat-form-field appearance="outline" style="flex: 1;">
                    <mat-select formControlName="maintenanceStatus" placeholder="Select status">
                      <mat-option value="open">Open</mat-option>
                      <mat-option value="inprogress">In Progress</mat-option>
                      <mat-option value="closed">Closed</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Client</mat-label>
                  <input matInput formControlName="Client" required />
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Contract Period (months)</mat-label>
                  <input matInput type="number" formControlName="ContractPeriod" required />
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Financial Standing</mat-label>
                  <input matInput formControlName="FinantialStanding" required />
                </mat-form-field>
              </div>

              <div class="form-row">
                <div class="form-row">
                  <label class="block mb-1">Tender Market Scheme</label>
                  <mat-radio-group formControlName="TenderMarketScheme" class="flex gap-6">
                    <mat-radio-button value="yes">Yes</mat-radio-button>
                    <mat-radio-button value="no">No</mat-radio-button>
                    <mat-radio-button value="na">N.A.</mat-radio-button>
                  </mat-radio-group>
                </div>

                <mat-form-field appearance="outline">
                  <mat-label>Financial/Technical Split Value</mat-label>
                  <mat-select
                    formControlName="FinancialTechnicalSplitValue"
                    placeholder="Select status"
                  >
                    <mat-option value="open">Open</mat-option>
                    <mat-option value="inprogress">In Progress</mat-option>
                    <mat-option value="closed">Closed</mat-option>
                  </mat-select>
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Bid Type</mat-label>
                  <mat-select formControlName="BidType" placeholder="Select Bid Type">
                    <mat-option value="open">Open</mat-option>
                    <mat-option value="inprogress">In Progress</mat-option>
                    <mat-option value="closed">Closed</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>

            <!-- Step 2: Contract Section -->
            <div *ngIf="currentStep === 2" class="section">
              <h3>Contract</h3>
              <div formGroupName="contract">
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
            </div>

            <!-- Placeholder Sections -->
            <div *ngIf="currentStep > 2" class="section">
              <h3>{{ steps[currentStep - 1] }}</h3>
              <p>Content for {{ steps[currentStep - 1] }} will be added later.</p>
            </div>

            <!-- Navigation Buttons -->
            <div class="actions">
              <button
                type="button"
                mat-button
                (click)="previousStep()"
                [disabled]="currentStep === 1"
              >
                Previous
              </button>
              <button
                type="button"
                mat-raised-button
                color="primary"
                (click)="nextStep()"
                *ngIf="currentStep < steps.length"
              >
                Next
              </button>
              <button
                type="submit"
                mat-raised-button
                color="primary"
                [disabled]="!formGroup.valid"
                *ngIf="currentStep === steps.length"
              >
                Submit
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .header-icons {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-right: 16px;
      }

      .header-icons button {
        background: none;
        border: none;
        cursor: pointer;
      }

      .header-icons mat-icon {
        font-size: 24px;
        color: #1976d2;
      }

      .header-icons mat-icon:hover {
        color: #0056b3;
      }

      .draft-btn {
        display: block;
        margin: 16px auto 0;
        background-color: #007bff;
        color: white;
        border: none;
        width: 100px;
        height: 40px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
      }

      .draft-btn:hover {
        background-color: #0056b3;
      }

      .form-detail-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .form-navigation {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        background-color: #ffffff;
        padding: 10px 20px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .step-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        padding: 10px;
        transition: background-color 0.3s, color 0.3s;
      }

      .step-item.active {
        background-color: #1976d2;
        color: white;
        font-weight: bold;
        border-radius: 4px;
      }

      .step-item:hover {
        background-color: #e0e0e0;
      }

      .step-number {
        font-size: 18px;
        font-weight: bold;
      }

      .step-label {
        font-size: 14px;
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

      mat-form-field {
        --mat-form-field-padding: 8px; /* Add padding inside the form field */
      }

      input[matInput] {
        padding: 8px; /* Add padding inside the input box */
      }

      textarea[matInput] {
        padding: 8px; /* Add padding inside the textarea */
      }
    `,
  ],
})
export class FormDetailComponent implements OnInit {
  formGroup!: FormGroup;
  isEditMode = false;
  formId: number | null = null;
  currentStep = 1; // Track the current step
  steps = [
    'Project',
    'Contract',
    'Payment',
    'Bonds',
    'Warranty and Guarantees',
    'Insurances',
    'Other Issues',
    'Consultant',
    'Evaluation',
    'Distribution',
    'Attachment',
  ]; // Define section names

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
      form30: [''],
      businessUnit: [''],
      dueDate: [''],

      tenderNo: [''],
      projectTitle: ['', Validators.required],

      BidManager: [''],
      Estimator: [''],
      Planner: [''],

      Region: [''],
      Location: [''],
      TenderType: [''],
      BriefDescription: [''],

      ApproxValue: [''],

      ApproximateValue: [''],
      ApproximateValueInput: [''],
      ApproximateValueType: [''],
      Approxmargin: [''],
      Maintence: [''],

      maintenanceType: [''],
      maintenanceValue: [''],
      maintenanceStatus: [''],

      Client: [''],
      ContractPeriod: [''],
      FinantialStanding: [''],

      TenderMarketScheme: [''],
      FinancialTechnicalSplitValue: [''],
      BidType: [''],

      tenderClosingDate: [''],
      projectDescription: [''],
      contract: this.fb.group({
        contractType: [''],
        contractDuration: [''],
      }),
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
      contract: {
        contractType: 'lump-sum',
        contractDuration: 18,
      },
    });
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= this.steps.length) {
      this.currentStep = step;
    }
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
