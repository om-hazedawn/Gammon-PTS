import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
import {
  FormDetailAttachmentStepComponent,
  FormDetailBondsStepComponent,
  FormDetailConsultantStepComponent,
  FormDetailContractStepComponent,
  FormDetailDistributionStepComponent,
  FormDetailEvaluationStepComponent,
  FormDetailInsuranceStepComponent,
  FormDetailOtherIssuesStepComponent,
  FormDetailPaymentStepComponent,
  FormDetailProjectStepComponent,
  FormDetailWarrantiesStepComponent,
} from './';

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
    FormDetailProjectStepComponent,
    FormDetailContractStepComponent,
    FormDetailPaymentStepComponent,
    FormDetailBondsStepComponent,
    FormDetailWarrantiesStepComponent,
    FormDetailInsuranceStepComponent,
    FormDetailOtherIssuesStepComponent,
    FormDetailConsultantStepComponent,
    FormDetailEvaluationStepComponent,
    FormDetailDistributionStepComponent,
    FormDetailAttachmentStepComponent,
  ],
  encapsulation: ViewEncapsulation.None,
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
            @for (step of steps; track step; let i = $index) {
              <div
                class="step-item"
                [class.active]="currentStep === i + 1"
                (click)="goToStep(i + 1)"
              >
                <span class="step-number">{{ i + 1 }}</span>
                <span class="step-label">{{ step }}</span>
              </div>
            }
          </div>

          <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
            @if (currentStep === 1) {
              <app-form-detail-project-step
                [isEditMode]="isEditMode"
              ></app-form-detail-project-step>
            }

            @if (currentStep === 2) {
              <app-form-detail-contract-step></app-form-detail-contract-step>
            }

            @if (currentStep === 3) {
              <app-form-detail-payment-step></app-form-detail-payment-step>
            }

            @if (currentStep === 4) {
              <app-form-detail-bonds-step></app-form-detail-bonds-step>
            }

            @if (currentStep === 5) {
              <app-form-detail-warranties-step></app-form-detail-warranties-step>
            }

            @if (currentStep === 6) {
              <app-form-detail-insurance-step></app-form-detail-insurance-step>
            }

            @if (currentStep === 7) {
              <app-form-detail-other-issues-step></app-form-detail-other-issues-step>
            }

            @if (currentStep === 8) {
              <app-form-detail-consultant-step></app-form-detail-consultant-step>
            }

            @if (currentStep === 9) {
              <app-form-detail-evaluation-step></app-form-detail-evaluation-step>
            }

            @if (currentStep === 10) {
              <app-form-detail-distribution-step></app-form-detail-distribution-step>
            }

            @if (currentStep === 11) {
              <app-form-detail-attachment-step></app-form-detail-attachment-step>
            }

            <div class="actions">
              <button
                type="button"
                mat-button
                (click)="previousStep()"
                [disabled]="currentStep === 1"
              >
                Previous
              </button>
              @if (currentStep < steps.length) {
                <button
                  type="button"
                  mat-raised-button
                  color="primary"
                  (click)="nextStep()"
                >
                  Next
                </button>
              }
              @if (currentStep === steps.length) {
                <button
                  type="submit"
                  mat-raised-button
                  color="primary"
                  [disabled]="!formGroup.valid"
                >
                  Submit
                </button>
              }
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .evaluation-item {
        background: white;
        border-radius: 8px;
        transition: all 0.3s ease;
      }

      .evaluation-item:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .mat-radio-button.mat-accent .mat-radio-inner-circle {
        background-color: #1976d2;
      }

      .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {
        border-color: #1976d2;
      }

      .mat-radio-button .mat-radio-label-content {
        font-size: 14px;
        padding-left: 8px;
      }

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
        --mat-form-field-padding: 8px;
      }

      input[matInput] {
        padding: 8px;
      }

      textarea[matInput] {
        padding: 8px;
      }

      .unit-select {
        width: 60px;
      }

      .radio-group-container {
        display: flex;
        align-items: center;
        padding: 8px 0;
        min-height: 48px;
      }

      .radio-option {
        padding: 8px;
        border-radius: 4px;
        font-size: 14px;
      }

      .radio-option:hover {
        background-color: #f5f5f5;
      }

      mat-radio-group {
        margin: 8px 0;
        align-items: center;
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
    'Warranty & Guarantees',
    'Insurances',
    'Other Issues',
    'Consultant & Competitor',
    'Evaluation',
    'Distribution',
    'Attachment',
  ];

  bonds = [
    { bondType: 'Tender Bond' },
    { bondType: 'Performance Bond' },
    { bondType: 'Advance Payment Bond' },
    { bondType: 'Retention Bond' },
    { bondType: 'Maintenance Bond' },
    { bondType: 'Others' },
  ];

  Warranties = [
    { warrantyType: 'Parent Company Guarantee' },
    { warrantyType: 'Parent Company Undertaking' },
    { warrantyType: 'Collateral Warranties' },
    { warrantyType: 'Other Contingent Liabilities' },
    { warrantyType: 'Provided by Employer' },
  ];

  Insurance = [
    { insuranceType: 'Provided by Employer' },
    { insuranceType: 'Min Amount of Third Party Liability' },
    { insuranceType: 'Onerous Requirements' },
    { insuranceType: 'Shortfall in Cover' },
  ];

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
      businessUnit: ['', Validators.required],
      dueDate: [''],
      performanceUnit: ['%'],

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

      /*page 2*/

      Client: [''],
      ContractPeriod: [''],
      FinantialStanding: [''],

      TenderMarketScheme: [''],
      FinancialTechnicalSplitValue: [''],
      BidType: [''],

      duedate: [''],
      projectDescription: [''],
      contract: this.fb.group({
        contractType: [''],
        contractDuration: [''],
        Type: [''],
        Description: [''],
        DegreeName: [''],
        DegreeRiskType: [''],
        DegreeRiskLimit: [''],
        RateOfDamages: [''],
        LimitOfLiability: [''],

        MeasurementDetails: [''],
        Fluctuations: [''],

        Adverse: [''],
        TimeExtension: [''],
        WeatherExtention: [''],
        OtherUnusualConditions: [''],
        DesignResponsibility: [''],
        BIMRequired: [''],
        DFMARequired: [''],
      }),

      payment: this.fb.group({
        Period: [''],
        Months: [''],
        DegreeRiskType: [''],
        DegreeRiskType2: [''],
        Remarks: [''],
        Retention: [''],
        Percent: [''],
        Remarks2: [''],

        PaymentPeriod: [''],
        Months2: [''],
        LimitofRetention: [''],
        LimitofRetentionselect: [''],
        DegreeRiskType3: [''],

        MaxExposureAmount: [''],
        MaxExposureMonths: [''],
        PeakDeficit: [''],
        PeakSurplus: [''],
        RiskLevel: [''],
        AverageSurplus: [''],
        AverageDeficit: [''],
      }),

      Bonds: this.fb.group({
        // Tender Bond
        TenderValue: [''],
        tenderUnit: ['%'],
        TenderCallBasis: [''],
        TenderExpiry: [''],
        TenderRemark: [''],
        TenderRisk: ['M'],

        // Performance Bond
        PerformanceValue: [''],
        performanceUnit: ['%'],
        PerformanceCallBasis: [''],
        PerformanceExpiry: [''],
        PerformanceRemark: [''],
        degreeRisk2: ['M'],

        // Advance Payment Bond
        AdvanceValue: [''],
        advanceUnit: ['%'],
        AdvanceCallBasis: [''],
        AdvanceExpiry: [''],
        AdvanceRemark: [''],
        AdvanceRisk: ['M'],

        // Retention Bond
        RetentionValue: [''],
        retentionUnit: ['%'],
        RetentionCallBasis: [''],
        RetentionExpiry: [''],
        RetentionRemark: [''],
        RetentionRisk: ['M'],

        // Maintenance Bond
        MaintenanceValue: [''],
        maintenanceUnit: ['%'],
        MaintenanceCallBasis: [''],
        MaintenanceExpiry: [''],
        MaintenanceRemark: [''],
        MaintenanceRisk: ['M'],

        // Other Bond
        OtherValue: [''],
        otherUnit: ['%'],
        OtherCallBasis: [''],
        OtherExpiry: [''],
        OtherRemark: [''],
        OtherRisk: ['M'],
      }),

      Warranties: this.fb.group({
        // Parent Company Guarantee
        ParentCompanyGuarantee: [''],
        ParentCompanyDetails: [''],
        ParentCompanyRisk: ['M'],

        // Parent Company Undertaking
        ParentCompanyUndertaking: [''],
        ParentCompanyUndertakingDetails: [''],
        ParentCompanyUndertakingRisk: ['M'],

        // Collateral Warranties
        CollateralWarranties: [''],
        CollateralWarrantiesDetails: [''],
        CollateralWarrantiesRisk: ['M'],

        // Other Contingent Liabilities
        OtherContingent: [''],
        OtherContingentDetails: [''],
        OtherContingentRisk: ['M'],

        // Provided by Employer
        ProvidedByEmployer: [''],
        ProvidedByEmployerDetails: [''],
        ProvidedByEmployerRisk: ['M'],
      }),

      Insurance: this.fb.group({
        // Provided by Employer
        ProvidedByEmployer: [''],
        ProvidedByEmployerDetails: [''],
        ProvidedByEmployerRisk: ['M'],

        // Min Amount of Third Party Liability
        ThirdPartyAmount: [''],
        ThirdPartyUnit: ['M'],
        ThirdPartyDetails: [''],
        ThirdPartyRisk: ['M'],

        // Onerous Requirements
        OnerousRequirements: [''],
        OnerousRequirementsDetails: [''],
        OnerousRequirementsRisk: ['M'],

        // Shortfall in Cover
        ShortfallInCover: [''],
        ShortfallInCoverDetails: [''],
        ShortfallInCoverRisk: ['M'],
      }),

      OtherIssue: this.fb.group({
        // New Plant Requirements
        NewPlantDetails: [''],
        NewPlantRisk: ['M'],

        // PFI or PPP Bid
        PFIorPPPBid: [''],
        PFIorPPPBidDetails: [''],
        pfiOrPPPBidRisk: ['M'],

        // Financing Required
        FinancingRequired: [''],
        FinancingRequiredDetails: [''],
        FinancingRequiredRisk: ['M'],

        // Foreign Currency Content
        ForeignCurrencyContentDetails: [''],
        ForeignCurrencyContentRisk: ['M'],
      }),

      'Consultant & Competitor': this.fb.group({
        // Civil & Structural
        CivilStructuralDetails: [''],
        CivilStructuralRisk: [''],

        // Architect
        ArchitectDetails: [''],
        ArchitectRisk: [''],

        // E&M
        EMDetails: [''],
        EMRisk: [''],

        // Quantity Surveyor
        QuantitySurveyorDetails: [''],
        QuantitySurveyorRisk: [''],

        // Other
        OtherDetails: [''],
        OtherRisk: [''],

        // Competitor
        competitorDetails: [''],
      }),

      // Add Evaluation form group
      Evaluation: this.fb.group({
        AcceptibilityRadio: [''],
        AcceptibilityRemark: [''],

        PaymentTermsRadio: [''],
        PaymentTermsRemark: [''],

        BondandGuaranteesRadio: [''],
        BondandGuaranteesRemark: [''],

        ContractValueRadio: [''],
        ContractValueRemark: [''],

        PlantEquipmentRadio: [''],
        PlantEquipmentRemark: [''],

        SiteManagementRadio: [''],
        SiteManagementRemark: [''],

        CurrentWorkloadRadio: [''],
        CurrentWorkloadRemark: [''],

        TimeAllowedRadio: [''],
        TimeAllowedRemark: [''],

        previousRecordRadio: [''],
        previousRecordRemark: [''],

        HealthSafetyEnvironmentRadio: [''],
        HealthSafetyEnvironmentRemark: [''],

        CompetitionRadio: [''],
        CompetitionRemark: [''],

        EvaluationComments: [''],
      }),

      Distribution: this.fb.group({
        ChiefExecutive: [''],
        DivisionCommercialManager: [''],

        ExecutiveDirector: [''],
        InsuranceManager: [''],

        Director: [''],
        HeadofLambeth: [''],

        BidManager: [''],
        HeadOfProcurement: [''],

        FinanceDirector: [''],
        RiskOpportunityManager: [''],

        CommercialDirector: [''],
        HSEQ: [''],

        GeneralCounselLegal: [''],
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
      duedate: new Date(),
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
