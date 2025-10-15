import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Form20DetailsService, Form20Details } from '../../../../core/services/Form20/form20details.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    MatProgressSpinnerModule,
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
          <button class="draft-btn" (click)="saveDraft()">Draft</button>
          <div class="header-icons">
            <button mat-icon-button aria-label="Save" (click)="onSubmit()">
              <mat-icon>save</mat-icon>
            </button>
            <button mat-icon-button aria-label="Delete" *ngIf="isEditMode" (click)="deleteForm()">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </mat-card-header>
        <mat-card-content>
          @if (isLoading) {
            <div class="loading-container">
              <mat-spinner diameter="40"></mat-spinner>
              <p>Loading form details...</p>
            </div>
          } @else if (loadError) {
            <div class="error-container">
              <mat-icon color="warn">error</mat-icon>
              <p>{{ loadError }}</p>
              <button mat-raised-button color="primary" (click)="loadForm(formId!)">Retry</button>
            </div>
          } @else if (formGroup) {
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
                @if (currentStep < 10) {
                  <button
                    type="button"
                    mat-raised-button
                    color="primary"
                    (click)="nextStep()"
                  >
                    Next
                  </button>
                }
                @if (currentStep === 10) {
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
          }
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
  isLoading = false;
  loadError: string | null = null;
  validationErrors: { [key: string]: string[] } = {};
  
  // Mapping of form sections to their display names for error messages
  private readonly sectionNames = {
    'businessUnit': 'Business Unit',
    'projectTitle': 'Project Title',
    'tenderNo': 'Tender Number',
    'Location': 'Location',
    'BriefDescription': 'Brief Description',
    'contract': 'Contract Details',
    'payment': 'Payment Details',
    'Bonds': 'Bonds',
    'Warranties': 'Warranties',
    'Insurance': 'Insurance',
    'OtherIssue': 'Other Issues',
    'Consultant & Competitor': 'Consultant & Competitor',
    'Evaluation': 'Evaluation',
    'Distribution': 'Distribution'
  };
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private form20Service: Form20DetailsService
  ) {
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
        performanceUnit: [''],
        PerformanceCallBasis: [''],
        PerformanceExpiry: [''],
        PerformanceRemark: [''],
        degreeRisk2: [''],

        // Advance Payment Bond
        AdvanceValue: [''],
        advanceUnit: [''],
        AdvanceCallBasis: [''],
        AdvanceExpiry: [''],
        AdvanceRemark: [''],
        AdvanceRisk: ['M'],

        // Retention Bond
        RetentionValue: [''],
        retentionUnit: [''],
        RetentionCallBasis: [''],
        RetentionExpiry: [''],
        RetentionRemark: [''],
        RetentionRisk: [''],

        // Maintenance Bond
        MaintenanceValue: [''],
        maintenanceUnit: [''],
        MaintenanceCallBasis: [''],
        MaintenanceExpiry: [''],
        MaintenanceRemark: [''],
        MaintenanceRisk: [''],

        // Other Bond
        OtherValue: [''],
        otherUnit: [''],
        OtherCallBasis: [''],
        OtherExpiry: [''],
        OtherRemark: [''],
        OtherRisk: [''],
      }),

      Warranties: this.fb.group({
        // Parent Company Guarantee
        ParentCompanyGuarantee: [''],
        ParentCompanyDetails: [''],
        ParentCompanyRisk: [''],

        // Parent Company Undertaking
        ParentCompanyUndertaking: [''],
        ParentCompanyUndertakingDetails: [''],
        ParentCompanyUndertakingRisk: [''],

        // Collateral Warranties
        CollateralWarranties: [''],
        CollateralWarrantiesDetails: [''],
        CollateralWarrantiesRisk: [''],

        // Other Contingent Liabilities
        OtherContingent: [''],
        OtherContingentDetails: [''],
        OtherContingentRisk: [''],

        // Provided by Employer
        ProvidedByEmployer: [''],
        ProvidedByEmployerDetails: [''],
        ProvidedByEmployerRisk: [''],
      }),

      Insurance: this.fb.group({
        // Provided by Employer
        ProvidedByEmployer: [''],
        ProvidedByEmployerDetails: [''],
        ProvidedByEmployerRisk: [''],

        // Min Amount of Third Party Liability
        ThirdPartyAmount: [''],
        ThirdPartyUnit: [''],
        ThirdPartyDetails: [''],
        ThirdPartyRisk: [''],

        // Onerous Requirements
        OnerousRequirements: [''],
        OnerousRequirementsDetails: [''],
        OnerousRequirementsRisk: [''],

        // Shortfall in Cover
        ShortfallInCover: [''],
        ShortfallInCoverDetails: [''],
        ShortfallInCoverRisk: [''],
      }),

      OtherIssue: this.fb.group({
        // New Plant Requirements
        NewPlantDetails: [''],
        NewPlantRisk: [''],

        // PFI or PPP Bid
        PFIorPPPBid: [''],
        PFIorPPPBidDetails: [''],
        pfiOrPPPBidRisk: [''],

        // Financing Required
        FinancingRequired: [''],
        FinancingRequiredDetails: [''],
        FinancingRequiredRisk: [''],

        // Foreign Currency Content
        ForeignCurrencyContentDetails: [''],
        ForeignCurrencyContentRisk: [''],
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

  loadForm(id: number): void {
    this.isLoading = true;
    this.loadError = null;
    
    this.form20Service.getForm20Details(id).subscribe({
      next: (formData: Form20Details) => {
        try {
          if (!formData) {
            throw new Error('No data received from server');
          }
          this.patchFormValues(formData);
          this.isLoading = false;
        } catch (err) {
          console.error('Error processing form data:', err);
          this.loadError = 'Failed to process form data. Please try again.';
          this.isLoading = false;
        }
      },
      error: (error: Error) => {
        console.error('Error loading form:', error);
        this.loadError = error.message || 'Failed to load form details. Please try again.';
        this.isLoading = false;
      }
    });
  }

  private ensureString(value: any): string {
    if (value === null || value === undefined) return '';
    return String(value);
  }

  private ensureNumber(value: any): number | null {
    if (value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  }

  patchFormValues(formData: Form20Details): void {
      if (!formData) {
        throw new Error('Invalid form data received');
      }

      // Helper function to normalize Yes/No values
      const normalizeYesNo = (value: string | null): string => {
        if (!value) return 'No';
        value = value.toUpperCase();
        if (value === 'YES') return 'Yes';
        if (value === 'NO') return 'No';
        if (value === 'N/A' || value === 'NA') return 'N.A.';
        return value;
      };

      // Helper function to ensure risk code format
      const normalizeRiskCode = (value: string | null): string => {
        if (!value || value.trim() === '') return 'M';
        const validCodes = ['L', 'L/M', 'M', 'M/H', 'H', 'NA', 'NSR', 'Pending'];
        return validCodes.includes(value) ? value : 'M';
      };
  
      this.formGroup.patchValue({
        form30: formData.form30Id,
        businessUnit: formData.businessUnitCode,
        dueDate: formData.dueDate,
        tenderNo: formData.tenderNo,
        projectTitle: formData.title,
        BidManager: formData.bidManager,
        Estimator: formData.estimator,
        Planner: formData.planner,
        Location: formData.location,
        BriefDescription: formData.description,
        Client: formData.clientName,
        ApproxValue: formData.approximateValue,
        Approxmargin: formData.profitMargin,
  
        contract: {
          contractType: this.ensureNumber(formData.contractTypeId),
          Description: this.ensureString(formData.contractFormDescription),
          DegreeName: this.ensureString(formData.contractFormDescription),
          DegreeRiskType: normalizeRiskCode(formData.contractFormRiskCode),
          DesignResponsibility: this.ensureString(formData.contractDesignResponsibility),
          BIMRequired: normalizeYesNo(formData.contractBIMRequired),
          DFMARequired: normalizeYesNo(formData.contractDFMARequired),
          Adverse: normalizeYesNo(formData.contractIsAdversePhyiscal),
          TimeExtension: normalizeYesNo(formData.contractIsTimeExtension),
          WeatherExtention: this.ensureString(formData.contractIsTimeExtensionValue),
          OtherUnusualConditions: this.ensureString(formData.contractUnusualConditions),
          RateOfDamages: this.ensureNumber(formData.contractDamageRate),
          LimitOfLiability: this.ensureString(formData.contractLiabilityLimit),
          MeasurementDetails: this.ensureNumber(formData.contractMeasurementId),
          Fluctuations: this.ensureNumber(formData.contractFluctuationId),
          Type: this.ensureNumber(formData.contractTypeId)
        },
  
        payment: {
          Period: formData.paymentPeriod,
          Months: formData.paymentCertificationPeriod,
          DegreeRiskType: formData.paymentCertificationRiskCode,
          Retention: formData.paymentRetentionAmount,
          Percent: formData.paymentRetentionAmountPercent,
          Remarks: formData.paymentRetentionAmountRemark,
          LimitofRetention: formData.paymentRetentionLimit,
          LimitofRetentionselect: formData.paymentRetentionLimitRiskCode,
          MaxExposureAmount: formData.paymentMaxExposure,
          MaxExposureMonths: formData.paymentMaxExposureMonth,
          PeakDeficit: formData.paymentPeakDeficit,
          PeakSurplus: formData.paymentPeakSurplus,
          AverageDeficit: formData.paymentAverageDeficit,
          AverageSurplus: formData.paymentAverageSurplus,
          RiskLevel: formData.paymentCashRiskCode
        },
  
        Bonds: {
          TenderValue: formData.bondTenderValue,
          TenderCallBasis: formData.bondTenderCallBasis,
          TenderExpiry: formData.bondTenderExpiryDate,
          TenderRemark: formData.bondTenderRemark,
          TenderRisk: formData.bondTenderRiskCode,
          tenderUnit: formData.bondTenderPercentage,
  
          PerformanceValue: formData.bondPerformanceValue,
          PerformanceCallBasis: formData.bondPerformanceCallBasis,
          PerformanceExpiry: formData.bondPerformanceExpiryDate,
          PerformanceRemark: formData.bondPerformanceRemark,
          degreeRisk2: formData.bondPerformanceRiskCode,
          performanceUnit: formData.bondPerformancePercentage,
  
          AdvanceValue: formData.bondPaymentValue,
          AdvanceCallBasis: formData.bondPaymentCallBasis,
          AdvanceExpiry: formData.bondPaymentExpiryDate,
          AdvanceRemark: formData.bondPaymentRemark,
          AdvanceRisk: formData.bondPaymentRiskCode,
          advanceUnit: formData.bondPaymentPercentage,
  
          RetentionValue: formData.bondRetentionValue,
          RetentionCallBasis: formData.bondRetentionCallBasis,
          RetentionExpiry: formData.bondRetentionExpiryDate,
          RetentionRemark: formData.bondRetentionRemark,
          RetentionRisk: formData.bondRetentionRiskCode,
          retentionUnit: formData.bondRetentionPercentage,
  
          MaintenanceValue: formData.bondMaintenanceValue,
          MaintenanceCallBasis: formData.bondMaintenanceCallBasis,
          MaintenanceExpiry: formData.bondMaintenanceExpiryDate,
          MaintenanceRemark: formData.bondMaintenanceRemark,
          MaintenanceRisk: formData.bondMaintenanceRiskCode,
          maintenanceUnit: formData.bondMaintenancePercentage,
  
          OtherValue: formData.bondOtherValue,
          OtherCallBasis: formData.bondOtherCallBasis,
          OtherExpiry: formData.bondOtherExpiryDate,
          OtherRemark: formData.bondOtherRemark,
          OtherRisk: formData.bondOtherRiskCode,
          otherUnit: formData.bondOtherPercentage
        },
  
        Warranties: {
          ParentCompanyGuarantee: normalizeYesNo(formData.warrantGuranteeIsParentCompanyGuarantee),
          ParentCompanyDetails: formData.warrantGuranteeParentCompanyGuarantee,
          ParentCompanyRisk: formData.warrantGuranteeParentCompanyGuaranteeRiskCode || 'M',
  
          ParentCompanyUndertaking: normalizeYesNo(formData.warrantGuranteeIsParentCompanyUnderTaking),
          ParentCompanyUndertakingDetails: formData.warrantGuranteeParentCompanyUnderTaking,
          ParentCompanyUndertakingRisk: formData.warrantGuranteeParentCompanyUnderTakingRiskCode || 'M',
  
          CollateralWarranties: normalizeYesNo(formData.warrantGuranteeIsCollateralWarranties),
          CollateralWarrantiesDetails: formData.warrantGuranteeCollateralWarranties,
          CollateralWarrantiesRisk: formData.warrantGuranteeCollateralWarrantiesRiskCode || 'M',
  
          OtherContingent: normalizeYesNo(formData.warrantGuranteeIsOtherLiabilities),
          OtherContingentDetails: formData.warrantGuranteeOtherLiabilities,
          OtherContingentRisk: formData.warrantGuranteeOtherLiabilitiesRiskCode || 'M',
  
          ProvidedByEmployer: normalizeYesNo(formData.insuranceIsProvidedByEmployer),
          ProvidedByEmployerDetails: formData.insuranceProvidedByEmployer,
          ProvidedByEmployerRisk: formData.insuranceProvidedByEmployerRiskCode || 'M'
        },
  
        Insurance: {
          ProvidedByEmployer: normalizeYesNo(formData.insuranceIsProvidedByEmployer),
          ProvidedByEmployerDetails: formData.insuranceProvidedByEmployer,
          ProvidedByEmployerRisk: formData.insuranceProvidedByEmployerRiskCode || 'M',
          ThirdPartyAmount: formData.insuranceThirdPartyAmount,
          ThirdPartyRisk: formData.insuranceThirdPartyRiskCode || 'M',
          OnerousRequirements: normalizeYesNo(formData.insuranceIsOnerousRequirement),
          OnerousRequirementsDetails: formData.insuranceOnerousRequirement,
          OnerousRequirementsRisk: formData.insuranceOnerousRequirementRiskCode || 'M',
          ShortfallInCover: normalizeYesNo(formData.insuranceIsShortFallInCover),
          ShortfallInCoverDetails: formData.insuranceShortFallInCover,
          ShortfallInCoverRisk: formData.insuranceShortFallInCoverRiskCode || 'M'
        },
  
        OtherIssue: {
          NewPlantDetails: formData.otherPlantInvestmentRequirement,
          NewPlantRisk: formData.otherPlantInvestmnetRequirementRiskCode || 'M',
          PFIorPPPBid: normalizeYesNo(formData.otherIsPFIPPP),
          PFIorPPPBidDetails: formData.otherIsPFIPPP,
          pfiOrPPPBidRisk: formData.otherPFIPPPRiskCode || 'M',
          FinancingRequired: normalizeYesNo(formData.otherFinancingRequired),
          FinancingRequiredDetails: formData.otherFinancingRequired,
          FinancingRequiredRisk: formData.otherFinancingRequiredRiskCode || 'M',
          ForeignCurrencyContentDetails: formData.otherForeignCurrency,
          ForeignCurrencyContentRisk: formData.otherForeignCurrencyRiskCode || 'M'
        },
  
        'Consultant & Competitor': {
          CivilStructuralDetails: formData.consultantCivilStructure,
          CivilStructuralRisk: formData.consultantCivilStructureRiskCode,
          ArchitectDetails: formData.consultantArchitect,
          ArchitectRisk: formData.consultantArchitectRiskCode,
          EMDetails: formData.consultantEM,
          EMRisk: formData.consultantEMRiskCode,
          QuantitySurveyorDetails: formData.consultantQuantitySurveyor,
          QuantitySurveyorRisk: formData.consultantQuantitySurveyorRiskCode,
          OtherDetails: formData.consultantOthers,
          OtherRisk: formData.consultantOthersRiskCode,
          competitorDetails: formData.competitor
        },
  
        Evaluation: {
          AcceptibilityRadio: normalizeYesNo(formData.evaluationIsContractCondition),
          AcceptibilityRemark: formData.evaluationContractCondition,
          PaymentTermsRadio: normalizeYesNo(formData.evaluationIsPaymentTerm),
          PaymentTermsRemark: formData.evaluationPaymentTerm,
          BondandGuaranteesRadio: normalizeYesNo(formData.evaluationIsBondGuarantee),
          BondandGuaranteesRemark: formData.evaluationBondGuarantee,
          ContractValueRadio: normalizeYesNo(formData.evaluationIsValueExtendContract),
          ContractValueRemark: formData.evaluationValueExtendContract,
          PlantEquipmentRadio: normalizeYesNo(formData.evaluationIsPlantEquipmentRequired),
          PlantEquipmentRemark: formData.evaluationPlantEquipmentRequired,
          SiteManagementRadio: normalizeYesNo(formData.evaluationIsSiteManagement),
          SiteManagementRemark: formData.evaluationSiteManagement,
          CurrentWorkloadRadio: normalizeYesNo(formData.evaluationIsCompanyWorkload),
          CurrentWorkloadRemark: formData.evaluationCompanyWorkload,
          TimeAllowedRadio: normalizeYesNo(formData.evaluationIsTimeAllowed),
          TimeAllowedRemark: formData.evaluationTimeAllowed,
          previousRecordRadio: normalizeYesNo(formData.evaluationIsConsultantRecord),
          previousRecordRemark: formData.evaluationConsultantRecord,
          HealthSafetyEnvironmentRadio: normalizeYesNo(formData.evaluationIsHealthSafetyEnvironment),
          HealthSafetyEnvironmentRemark: formData.evaluationHealthSafetyEnvironment,
          CompetitionRadio: normalizeYesNo(formData.evaluationIsCompetition),
          CompetitionRemark: formData.evaluationCompetition,
          EvaluationComments: formData.evaluationComments
        },
  
        Distribution: {
          ChiefExecutive: formData.distributionCE,
          ExecutiveDirector: formData.distributionExeDir,
          Director: formData.distributionDir,
          BidManager: formData.distributionBidMgr,
          FinanceDirector: formData.distributionFinDir,
          CommercialDirector: formData.distributionComDir,
          GeneralCounselLegal: formData.distributionGenC,
          DivisionCommercialManager: formData.distributionDivComM,
          InsuranceManager: formData.distributionInsMgr,
          HeadofLambeth: formData.distributionLambeth,
          HeadOfProcurement: formData.distributionProc,
          RiskOpportunityManager: formData.distributionRiskOpp,
          HSEQ: formData.distributionHSEQ
        }
    });
  }

  validateCurrentStep(): boolean {
    this.validationErrors = {};

    const stepControls = {
      1: ['businessUnit', 'projectTitle', 'tenderNo', 'Location', 'BriefDescription'],
      2: ['contract'],
      3: ['payment'],
      4: ['Bonds'],
      5: ['Warranties'],
      6: ['Insurance'],
      7: ['OtherIssue'],
      8: ['Consultant & Competitor'],
      9: ['Evaluation'],
      10: ['Distribution'],
      11: [] // Attachment step has no required fields
    };

    const currentStepFields = stepControls[this.currentStep as keyof typeof stepControls] || [];
    if (!currentStepFields.length) return true;

    let isValid = true;
    
    // Helper function to validate nested form group
    const validateNestedGroup = (control: AbstractControl | null, basePath: string): boolean => {
      if (!control || !(control instanceof FormGroup)) return true;
      
      let groupValid = true;
      Object.keys(control.controls).forEach(key => {
        const childControl = control.get(key);
        const fieldPath = basePath ? `${basePath}.${key}` : key;
        
        if (childControl instanceof FormGroup) {
          // Recursively validate nested groups
          if (!validateNestedGroup(childControl, fieldPath)) {
            groupValid = false;
          }
        } else {
          // Validate individual control
          if (!this.validateField(childControl, fieldPath)) {
            groupValid = false;
          }
        }
      });
      return groupValid;
    };

    // Validate each field in current step
    for (const field of currentStepFields) {
      const control = this.formGroup.get(field);
      
      if (control instanceof FormGroup) {
        // Handle nested form groups
        if (!validateNestedGroup(control, field)) {
          isValid = false;
        }
      } else {
        // Handle regular form controls
        if (!this.validateField(control, field)) {
          isValid = false;
        }
      }
    }
    
    if (!isValid) {
      // Build detailed error message
      const errorMessages: string[] = [];
      Object.keys(this.validationErrors).forEach(field => {
        // Split nested paths for proper section name lookup
        const fieldParts = field.split('.');
        const sectionName = this.sectionNames[fieldParts[0] as keyof typeof this.sectionNames] || fieldParts[0];
        const subField = fieldParts.length > 1 ? ` (${fieldParts.slice(1).join('.')})` : '';
        
        this.validationErrors[field].forEach(error => {
          errorMessages.push(`${sectionName}${subField}: ${error}`);
        });
      });

      if (errorMessages.length > 0) {
        this.loadError = 'Validation Errors:\n' + errorMessages.join('\n');
      } else {
        this.loadError = 'Please fill in all required fields before proceeding.';
      }
      
      setTimeout(() => this.loadError = null, 5000);
    }
    return isValid;
  }
  private validateField(control: AbstractControl | null, fieldName: string): boolean {
    if (!control) return true;
    
    const errors: string[] = [];
    if (control.hasError('required')) {
      errors.push('This field is required');
    }
    if (control.hasError('min')) {
      errors.push('Value is below minimum allowed');
    }
    if (control.hasError('max')) {
      errors.push('Value exceeds maximum allowed');
    }
    if (control.hasError('pattern')) {
      errors.push('Invalid format');
    }

    if (errors.length > 0) {
      this.validationErrors[fieldName] = errors;
      return false;
    }
    return true;
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length) {
      if (this.validateCurrentStep()) {
        this.currentStep++;
        this.loadError = null;
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= this.steps.length) {
      if (step > this.currentStep && !this.validateCurrentStep()) {
        return;
      }
      this.currentStep = step;
      this.loadError = null;
    }
  }

  deleteForm(): void {
    if (confirm('Are you sure you want to delete this form?')) {
      console.log('Delete form:', this.formId);
      this.goBack();
    }
  }

  onSubmit(): void {
    // Clear previous validation errors
    this.validationErrors = {};
    
    // Validate all steps before submission
    let isValid = true;
    const originalStep = this.currentStep;
    
    try {
      for (let step = 1; step <= this.steps.length; step++) {
        this.currentStep = step;
        if (!this.validateCurrentStep()) {
          isValid = false;
          break;
        }
      }
    } finally {
      // Restore original step if validation fails
      if (!isValid) {
        this.currentStep = originalStep;
      }
    }

    if (!isValid) {
      const errorCount = Object.keys(this.validationErrors).length;
      this.loadError = `Form validation failed with ${errorCount} error${errorCount > 1 ? 's' : ''}. Please check highlighted fields.`;
      setTimeout(() => this.loadError = null, 5000);
      return;
    }

    if (this.formGroup.valid) {
      const formValue = {...this.formGroup.value};
      
      // Helper function to denormalize Yes/No values
      const denormalizeYesNo = (value: string | null): string => {
        if (!value) return 'NO';
        value = value.toUpperCase();
        if (value === 'YES' || value === 'NO') return value;
        if (value === 'N.A.' || value === 'NA') return 'NA';
        return value;
      };

      // Process all Yes/No fields across sections
      if (formValue.contract) {
        formValue.contract.BIMRequired = denormalizeYesNo(formValue.contract.BIMRequired);
        formValue.contract.DFMARequired = denormalizeYesNo(formValue.contract.DFMARequired);
        formValue.contract.Adverse = denormalizeYesNo(formValue.contract.Adverse);
        formValue.contract.TimeExtension = denormalizeYesNo(formValue.contract.TimeExtension);
      }

      if (formValue.Warranties) {
        formValue.Warranties.ParentCompanyGuarantee = denormalizeYesNo(formValue.Warranties.ParentCompanyGuarantee);
        formValue.Warranties.ParentCompanyUndertaking = denormalizeYesNo(formValue.Warranties.ParentCompanyUndertaking);
        formValue.Warranties.CollateralWarranties = denormalizeYesNo(formValue.Warranties.CollateralWarranties);
        formValue.Warranties.OtherContingent = denormalizeYesNo(formValue.Warranties.OtherContingent);
        formValue.Warranties.ProvidedByEmployer = denormalizeYesNo(formValue.Warranties.ProvidedByEmployer);
      }

      if (formValue.Insurance) {
        formValue.Insurance.ProvidedByEmployer = denormalizeYesNo(formValue.Insurance.ProvidedByEmployer);
        formValue.Insurance.OnerousRequirements = denormalizeYesNo(formValue.Insurance.OnerousRequirements);
        formValue.Insurance.ShortfallInCover = denormalizeYesNo(formValue.Insurance.ShortfallInCover);
      }

      if (formValue.Evaluation) {
        Object.keys(formValue.Evaluation).forEach(key => {
          if (key.endsWith('Radio')) {
            formValue.Evaluation[key] = denormalizeYesNo(formValue.Evaluation[key]);
          }
        });
      }

      if (formValue.OtherIssue) {
        formValue.OtherIssue.PFIorPPPBid = denormalizeYesNo(formValue.OtherIssue.PFIorPPPBid);
        formValue.OtherIssue.FinancingRequired = denormalizeYesNo(formValue.OtherIssue.FinancingRequired);
      }

      // Submit the form with denormalized values
      console.log('Form submitted:', formValue);
      this.goBack();
    } else {
      this.loadError = 'Form validation failed. Please check all required fields.';
      setTimeout(() => this.loadError = null, 5000);
    }
  }

  saveDraft(): void {
    if (this.formGroup.value) {
      const formValue = {...this.formGroup.value};
      
      // Denormalize values back to API format
      const denormalizeYesNo = (value: string | null): string => {
        if (!value) return 'NO';
        value = value.toUpperCase();
        if (value === 'YES' || value === 'NO') return value;
        if (value === 'N.A.' || value === 'NA') return 'NA';
        return value;
      };

      // Denormalize Contract section
      if (formValue.contract) {
        formValue.contract.BIMRequired = denormalizeYesNo(formValue.contract.BIMRequired);
        formValue.contract.DFMARequired = denormalizeYesNo(formValue.contract.DFMARequired);
        formValue.contract.Adverse = denormalizeYesNo(formValue.contract.Adverse);
        formValue.contract.TimeExtension = denormalizeYesNo(formValue.contract.TimeExtension);
      }

      // Denormalize Warranties section
      if (formValue.Warranties) {
        formValue.Warranties.ParentCompanyGuarantee = denormalizeYesNo(formValue.Warranties.ParentCompanyGuarantee);
        formValue.Warranties.ParentCompanyUndertaking = denormalizeYesNo(formValue.Warranties.ParentCompanyUndertaking);
        formValue.Warranties.CollateralWarranties = denormalizeYesNo(formValue.Warranties.CollateralWarranties);
        formValue.Warranties.OtherContingent = denormalizeYesNo(formValue.Warranties.OtherContingent);
        formValue.Warranties.ProvidedByEmployer = denormalizeYesNo(formValue.Warranties.ProvidedByEmployer);
      }

      // Denormalize Insurance section
      if (formValue.Insurance) {
        formValue.Insurance.ProvidedByEmployer = denormalizeYesNo(formValue.Insurance.ProvidedByEmployer);
        formValue.Insurance.OnerousRequirements = denormalizeYesNo(formValue.Insurance.OnerousRequirements);
        formValue.Insurance.ShortfallInCover = denormalizeYesNo(formValue.Insurance.ShortfallInCover);
      }

      // Denormalize Evaluation section
      if (formValue.Evaluation) {
        Object.keys(formValue.Evaluation).forEach(key => {
          if (key.endsWith('Radio')) {
            formValue.Evaluation[key] = denormalizeYesNo(formValue.Evaluation[key]);
          }
        });
      }

      // Denormalize OtherIssue section
      if (formValue.OtherIssue) {
        formValue.OtherIssue.PFIorPPPBid = denormalizeYesNo(formValue.OtherIssue.PFIorPPPBid);
        formValue.OtherIssue.FinancingRequired = denormalizeYesNo(formValue.OtherIssue.FinancingRequired);
      }

      console.log('Saving draft:', formValue);
    }
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['/pts20/forms']);
  }

  retryLoad(): void {
    if (this.formId) {
      this.loadForm(this.formId);
    }
  }
}
