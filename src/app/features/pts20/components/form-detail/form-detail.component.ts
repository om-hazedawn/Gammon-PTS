import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Form20ListDropdownService } from '../../../../core/services/Form20/form20listdropdown.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { FormApprovalComponent } from './form-Approval/form-approval.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  Form20DetailsService,
  Form20Details,
} from '../../../../core/services/Form20/form20details.service';
import { SaveForm20 } from '../../../../model/entity/saveform20';
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
import { PopupCopyTenderComponent } from './popup-Copy-Tender/popup-Copy-Tender.component';
import { PopupKeyDateComponent } from './popup-KeyDate/popup-KeyDate.component';

@Component({
  selector: 'app-form-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
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
          <button class="draft-btn">{{ formStatus }}</button>
          <div class="header-icons">
            @if (formId && formId !== 0 && formGroup.value.tenderNo && formGroup.value.tenderNo !==
            'NEW' && hasEditRight()) {
            <button
              mat-raised-button
              color="primary"
              aria-label="Copy Tender"
              (click)="openFormCopyDialog()"
            >
              <mat-icon>content_copy</mat-icon>
              Copy Tender
            </button>
            } 
             <!-- canRejectForm this form -->
            <button mat-icon-button aria-label="rejected">
              <mat-icon>report_problem</mat-icon>
            </button>

             <!-- @if (hasEditRight() && (!formId || formId < 1) && formGroup.value.tenderNo == 'NEW') {} -->
            <button mat-icon-button aria-label="Delete" (click)="deleteForm()">
              <mat-icon>delete</mat-icon>
            </button>

            <button mat-icon-button aria-label="Save" (click)="onSubmit()">
              <mat-icon>save</mat-icon>
            </button>

            @if (formStatus == 'BID') {
            <button 
              mat-icon-button aria-label="Key Dates" 
              (click)="openKeyDateDialog()"
            >
              <mat-icon>event</mat-icon>
            </button>
            }
            
             @if(formId && formId !== 0) {
            <button mat-icon-button aria-label="print">
              <mat-icon>print</mat-icon>
            </button>
            }
          </div>
        </mat-card-header>
        <mat-card-content>
          @if (formDeleted) {
          <div class="form-deleted-message">
            <mat-icon class="icon">warning</mat-icon>
            <span>This form has been <strong>Deleted</strong>.</span>
          </div>
          } @if (isLoading) {
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
            <div class="step-item" [class.active]="currentStep === i + 1" (click)="goToStep(i + 1)">
              <span class="step-number">{{ i + 1 }}</span>
              <span class="step-label">{{ step }}</span>
            </div>
            }
          </div>

          <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
            @if (currentStep === 1) {
            <app-form-detail-project-step
              [isEditMode]="isEditMode"
              [formId]="formId"
              (allocateTenderNoRequest)="onAllocateTenderNoRequest()"
            ></app-form-detail-project-step>
            } @if (currentStep === 2) {
            <app-form-detail-contract-step></app-form-detail-contract-step>
            } @if (currentStep === 3) {
            <app-form-detail-payment-step></app-form-detail-payment-step>
            } @if (currentStep === 4) {
            <app-form-detail-bonds-step></app-form-detail-bonds-step>
            } @if (currentStep === 5) {
            <app-form-detail-warranties-step></app-form-detail-warranties-step>
            } @if (currentStep === 6) {
            <app-form-detail-insurance-step></app-form-detail-insurance-step>
            } @if (currentStep === 7) {
            <app-form-detail-other-issues-step></app-form-detail-other-issues-step>
            } @if (currentStep === 8) {
            <app-form-detail-consultant-step></app-form-detail-consultant-step>
            } @if (currentStep === 9) {
            <app-form-detail-evaluation-step></app-form-detail-evaluation-step>
            } @if (currentStep === 10) {
            <app-form-detail-distribution-step></app-form-detail-distribution-step>
            } @if (currentStep === 11) {
            <app-form-detail-attachment-step [formId]="formId"></app-form-detail-attachment-step>
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
              <button type="button" mat-raised-button color="primary" (click)="nextStep()">
                Next
              </button>
              } @if (currentStep === 10) {
              <button type="submit" mat-raised-button color="primary" [disabled]="!formGroup.valid">
                @if (canSubmit() && hasEditRight()) { Submit } @else { Approvers }
              </button>
              }
            </div>
          </form>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./form-detail.component.css'],
})
export class FormDetailComponent implements OnInit {
  formGroup!: FormGroup;
  isEditMode = false;
  formId: number | null = null;
  currentStep = 1; // Track the current step
  isLoading = false;
  loadError: string | null = null;
  validationErrors: { [key: string]: string[] } = {};
  formStatus: string = 'Draft'; // Track form status

  formDeleted: boolean = false;

  allocatingTenderNo = false;
  onAllocateTenderNoRequest(): void {
    // Save the form first
    const normalizedValue = this.normalizeFormValues(this.formGroup.value);
    this.allocatingTenderNo = true;
    this.form20Service.saveForm20(normalizedValue).subscribe({
      next: (response) => {
        // Update formId if needed
        if (response) {
          this.formId = response;
        }
        // Only call the tender allocation API if formId is a valid number
        if (typeof this.formId === 'number') {
          this.form20ListDropdownService.assignTenderNo(this.formId).subscribe({
            next: () => {
              this.allocatingTenderNo = false;
              this.loadError = 'Tender No allocated successfully.';
              this.loadForm(this.formId!);
              setTimeout(() => (this.loadError = null), 3000);
            },
            error: (err) => {
              this.allocatingTenderNo = false;
              this.loadError = 'Error allocating Tender No.';
              console.error('Error allocating Tender No:', err);
              setTimeout(() => (this.loadError = null), 5000);
            },
          });
        } else {
          this.allocatingTenderNo = false;
          this.loadError = 'Form ID is invalid. Cannot allocate Tender No.';
          setTimeout(() => (this.loadError = null), 5000);
        }
      },
      error: (err) => {
        this.allocatingTenderNo = false;
        this.loadError = 'Error saving form before allocation.';
        console.error('Error saving form:', err);
        setTimeout(() => (this.loadError = null), 5000);
      },
    });
  }

  // Mapping of form sections to their display names for error messages
  private readonly sectionNames = {
    businessUnit: 'Business Unit',
    projectTitle: 'Project Title',
    tenderNo: 'Tender Number',
    location: 'Location',
    BriefDescription: 'Brief Description',
    contract: 'Contract Details',
    payment: 'Payment Details',
    Bonds: 'Bonds',
    Warranties: 'Warranties',
    Insurance: 'Insurance',
    OtherIssue: 'Other Issues',
    'Consultant & Competitor': 'Consultant & Competitor',
    Evaluation: 'Evaluation',
    Distribution: 'Distribution',
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
    private form20Service: Form20DetailsService,
    private dialog: MatDialog,
    private form20ListDropdownService: Form20ListDropdownService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      // Only set formId to 0 if it is not already set to a valid value
      if (id === '0' && (!this.formId || this.formId === 0)) {
        this.formId = 0;
        this.isEditMode = false;
      } else if (id && id !== '0') {
        this.formId = +id;
        this.isEditMode = true;
        this.loadForm(this.formId);
      }
    });
  }

  // Call this after loading form data
  private checkBusinessUnitMatch(businessUnitCode: string): void {
    // Call obtainBuildingUnit API and compare keys
    this.form20ListDropdownService.obtainBuildingUnit().subscribe({
      next: (unitResponse: any) => {
        // Keys from API response
        const validUnits = Object.keys(unitResponse || {});
        // If businessUnitCode is not in validUnits, mark as deleted
        if (!validUnits.includes(businessUnitCode)) {
          this.formDeleted = true;
        } else {
          this.formDeleted = false;
        }
      },
      error: (err: any) => {
        // On error, do not mark as deleted, but log
        console.error('Error fetching building units:', err);
        this.formDeleted = false;
      },
    });
  }

  /**
   * Check if the current form can be submitted based on its status
   */
  canSubmit(): boolean {
    const status = this.formGroup?.value?.status;
    return this.form20ListDropdownService.canSubmitForm(status);
  }

  /**
   * Check if the current user has edit rights for the form's business unit
   */
  hasEditRight(): boolean {
    const businessUnitCode = this.formGroup?.value?.businessUnit;
    return this.form20ListDropdownService.hasEditRight(businessUnitCode);
  }

  openFormCopyDialog(): void {
    const dialogRef = this.dialog.open(PopupCopyTenderComponent, {
      width: '900px',
      disableClose: true,
      data: {
        currentFormId: this.formId
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Copy ALL fields FROM current form TO selected tender EXCEPT: id, tenderNo, title, businessUnitCode, status
        console.log('Selected tender:', result);
        
        // Load the selected form details
        if (result.id) {
          this.form20Service.getForm20Details(result.id).subscribe({
            next: (selectedFormData) => {
              // Store selected form's fields that should NOT be copied
              const preservedFields = {
                id: selectedFormData.id,
                tenderNo: selectedFormData.tenderNo,
                title: selectedFormData.title,
                businessUnitCode: selectedFormData.businessUnitCode,
                status: selectedFormData.status,
                form30Id: selectedFormData.form30Id,
                dueDate: selectedFormData.dueDate,
                distributionDivComM: selectedFormData.distributionDivComM,
                ceApproval: selectedFormData.ceApproval,
                cmApproval: selectedFormData.cmApproval,
                edApproval: selectedFormData.edApproval,
                dirApproval: selectedFormData.dirApproval,
                hoEApproval: selectedFormData.hoEApproval,
                approximateValueRemark: selectedFormData.approximateValueRemark,
                contractDamageRateUnit: selectedFormData.contractDamageRateUnit,
                paymentRetentionLimit: selectedFormData.paymentRetentionLimit,
                evaluationCashFlow: selectedFormData.evaluationCashFlow,
                evaluationIsCashFlow: selectedFormData.evaluationIsCashFlow,
                evaluationClientFinancialStatus: selectedFormData.evaluationClientFinancialStatus,
                evaluationIsClientFinancialStatus: selectedFormData.evaluationIsClientFinancialStatus,
                evaluationEstimatingDepartmentWorkload: selectedFormData.evaluationEstimatingDepartmentWorkload,
                evaluationIsEstimatingDepartmentWorkload: selectedFormData.evaluationIsEstimatingDepartmentWorkload
              };
              
              // Store current form data temporarily
              const currentFormData = { ...this.formGroup.value };
              
              // Patch the selected form data into formGroup temporarily
              this.patchFormValues(selectedFormData);
              
              // Update with current form's data, but exclude the preserved fields
              Object.keys(currentFormData).forEach(key => {
                if (!preservedFields.hasOwnProperty(key)) {
                  this.formGroup.patchValue({ [key]: currentFormData[key] });
                }
              });
              
              // Normalize the form values for saving
              const normalizedSelectedValue = this.normalizeFormValues(this.formGroup.value);
              normalizedSelectedValue.id = result.id; // Use selected form's ID
              
              this.isLoading = true;
              
              // Save the selected form with copied data
              this.form20Service.saveForm20(normalizedSelectedValue).subscribe({
                next: (response) => {
                  this.isLoading = false;
                  this.loadError = `Copied all data to ${result.tenderNo} (${result.title}) and saved successfully`;
                  
                  // Reload current form to restore original data
                  if (this.formId) {
                    this.loadForm(this.formId);
                  }
                  
                  setTimeout(() => (this.loadError = null), 3000);
                },
                error: (error) => {
                  this.isLoading = false;
                  console.error('Error saving selected form:', error);
                  this.loadError = `Failed to save data to ${result.tenderNo}`;
                  
                  // Reload current form to restore original data
                  if (this.formId) {
                    this.loadForm(this.formId);
                  }
                  
                  setTimeout(() => (this.loadError = null), 3000);
                }
              });
            },
            error: (error) => {
              console.error('Error loading selected form:', error);
              this.loadError = 'Failed to load selected tender';
              setTimeout(() => (this.loadError = null), 3000);
            }
          });
        }
      }
    });
  }

  openKeyDateDialog(): void {
    const dialogRef = this.dialog.open(PopupKeyDateComponent, {
      width: '600px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the result from the dialog here
        console.log('Key date result:', result);
      }
    });
  }

  private initializeForm(): void {
    this.formGroup = this.fb.group({
      // Required fields
      businessUnit: ['', Validators.required],
      projectTitle: ['', Validators.required],

      // Optional fields
      form30: [''],
      dueDate: [''],
      ComplexContractPeriod: [''], // Field for complex contract period/periodDetail
      performanceUnit: [''],
      tenderNo: [''],
      BidManager: [''],
      Estimator: [''],
      Planner: [''],
      Region: [''],
      Location: [''],
      TenderType: [''],
      BriefDescription: [''],

      ApproxValue: [''],
      ApproximateValue: [''],
      ApproximateValueInput: ['', [Validators.pattern(/^-?\d*\.?\d*$/)]], // Allow valid decimal numbers only
      ApproximateValueType: [''],
      Approxmargin: [''],
      Maintence: [''],

      maintenanceType: [''],
      maintenanceValue: [''],
      maintenanceStatus1: [''],

      // Contract Period fields
      contractPeriodValue: [''],
      contractPeriodUnit: [''],

      clientName: [''],
      ContractPeriod: [''],
      FinantialStanding: [''],

      TenderMarketScheme: [''],
      FinancialTechnicalSplitValue: [''],
      BidType: [''],

      JvAgreement: [''],
      JvSplit: [''],
      JvPartner: [''],

      projectDescription: [''],
      contract: this.fb.group({
        contractType: [''],
        Type: [''],
        Description: [''],
        DegreeRiskTypeContract: [''],
        contractDuration: [''],
        RateOfDamages: [''],
        LimitOfLiability: [''],
        DegreeRiskDamage: [''],
        MeasurementDetails: [''],
        DegreeRiskMeasurement: [''],
        Fluctuations: [''],
        DegreeRiskfluctuation: [''],

        DegreeName: [''],
        Adverse: [''],
        TimeExtension: [''],
        WeatherExtention: [''],
        OtherUnusualConditions: [''],
        DesignResponsibility: [''],
        BIMRequired: [''],
        DFMARequired: [''],

        DegreeRiskWeather: [''],
        DegreeRiskTypeUnusual: [''],
        DegreeRiskTypeDesign: [''],
        DegreeRiskTypeBIM: [''],
        DegreeRiskTypeDFMA: [''],
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
        tenderUnit: [''],
        TenderCallBasis: [''],
        TenderExpiry: [''],
        TenderRemark: [''],
        TenderRisk: [''],

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
        AdvanceRisk: [''],

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
        OtherName: [''],
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

      // Approval arrays
      ceApproval: [[]],
      cmApproval: [[]],
      edApproval: [[]],
      dirApproval: [[]],
      hoEApproval: [[]],
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
      error: (error: HttpErrorResponse) => {
        console.error('Error loading form:', error);
        if (error.status === 400) {
          this.loadError =
            'Invalid form ID or form data not found. Please check the form ID and try again.';
        } else if (error.error?.message) {
          this.loadError = error.error.message;
        } else {
          this.loadError = 'Failed to load form details. Please try again.';
        }
        this.isLoading = false;
      },
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
    // Update form status
    this.formStatus = formData.status || 'Draft';

    // Patch approval arrays for dialog
    this.formGroup.patchValue({
      ceApproval: formData.ceApproval || [],
      cmApproval: formData.cmApproval || [],
      edApproval: formData.edApproval || [],
      dirApproval: formData.dirApproval || [],
      hoEApproval: formData.hoEApproval || [],
      id: formData.id || null,
    });
    if (!formData) {
      throw new Error('Invalid form data received');
    }

    // Check businessUnitCode against obtainBuildingUnit API
    if (formData.businessUnitCode) {
      this.checkBusinessUnitMatch(formData.businessUnitCode);
    }

    // Set all contract period related fields
    this.formGroup.patchValue({
      ComplexContractPeriod: formData.periodDetail || '',
      contractPeriodValue: formData.period || '',
      contractPeriodUnit: formData.periodUnit || '',
    });

    // Helper function to normalize Yes/No values
    const normalizeYesNo = (value: string | null): string => {
      if (!value) return '';
      value = value.toUpperCase();
      if (value === 'YES') return value;
      if (value === 'NO') return value;
      if (value === 'N/A' || value === 'NA') return value;
      return value;
    };

    // Helper function to ensure risk code format
    const normalizeRiskCode = (value: string | null): string => {
      if (!value || value.trim() === '') return '';
      return value;
    };

    console.log('Loading form data - contractDamageRiskCode:', formData.contractDamageRiskCode);
    console.log('Loading form data - contractFormRiskCode:', formData.contractFormRiskCode);
    console.log(
      'Loading form data - paymentCertificationPeriod:',
      formData.paymentCertificationPeriod
    );
    console.log('Loading form data - paymentPeriod:', formData.paymentPeriod);

    this.formGroup.patchValue({
      form30: formData.form30Id,
      ApproximateValue: formData.approximateValueRemark,
      businessUnit: formData.businessUnitCode,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
      tenderNo: formData.tenderNo,
      projectTitle: formData.title,
      TenderType: formData.tenderTypeId, // Map tenderTypeId to TenderType when loading
      BidManager: formData.bidManager,
      Estimator: formData.estimator,
      Planner: formData.planner,
      Region: formData.countryId,
      Location: formData.location,
      BriefDescription: formData.description,
      clientName: formData.clientName,
      ApproxValue: formData.approximateValue,
      Approxmargin: formData.profitMargin,
      ApproximateValueType: formData.currencyId,
      ApproximateValueInput: formData.approximateValue, // Map approximate value to input field
      maintenanceType: this.ensureNumber(formData.maintenanceDefectId),
      maintenanceStatus1: this.ensureString(formData.maintenanceDefectUnit),
      maintenanceValue: this.ensureNumber(formData.maintenanceDefectPeriod),
      periodUnit: formData.periodUnit || '',
      period: this.ensureNumber(formData.period),

      FinantialStanding: formData.clientFinanceStanding,

      TenderMarketScheme: formData.isMarkingScheme,
      FinancialTechnicalSplitValue: formData.splitValueId,
      BidType: formData.bidTypeId,
      JvAgreement: formData.jvAgreementId,
      JvSplit: formData.jvSplit,
      JvPartner: formData.jvPartner,

      contract: {
        Type: this.ensureNumber(formData.contractTypeId),
        Description: this.ensureString(formData.contractFormDescription),
        DegreeName: this.ensureString(formData.contractFormDescription),
        DegreeRiskTypeContract: normalizeRiskCode(formData.contractFormRiskCode),
        DegreeRiskDamage: normalizeRiskCode(formData.contractDamageRiskCode),
        DesignResponsibility: this.ensureString(formData.contractDesignResponsibility),
        DegreeRiskMeasurement: normalizeRiskCode(formData.contractMeasurementRiskCode),
        DegreeRiskfluctuation: normalizeRiskCode(formData.contractFluctuationRiskCode),
        DegreeRiskWeather: normalizeRiskCode(formData.contractDesignRiskCode),
        DegreeRiskTypeUnusual: normalizeRiskCode(formData.contractUnusualRiskCode),
        DegreeRiskTypeDesign: normalizeRiskCode(formData.contractDesignRiskCode),
        DegreeRiskTypeBIM: normalizeRiskCode(formData.contractBIMRiskCode),
        DegreeRiskTypeDFMA: normalizeRiskCode(formData.contractDFMARiskCode),
        BIMRequired: normalizeYesNo(formData.contractBIMRequired),
        DFMARequired: normalizeYesNo(formData.contractDFMARequired),
        Adverse: normalizeYesNo(formData.contractIsAdversePhyiscal),
        TimeExtension: normalizeYesNo(formData.contractIsTimeExtension),
        WeatherExtention: this.ensureString(formData.contractIsTimeExtensionValue),
        OtherUnusualConditions: this.ensureString(formData.contractUnusualConditions),
        RateOfDamages: this.ensureString(formData.contractDamageRateRemark),
        LimitOfLiability: this.ensureString(formData.contractLiabilityLimit),
        MeasurementDetails: this.ensureNumber(formData.contractMeasurementId),
        Fluctuations: this.ensureNumber(formData.contractFluctuationId),
      },

      payment: {
        maintenanceValue: this.ensureNumber(formData.maintenanceDefectPeriod),
        maintenanceStatus: formData.maintenanceDefectUnit,
        Period: this.ensureNumber(formData.paymentCertificationPeriod),
        Months: formData.paymentCertificationPeriodUnit,
        DegreeRiskType: formData.paymentCertificationRiskCode,
        Retention: formData.paymentRetentionAmount,
        DegreeRiskType2: formData.paymentRetentionRiskCode,
        Percent: formData.paymentRetentionAmountPercent,
        Remarks: formData.paymentRetentionAmountRemark,
        PaymentPeriod: this.ensureNumber(formData.paymentPeriod),
        Months2: formData.paymentPeriodUnit,
        Remarks2: formData.paymentCertificationPeriodRemark,
        LimitofRetention: formData.paymentRetentionLimit,
        LimitofRetentionselect: formData.paymentRetentionLimitRiskCode,
        MaxExposureAmount: formData.paymentMaxExposure,
        MaxExposureMonths: formData.paymentMaxExposureMonth,
        PeakDeficit: formData.paymentPeakDeficit,
        PeakSurplus: formData.paymentPeakSurplus,
        AverageDeficit: formData.paymentAverageDeficit,
        AverageSurplus: formData.paymentAverageSurplus,
        RiskLevel: formData.paymentCashRiskCode,
        DegreeRiskType3: formData.paymentPeriodRiskCode,
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
        otherUnit: formData.bondOtherPercentage,
        OtherName: formData.bondOtherName,
      },

      Warranties: {
        ParentCompanyGuarantee: normalizeYesNo(formData.warrantGuranteeIsParentCompanyGuarantee),
        ParentCompanyDetails: formData.warrantGuranteeParentCompanyGuarantee,
        ParentCompanyRisk: formData.warrantGuranteeParentCompanyGuaranteeRiskCode,

        ParentCompanyUndertaking: normalizeYesNo(
          formData.warrantGuranteeIsParentCompanyUnderTaking
        ),
        ParentCompanyUndertakingDetails: formData.warrantGuranteeParentCompanyUnderTaking,
        ParentCompanyUndertakingRisk: formData.warrantGuranteeParentCompanyUnderTakingRiskCode,

        CollateralWarranties: normalizeYesNo(formData.warrantGuranteeIsCollateralWarranties),
        CollateralWarrantiesDetails: formData.warrantGuranteeCollateralWarranties,
        CollateralWarrantiesRisk: formData.warrantGuranteeCollateralWarrantiesRiskCode,

        OtherContingent: normalizeYesNo(formData.warrantGuranteeIsOtherLiabilities),
        OtherContingentDetails: formData.warrantGuranteeOtherLiabilities,
        OtherContingentRisk: formData.warrantGuranteeOtherLiabilitiesRiskCode,

        ProvidedByEmployer: normalizeYesNo(formData.insuranceIsProvidedByEmployer),
        ProvidedByEmployerDetails: formData.insuranceProvidedByEmployer,
        ProvidedByEmployerRisk: formData.insuranceProvidedByEmployerRiskCode,
      },

      Insurance: {
        ProvidedByEmployer: normalizeYesNo(formData.insuranceIsProvidedByEmployer),
        ProvidedByEmployerDetails: formData.insuranceProvidedByEmployer,
        ProvidedByEmployerRisk: formData.insuranceProvidedByEmployerRiskCode,
        ThirdPartyDetails: this.ensureNumber(formData.insuranceThirdPartyAmount),
        ThirdPartyRisk: formData.insuranceThirdPartyRiskCode,
        OnerousRequirements: normalizeYesNo(formData.insuranceIsOnerousRequirement),
        OnerousRequirementsDetails: formData.insuranceOnerousRequirement,
        OnerousRequirementsRisk: formData.insuranceOnerousRequirementRiskCode,
        ShortfallInCover: normalizeYesNo(formData.insuranceIsShortFallInCover),
        ShortfallInCoverDetails: formData.insuranceShortFallInCover,
        ShortfallInCoverRisk: formData.insuranceShortFallInCoverRiskCode,
      },

      OtherIssue: {
        NewPlantDetails: formData.otherPlantInvestmentRequirement,
        NewPlantRisk: formData.otherPlantInvestmnetRequirementRiskCode,
        PFIorPPPBid: normalizeYesNo(formData.otherIsPFIPPP),
        PFIorPPPBidDetails: formData.otherIsPFIPPP,
        pfiOrPPPBidRisk: formData.otherPFIPPPRiskCode,
        FinancingRequired: normalizeYesNo(formData.otherFinancingRequired),
        FinancingRequiredRisk: formData.otherFinancingRequiredRiskCode,
        ForeignCurrencyContentDetails: formData.otherForeignCurrency,
        ForeignCurrencyContentRisk: formData.otherForeignCurrencyRiskCode,
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
        competitorDetails: formData.competitor,
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
        EvaluationComments: formData.evaluationComments,
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
        HSEQ: formData.distributionHSEQ,
      },
    });
  }

  validateCurrentStep(): boolean {
    this.validationErrors = {};

    const stepControls = {
      1: ['businessUnit', 'projectTitle'], // Only these two fields are required
      2: ['contract'],
      3: ['payment'],
      4: ['Bonds'],
      5: ['Warranties'],
      6: ['Insurance'],
      7: ['OtherIssue'],
      8: ['Consultant & Competitor'],
      9: ['Evaluation'],
      10: ['Distribution'],
      11: [], // Attachment step has no required fields
    };

    const currentStepFields = stepControls[this.currentStep as keyof typeof stepControls] || [];
    if (!currentStepFields.length) return true;

    let isValid = true;

    // Helper function to validate nested form group
    const validateNestedGroup = (control: AbstractControl | null, basePath: string): boolean => {
      if (!control || !(control instanceof FormGroup)) return true;

      let isValid = true;
      // Only validate controls of the nested group
      for (const field of Object.keys((control as FormGroup).controls)) {
        const childControl = (control as FormGroup).get(field);
        if (childControl instanceof FormGroup) {
          // Handle deeper nested form groups
          if (!validateNestedGroup(childControl, field)) {
            isValid = false;
            console.log('Validation failed for nested group:', field);
          }
        } else {
          // Handle regular form controls
          if (!this.validateField(childControl, field)) {
            isValid = false;
            console.log(
              'Validation failed for field:',
              field,
              'Errors:',
              this.validationErrors[field]
            );
          }
        }
      }
      return isValid;
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
      Object.keys(this.validationErrors).forEach((field) => {
        // Split nested paths for proper section name lookup
        const fieldParts = field.split('.');
        const sectionName =
          this.sectionNames[fieldParts[0] as keyof typeof this.sectionNames] || fieldParts[0];
        const subField = fieldParts.length > 1 ? ` (${fieldParts.slice(1).join('.')})` : '';

        this.validationErrors[field].forEach((error) => {
          errorMessages.push(`${sectionName}${subField}: ${error}`);
        });
      });

      if (errorMessages.length > 0) {
        this.loadError = 'Validation Errors:\n' + errorMessages.join('\n');
      } else {
        this.loadError = 'Please fill in all required fields before proceeding.';
      }

      setTimeout(() => (this.loadError = null), 5000);
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
        if (this.formDeleted) {
          // If form is deleted, just go to next step without saving
          this.currentStep++;
          return;
        }
        let normalizedValue = this.normalizeFormValues(this.formGroup.value);
        this.isLoading = true;
        // Page 1: create new form
        if (this.currentStep === 1 && (!this.formId || this.formId === 0)) {
          normalizedValue = { ...normalizedValue, id: 0 };
          this.form20Service.saveForm20(normalizedValue).subscribe({
            next: (response: number) => {
              console.log('API response formId:', response);
              if (response) {
                this.formId = response;
                this.isEditMode = true;
                this.formGroup.patchValue({ id: this.formId });
                // Load the form so we have all backend data
                this.loadForm(this.formId);
                this.loadError = 'Form created successfully';
                setTimeout(() => {
                  this.loadError = null;
                  this.currentStep++;
                  this.isLoading = false;
                }, 1000);
              } else {
                this.isLoading = false;
              }
            },
            error: (err: any) => {
              this.loadError = 'Failed to save form. Please try again.';
              console.error('Error saving form:', err);
              this.isLoading = false;
              setTimeout(() => (this.loadError = null), 5000);
            },
          });
        } else {
          // All other pages: update form
          normalizedValue = { ...normalizedValue, id: this.formId ?? 0 };
          this.form20Service.saveForm20(normalizedValue).subscribe({
            next: (response: number) => {
              console.log('Form updated, formId:', response);
              this.loadError = 'Form updated successfully';
              setTimeout(() => {
                this.loadError = null;
                this.currentStep++;
                this.isLoading = false;
              }, 1000);
            },
            error: (err: any) => {
              this.loadError = 'Failed to update form. Please try again.';
              console.error('Error updating form:', err);
              this.isLoading = false;
              setTimeout(() => (this.loadError = null), 5000);
            },
          });
        }
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
    // Don't process form submission if we're in the attachment step
    if (this.currentStep === 11) {
      return;
    }

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
      this.loadError = `Form validation failed with ${errorCount} error${
        errorCount > 1 ? 's' : ''
      }. Please check highlighted fields.`;
      setTimeout(() => (this.loadError = null), 5000);
      return;
    }

    // For final submission with approval
    if (this.formGroup.valid) {
      // First save the form if it's new
      if (!this.isEditMode || this.formId === 0) {
        const normalizedValue = this.normalizeFormValues(this.formGroup.value);
        this.form20Service.saveForm20(normalizedValue).subscribe({
          next: (response) => {
            console.log('Form saved with ID:', response);
            this.formId = response;
            this.isEditMode = true;
            this.openApprovalDialog();
          },
          error: (err: HttpErrorResponse) => {
            this.loadError = 'Failed to save form. Please try again.';
            console.error('Error saving form:', err);
            setTimeout(() => (this.loadError = null), 5000);
          },
        });
      } else {
        this.openApprovalDialog();
      }
    } else {
      this.loadError = 'Form validation failed. Please check all required fields.';
      setTimeout(() => (this.loadError = null), 5000);
    }
  }

  private openApprovalDialog(): void {
    // Pass ceApproval array to dialog for CEO field pre-population
    const ceApproval = this.formGroup.value.ceApproval || [];
    const edApproval = this.formGroup.value.edApproval || [];
    const cmApproval = this.formGroup.value.cmApproval || [];
    const dirApproval = this.formGroup.value.dirApproval || [];
    const hoEApproval = this.formGroup.value.hoEApproval || [];
    console.log('openApprovalDialog ceApproval:', ceApproval);
    console.log('openApprovalDialog edApproval:', edApproval);
    console.log('openApprovalDialog cmApproval:', cmApproval);
    console.log('openApprovalDialog dirApproval:', dirApproval);
    console.log('openApprovalDialog hoEApproval:', hoEApproval);
    const dialogRef = this.dialog.open(FormApprovalComponent, {
      width: '800px',
      data: {
        formData: {
          ...this.formGroup.value,
          status: this.formGroup.value.status,
          businessUnitCode: this.formGroup.value.businessUnit,
        },
        ceApproval: ceApproval,
        edApproval: edApproval,
        cmApproval: cmApproval,
        dirApproval: dirApproval,
        hoEApproval: hoEApproval,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Patch approval arrays in form group with dialog result
        if (result.ceApproval) {
          this.formGroup.patchValue({ ceApproval: result.ceApproval });
        }
        if (result.edApproval) {
          this.formGroup.patchValue({ edApproval: result.edApproval });
        }
        if (result.cmApproval) {
          this.formGroup.patchValue({ cmApproval: result.cmApproval });
        }
        if (result.dirApproval) {
          this.formGroup.patchValue({ dirApproval: result.dirApproval });
        }
        if (result.hoEApproval) {
          this.formGroup.patchValue({ hoEApproval: result.hoEApproval });
        }
        this.processFormSubmission();
      }
    });
  }

  private processFormSubmission(): void {
    const normalizedValue = this.normalizeFormValues(this.formGroup.value);

    // For edit mode, ensure we have the correct ID
    if (this.formId) {
      normalizedValue.id = this.formId;
    }

    this.form20Service.saveForm20(normalizedValue).subscribe({
      next: (response) => {
        console.log('Form submitted successfully:', response);
        this.loadError = 'Form submitted successfully';
        setTimeout(() => {
          this.loadError = null;
          this.goBack();
        }, 2000);
      },
      error: (err: HttpErrorResponse) => {
        // ... error handling
      },
    });
  }

  saveDraft(): void {
    if (this.formGroup.value) {
      // First normalize the form values
      const normalizedValue = this.normalizeFormValues(this.formGroup.value);

      // Set status as Draft
      normalizedValue.status = 'Draft';

      // Add form ID if in edit mode
      if (this.formId) {
        normalizedValue.id = this.formId;
      }

      // Ensure arrays are properly set for distribution fields
      normalizedValue.distributionComDir = normalizedValue.distributionComDir || ['00001'];
      normalizedValue.distributionDivComM = normalizedValue.distributionDivComM || ['00001'];
      normalizedValue.distributionExeDir = normalizedValue.distributionExeDir || ['00001'];
      normalizedValue.distributionFinDir = normalizedValue.distributionFinDir || ['00001'];
      normalizedValue.distributionCE = normalizedValue.distributionCE || ['00001'];
      normalizedValue.distributionDir = normalizedValue.distributionDir || ['00001'];
      normalizedValue.distributionGenC = normalizedValue.distributionGenC || ['00001'];
      normalizedValue.distributionInsMgr = normalizedValue.distributionInsMgr || ['00001'];
      normalizedValue.distributionProc = normalizedValue.distributionProc || ['00001'];
      normalizedValue.distributionRiskOpp = normalizedValue.distributionRiskOpp || ['00001'];
      normalizedValue.distributionLambeth = normalizedValue.distributionLambeth || ['00001'];
      normalizedValue.distributionHSEQ = normalizedValue.distributionHSEQ || ['00001'];
      normalizedValue.distributionBidMgr = normalizedValue.distributionBidMgr || [];

      // Ensure approval arrays are properly initialized
      // Add approval arrays with correct property names

      Object.assign(normalizedValue);

      this.form20Service.saveForm20(normalizedValue).subscribe({
        next: (response) => {
          console.log('Draft saved successfully', response);
          const savedId = response;
          if (savedId) {
            this.formId = savedId;
            this.isEditMode = true;
          }
          // Show success message
          this.loadError = 'Draft saved successfully';
          setTimeout(() => {
            this.loadError = null;
            this.goBack();
          }, 2000);
        },
        error: (err: HttpErrorResponse) => {
          this.loadError = 'Failed to save draft. Please try again.';
          console.error('Error saving draft:', err);
          console.error('Error details:', err.error);
          console.error('Missing fields:', err.error?.errors);
          setTimeout(() => (this.loadError = null), 5000);
        },
      });
    } else {
      this.goBack();
    }
  }

  private createDefaultApproval(value?: any): {
    approverName: string;
    approvalDate: string;
    comments: string;
    decision: string;
    id: number | null;
  } {
    return {
      approverName: this.ensureString(value?.approverName),
      approvalDate: this.ensureString(value?.approvalDate),
      comments: this.ensureString(value?.comments),
      decision: this.ensureString(value?.decision),
      id: value?.id ?? null,
    };
  }

  private normalizeFormValues(formValue: any): SaveForm20 {
    if (!formValue) {
      throw new Error('Form data is required');
    }
    if (!formValue.businessUnit) {
      throw new Error('Business Unit is required');
    }
    if (!formValue.projectTitle) {
      throw new Error('Project Title is required');
    }

    // Ensure approximate value is a valid decimal
    let approximateVal = null;
    if (formValue.ApproximateValueInput) {
      // Clean and convert the value
      const cleanedValue = String(formValue.ApproximateValueInput).replace(/[$,\s]/g, '');
      const num = Number(cleanedValue);
      if (!isNaN(num)) {
        approximateVal = num;
      }
    }

    // Helper functions
    const toNumberOrNull = (value: any): number | null => {
      if (value === null || value === undefined || value === '') return null;

      // Remove currency symbols, commas and spaces if present
      if (typeof value === 'string') {
        value = value.replace(/[$,\s]/g, '');
      }

      const num = Number(value);
      return isNaN(num) ? null : num;
    };

    // Map TenderType to tenderTypeId
    const tenderTypeId = formValue.TenderType ? toNumberOrNull(formValue.TenderType) : null;

    // Helper function to ensure string
    const ensureString = (value: any): string => {
      if (value === null || value === undefined) return '';
      return String(value);
    };

    // Create base object with required fields and default values
    const baseForm: SaveForm20 = {
      id: this.formId || 0,
      title: formValue.projectTitle,
      businessUnitCode: formValue.businessUnit,
      status: 'Draft',
      maintenanceDefectId: this.ensureNumber(formValue.maintenanceType),
      periodUnit: formValue.contractPeriodUnit,
      period: toNumberOrNull(formValue.contractPeriodValue),
      periodDetail: formValue.ComplexContractPeriod || '',
      isMarkingScheme: formValue.TenderMarketScheme || '',
      splitValueId: this.ensureNumber(formValue.FinancialTechnicalSplitValue),
      bidTypeId: this.ensureNumber(formValue.BidType),
      jvSplit: ensureString(formValue.JvSplit),
      jvPartner: ensureString(formValue.JvPartner),
      jvAgreementId: this.ensureNumber(formValue.JvAgreement),
      planner: ensureString(formValue.Planner),
      location: ensureString(formValue.Location),
      tenderNo: ensureString(formValue.tenderNo),
      estimator: ensureString(formValue.Estimator),
      bidManager: ensureString(formValue.BidManager),
      clientName: ensureString(formValue.clientName),
      description: ensureString(formValue.BriefDescription),
      approximateValueRemark: formValue.ApproximateValue || '',
      form30Id: formValue.form30Id,
      maintenanceDefectPeriod: toNumberOrNull(formValue.maintenanceValue),
      maintenanceDefectUnit: ensureString(formValue.maintenanceStatus1),
      // Nullable numeric fields
      approximateValue: approximateVal, // Send validated decimal value
      profitMargin: formValue.Approxmargin ? formValue.Approxmargin : null,
      currencyId: formValue.ApproximateValueType ? formValue.ApproximateValueType : null,
      tenderTypeId: tenderTypeId,
      countryId: formValue.Region ? formValue.Region : null,
      clientFinanceStanding: formValue.FinantialStanding ? formValue.FinantialStanding : null,
      dueDate: formValue.dueDate
        ? (() => {
            const d = new Date(formValue.dueDate);
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}T00:00:00`;
          })()
        : '',

      // Contract fields with default values (will be overridden in if block if contract exists)
      contractTypeId: null,
      contractFormRiskCode: '',
      contractFormDescription: '',
      contractDamageRateRemark: '',
      contractLiabilityLimit: '',
      contractDamageRiskCode: '',
      contractMeasurementId: null,
      contractMeasurementRiskCode: '',
      contractFluctuationId: null,
      contractFluctuationRiskCode: '',
      contractIsAdversePhyiscal: '',
      contractIsTimeExtension: '',
      contractIsTimeExtensionValue: '',
      contractClausesRiskCode: '',
      contractUnusualConditions: '',
      contractUnusualRiskCode: '',
      contractDesignResponsibility: '',
      contractDesignRiskCode: '',
      contractBIMRequired: '',
      contractBIMRiskCode: '',
      contractDFMARequired: '',
      contractDFMARiskCode: '',

      /* Page 3  payment value */
      paymentCertificationPeriod: null,
      paymentRetentionAmount: null,
      paymentRetentionRiskCode: '',
      paymentPeriod: null,
      paymentPeriodUnit: '',
      paymentMaxExposure: null,
      paymentMaxExposureMonth: null,
      paymentPeakDeficit: null,
      paymentPeakSurplus: null,
      paymentAverageDeficit: null,
      paymentAverageSurplus: null,
      paymentCashRiskCode: '',
      paymentRetentionLimit: '',
      paymentRetentionAmountPercent: '',

      /* page 4*/
      bondTenderValue: null,
      bondTenderCallBasis: '',
      bondTenderExpiryDate: '',
      bondTenderPercentage: '',
      bondTenderRemark: '',
      bondTenderRiskCode: '',

      bondPerformanceValue: null,
      bondPerformanceCallBasis: '',
      bondPerformanceExpiryDate: '',
      bondPerformancePercentage: '',
      bondPerformanceRemark: '',
      bondPerformanceRiskCode: '',

      bondPaymentValue: null,
      bondPaymentCallBasis: '',
      bondPaymentExpiryDate: '',
      bondPaymentPercentage: '',
      bondPaymentRemark: '',
      bondPaymentRiskCode: '',

      bondRetentionValue: null,
      bondRetentionCallBasis: '',
      bondRetentionExpiryDate: '',
      bondRetentionPercentage: '',
      bondRetentionRemark: '',
      bondRetentionRiskCode: '',

      bondMaintenanceValue: null,
      bondMaintenanceCallBasis: '',
      bondMaintenanceExpiryDate: '',
      bondMaintenancePercentage: '',
      bondMaintenanceRemark: '',
      bondMaintenanceRiskCode: '',

      bondOtherValue: null,
      bondOtherCallBasis: '',
      bondOtherExpiryDate: '',
      bondOtherPercentage: '',
      bondOtherRemark: '',
      bondOtherRiskCode: '',
      bondOtherName: '',

      /* page 5 Warranties*/
      warrantGuranteeIsParentCompanyGuarantee: '',
      warrantGuranteeParentCompanyGuarantee: '',
      warrantGuranteeParentCompanyGuaranteeRiskCode: '',

      warrantGuranteeIsParentCompanyUnderTaking: '',
      warrantGuranteeParentCompanyUnderTaking: '',
      warrantGuranteeParentCompanyUnderTakingRiskCode: '',

      warrantGuranteeIsCollateralWarranties: '',
      warrantGuranteeCollateralWarranties: '',
      warrantGuranteeCollateralWarrantiesRiskCode: '',

      warrantGuranteeIsOtherLiabilities: '',
      warrantGuranteeOtherLiabilities: '',
      warrantGuranteeOtherLiabilitiesRiskCode: '',

      /* 6th insurance page*/
      insuranceIsProvidedByEmployer: '',
      insuranceProvidedByEmployer: '',
      insuranceProvidedByEmployerRiskCode: '',
      insuranceThirdPartyAmount: null,
      insuranceThirdPartyRiskCode: '',
      insuranceIsOnerousRequirement: '',
      insuranceOnerousRequirement: '',
      insuranceOnerousRequirementRiskCode: '',
      insuranceIsShortFallInCover: '',
      insuranceShortFallInCover: '',
      insuranceShortFallInCoverRiskCode: '',

      /* 7th other issues page*/
      otherPlantInvestmentRequirement: '',
      otherPlantInvestmnetRequirementRiskCode: '',
      otherIsPFIPPP: '',
      otherPFIPPPRiskCode: '',
      otherFinancingRequired: '',
      otherFinancingRequiredRiskCode: '',
      otherForeignCurrency: '',
      otherForeignCurrencyRiskCode: '',

      /*8th consultant */
      consultantCivilStructure: '',
      consultantCivilStructureRiskCode: '',
      consultantArchitect: '',
      consultantArchitectRiskCode: '',
      consultantEM: '',
      consultantEMRiskCode: '',
      consultantQuantitySurveyor: '',
      consultantQuantitySurveyorRiskCode: '',
      consultantOthers: '',
      consultantOthersRiskCode: '',
      competitor: '',

      /*9th evaluation page*/
      evaluationIsContractCondition: '',
      evaluationContractCondition: '',

      evaluationIsBondGuarantee: '',
      evaluationBondGuarantee: '',

      evaluationIsPlantEquipmentRequired: '',
      evaluationPlantEquipmentRequired: '',

      evaluationIsCompanyWorkload: '',
      evaluationCompanyWorkload: '',

      evaluationIsConsultantRecord: '',
      evaluationConsultantRecord: '',

      evaluationIsCompetition: '',
      evaluationCompetition: '',

      evaluationIsPaymentTerm: '',
      evaluationPaymentTerm: '',

      evaluationIsValueExtendContract: '',
      evaluationValueExtendContract: '',

      evaluationIsSiteManagement: '',
      evaluationSiteManagement: '',

      evaluationIsTimeAllowed: '',
      evaluationTimeAllowed: '',

      evaluationIsHealthSafetyEnvironment: '',
      evaluationHealthSafetyEnvironment: '',

      evaluationComments: '',

      /* 10th Distribution page*/
      distributionCE: [],
      distributionDivComM: [],
      distributionComDir: [],
      distributionExeDir: [],
      distributionFinDir: [],
      distributionDir: [],
      distributionGenC: [],
      distributionInsMgr: [],
      distributionProc: [],
      distributionRiskOpp: [],
      distributionLambeth: [],
      distributionHSEQ: [],
      distributionBidMgr: [],

      // Approval arrays normalized for Comments/Decision only
      ceApproval: (formValue.ceApproval || []).map((obj: any) => ({
        ...obj,
        comments: obj?.comments ?? obj.comments ?? '',
        decision: obj.decision ?? obj.decision ?? '',
        id: obj.Id ?? obj.id ?? null,
      })),
      cmApproval: (formValue.cmApproval || []).map((obj: any) => ({
        ...obj,
        comments: obj?.comments ?? obj.comments ?? '',
        decision: obj.decision ?? obj.decision ?? '',
        id: obj.Id ?? obj.id ?? null,
      })),
      edApproval: (formValue.edApproval || []).map((obj: any) => ({
        ...obj,
        comments: obj?.comments ?? obj.comments ?? '',
        decision: obj.decision ?? obj.decision ?? '',
        id: obj.Id ?? obj.id ?? null,
      })),
      dirApproval: (formValue.dirApproval || []).map((obj: any) => ({
        ...obj,
        comments: obj?.comments ?? obj.comments ?? '',
        decision: obj.decision ?? obj.decision ?? '',
        id: obj.Id ?? obj.id ?? null,
      })),
      hoEApproval: (formValue.hoEApproval || []).map((obj: any) => ({
        ...obj,
        comments: obj?.comments ?? obj.comments ?? '',
        decision: obj.decision ?? obj.decision ?? '',
        id: obj.Id ?? obj.id ?? null,
      })),

      competitorRiskCode: '',
      paymentPeriodRiskCode: '',

      contractDamageRateUnit: '',
      paymentCertificationRiskCode: '',
      paymentRetentionAmountRemark: '',
      paymentRetentionLimitRiskCode: '',
      paymentCertificationPeriodUnit: '',
      paymentCertificationPeriodRemark: '',

      evaluationCashFlow: '',
      evaluationIsCashFlow: '',
      evaluationClientFinancialStatus: '',
      evaluationIsClientFinancialStatus: '',
      evaluationEstimatingDepartmentWorkload: '',
      evaluationIsEstimatingDepartmentWorkload: '',
    };

    // Apply any contract form group values
    if (formValue.contract) {
      Object.assign(baseForm, {
        contractTypeId: toNumberOrNull(formValue.contract.Type),
        contractFormRiskCode: ensureString(formValue.contract?.DegreeRiskTypeContract),
        contractFormDescription: formValue.contract.Description,
        contractDamageRateRemark: formValue.contract.RateOfDamages,
        contractLiabilityLimit: formValue.contract.LimitOfLiability,
        contractDamageRiskCode: formValue.contract.DegreeRiskDamage,
        contractMeasurementId: toNumberOrNull(formValue.contract.MeasurementDetails),
        contractMeasurementRiskCode: formValue.contract.DegreeRiskMeasurement,
        contractFluctuationId: toNumberOrNull(formValue.contract.Fluctuations),
        contractFluctuationRiskCode: formValue.contract.DegreeRiskfluctuation,
        contractIsAdversePhyiscal: formValue.contract.Adverse,
        contractIsTimeExtension: formValue.contract.TimeExtension,
        contractIsTimeExtensionValue: formValue.contract.WeatherExtention,
        contractClausesRiskCode: formValue.contract.DegreeRiskWeather,
        contractUnusualConditions: formValue.contract.OtherUnusualConditions,
        contractUnusualRiskCode: formValue.contract.DegreeRiskTypeUnusual,
        contractDesignResponsibility: formValue.contract.DesignResponsibility,
        contractDesignRiskCode: formValue.contract.DegreeRiskTypeDesign,
        contractBIMRequired: formValue.contract.BIMRequired,
        contractBIMRiskCode: formValue.contract.DegreeRiskTypeBIM,
        contractDFMARequired: formValue.contract.DFMARequired,
        contractDFMARiskCode: formValue.contract.DegreeRiskTypeDFMA,
        contractDamageRate: toNumberOrNull(formValue.contract.RateOfDamages),
      });
    }

    // Apply any payment form group values
    if (formValue.payment) {
      Object.assign(baseForm, {
        paymentCertificationPeriod: toNumberOrNull(formValue.payment.Period),
        paymentCertificationPeriodUnit: ensureString(formValue.payment.Months),
        paymentCertificationRiskCode: ensureString(formValue.payment.DegreeRiskType),
        paymentCertificationPeriodRemark: ensureString(formValue.payment.Remarks2),
        paymentRetentionAmount: toNumberOrNull(formValue.payment.Retention),
        paymentRetentionAmountPercent: ensureString(formValue.payment.Percent),
        paymentRetentionRiskCode: ensureString(formValue.payment.DegreeRiskType2),
        paymentRetentionAmountRemark: ensureString(formValue.payment.Remarks),
        paymentPeriod: toNumberOrNull(formValue.payment.PaymentPeriod),
        paymentPeriodUnit: ensureString(formValue.payment.Months2),
        paymentPeriodRiskCode: ensureString(formValue.payment.DegreeRiskType3),
        paymentRetentionLimit: ensureString(formValue.payment.LimitofRetention),
        paymentRetentionLimitRiskCode: ensureString(formValue.payment.LimitofRetentionselect),
        paymentMaxExposure: toNumberOrNull(formValue.payment.MaxExposureAmount),
        paymentMaxExposureMonth: toNumberOrNull(formValue.payment.MaxExposureMonths),
        paymentPeakDeficit: toNumberOrNull(formValue.payment.PeakDeficit),
        paymentPeakSurplus: toNumberOrNull(formValue.payment.PeakSurplus),
        paymentAverageDeficit: toNumberOrNull(formValue.payment.AverageDeficit),
        paymentAverageSurplus: toNumberOrNull(formValue.payment.AverageSurplus),
        paymentCashRiskCode: ensureString(formValue.payment.RiskLevel),
      });
    }

    // Apply any Bonds form group values
    if (formValue.Bonds) {
      Object.assign(baseForm, {
        bondTenderValue: toNumberOrNull(formValue.Bonds.TenderValue),
        bondTenderPercentage: ensureString(formValue.Bonds.tenderUnit),
        bondTenderCallBasis: ensureString(formValue.Bonds.TenderCallBasis),
        bondTenderExpiryDate: ensureString(formValue.Bonds.TenderExpiry),
        bondTenderRemark: ensureString(formValue.Bonds.TenderRemark),
        bondTenderRiskCode: ensureString(formValue.Bonds.TenderRisk),

        bondPerformanceValue: toNumberOrNull(formValue.Bonds.PerformanceValue),
        bondPerformancePercentage: ensureString(formValue.Bonds.performanceUnit),
        bondPerformanceCallBasis: ensureString(formValue.Bonds.PerformanceCallBasis),
        bondPerformanceExpiryDate: ensureString(formValue.Bonds.PerformanceExpiry),
        bondPerformanceRemark: ensureString(formValue.Bonds.PerformanceRemark),
        bondPerformanceRiskCode: ensureString(formValue.Bonds.degreeRisk2),

        bondPaymentValue: toNumberOrNull(formValue.Bonds.AdvanceValue),
        bondPaymentPercentage: ensureString(formValue.Bonds.advanceUnit),
        bondPaymentCallBasis: ensureString(formValue.Bonds.AdvanceCallBasis),
        bondPaymentExpiryDate: ensureString(formValue.Bonds.AdvanceExpiry),
        bondPaymentRemark: ensureString(formValue.Bonds.AdvanceRemark),
        bondPaymentRiskCode: ensureString(formValue.Bonds.AdvanceRisk),

        bondRetentionValue: toNumberOrNull(formValue.Bonds.RetentionValue),
        bondRetentionPercentage: ensureString(formValue.Bonds.retentionUnit),
        bondRetentionCallBasis: ensureString(formValue.Bonds.RetentionCallBasis),
        bondRetentionExpiryDate: ensureString(formValue.Bonds.RetentionExpiry),
        bondRetentionRemark: ensureString(formValue.Bonds.RetentionRemark),
        bondRetentionRiskCode: ensureString(formValue.Bonds.RetentionRisk),

        bondMaintenanceValue: toNumberOrNull(formValue.Bonds.MaintenanceValue),
        bondMaintenancePercentage: ensureString(formValue.Bonds.maintenanceUnit),
        bondMaintenanceCallBasis: ensureString(formValue.Bonds.MaintenanceCallBasis),
        bondMaintenanceExpiryDate: ensureString(formValue.Bonds.MaintenanceExpiry),
        bondMaintenanceRemark: ensureString(formValue.Bonds.MaintenanceRemark),
        bondMaintenanceRiskCode: ensureString(formValue.Bonds.MaintenanceRisk),

        bondOtherValue: toNumberOrNull(formValue.Bonds.OtherValue),
        bondOtherPercentage: ensureString(formValue.Bonds.otherUnit),
        bondOtherCallBasis: ensureString(formValue.Bonds.OtherCallBasis),
        bondOtherExpiryDate: ensureString(formValue.Bonds.OtherExpiry),
        bondOtherRemark: ensureString(formValue.Bonds.OtherRemark),
        bondOtherRiskCode: ensureString(formValue.Bonds.OtherRisk),
        bondOtherName: ensureString(formValue.Bonds.OtherName),
      });
    }

    // Apply any Warranties form group values
    if (formValue.Warranties) {
      Object.assign(baseForm, {
        warrantGuranteeIsParentCompanyGuarantee: ensureString(
          formValue.Warranties.ParentCompanyGuarantee
        ),
        warrantGuranteeParentCompanyGuarantee: ensureString(
          formValue.Warranties.ParentCompanyDetails
        ),
        warrantGuranteeParentCompanyGuaranteeRiskCode: ensureString(
          formValue.Warranties.ParentCompanyRisk
        ),

        warrantGuranteeIsParentCompanyUnderTaking: ensureString(
          formValue.Warranties.ParentCompanyUndertaking
        ),
        warrantGuranteeParentCompanyUnderTaking: ensureString(
          formValue.Warranties.ParentCompanyUndertakingDetails
        ),
        warrantGuranteeParentCompanyUnderTakingRiskCode: ensureString(
          formValue.Warranties.ParentCompanyUndertakingRisk
        ),

        warrantGuranteeIsCollateralWarranties: ensureString(
          formValue.Warranties.CollateralWarranties
        ),
        warrantGuranteeCollateralWarranties: ensureString(
          formValue.Warranties.CollateralWarrantiesDetails
        ),
        warrantGuranteeCollateralWarrantiesRiskCode: ensureString(
          formValue.Warranties.CollateralWarrantiesRisk
        ),

        warrantGuranteeIsOtherLiabilities: ensureString(formValue.Warranties.OtherContingent),
        warrantGuranteeOtherLiabilities: ensureString(formValue.Warranties.OtherContingentDetails),
        warrantGuranteeOtherLiabilitiesRiskCode: ensureString(
          formValue.Warranties.OtherContingentRisk
        ),
      });
    }

    // Apply any Insurance form group values
    if (formValue.Insurance) {
      Object.assign(baseForm, {
        insuranceIsProvidedByEmployer: ensureString(formValue.Insurance.ProvidedByEmployer),
        insuranceProvidedByEmployer: ensureString(formValue.Insurance.ProvidedByEmployerDetails),
        insuranceProvidedByEmployerRiskCode: ensureString(
          formValue.Insurance.ProvidedByEmployerRisk
        ),

        insuranceThirdPartyAmount: toNumberOrNull(formValue.Insurance.ThirdPartyDetails),
        insuranceThirdPartyRiskCode: ensureString(formValue.Insurance.ThirdPartyRisk),

        insuranceIsOnerousRequirement: ensureString(formValue.Insurance.OnerousRequirements),
        insuranceOnerousRequirement: ensureString(formValue.Insurance.OnerousRequirementsDetails),
        insuranceOnerousRequirementRiskCode: ensureString(
          formValue.Insurance.OnerousRequirementsRisk
        ),

        insuranceIsShortFallInCover: ensureString(formValue.Insurance.ShortfallInCover),
        insuranceShortFallInCover: ensureString(formValue.Insurance.ShortfallInCoverDetails),
        insuranceShortFallInCoverRiskCode: ensureString(formValue.Insurance.ShortfallInCoverRisk),
      });
    }

    // Apply any OtherIssue form group values
    if (formValue.OtherIssue) {
      Object.assign(baseForm, {
        otherPlantInvestmentRequirement: ensureString(formValue.OtherIssue.NewPlantDetails),
        otherPlantInvestmnetRequirementRiskCode: ensureString(formValue.OtherIssue.NewPlantRisk),

        otherIsPFIPPP: ensureString(formValue.OtherIssue.PFIorPPPBid),
        otherPFIPPPRiskCode: ensureString(formValue.OtherIssue.pfiOrPPPBidRisk),

        otherFinancingRequired: ensureString(formValue.OtherIssue.FinancingRequired),
        otherFinancingRequiredRiskCode: ensureString(formValue.OtherIssue.FinancingRequiredRisk),

        otherForeignCurrency: ensureString(formValue.OtherIssue.ForeignCurrencyContentDetails),
        otherForeignCurrencyRiskCode: ensureString(formValue.OtherIssue.ForeignCurrencyContentRisk),
      });
    }

    if (formValue['Consultant & Competitor']) {
      Object.assign(baseForm, {
        consultantCivilStructure: ensureString(
          formValue['Consultant & Competitor'].CivilStructuralDetails
        ),
        consultantCivilStructureRiskCode: ensureString(
          formValue['Consultant & Competitor'].CivilStructuralRisk
        ),
        consultantArchitect: ensureString(formValue['Consultant & Competitor'].ArchitectDetails),
        consultantArchitectRiskCode: ensureString(
          formValue['Consultant & Competitor'].ArchitectRisk
        ),
        consultantEM: ensureString(formValue['Consultant & Competitor'].EMDetails),
        consultantEMRiskCode: ensureString(formValue['Consultant & Competitor'].EMRisk),
        consultantQuantitySurveyor: ensureString(
          formValue['Consultant & Competitor'].QuantitySurveyorDetails
        ),
        consultantQuantitySurveyorRiskCode: ensureString(
          formValue['Consultant & Competitor'].QuantitySurveyorRisk
        ),
        consultantOthers: ensureString(formValue['Consultant & Competitor'].OtherDetails),
        consultantOthersRiskCode: ensureString(formValue['Consultant & Competitor'].OtherRisk),
        competitor: ensureString(formValue['Consultant & Competitor'].competitorDetails),
      });
    }

    if (formValue.Evaluation) {
      Object.assign(baseForm, {
        evaluationIsContractCondition: ensureString(formValue.Evaluation.AcceptibilityRadio),
        evaluationContractCondition: ensureString(formValue.Evaluation.AcceptibilityRemark),

        evaluationIsBondGuarantee: ensureString(formValue.Evaluation.BondandGuaranteesRadio),
        evaluationBondGuarantee: ensureString(formValue.Evaluation.BondandGuaranteesRemark),

        evaluationIsPlantEquipmentRequired: ensureString(formValue.Evaluation.PlantEquipmentRadio),
        evaluationPlantEquipmentRequired: ensureString(formValue.Evaluation.PlantEquipmentRemark),

        evaluationIsCompanyWorkload: ensureString(formValue.Evaluation.CurrentWorkloadRadio),
        evaluationCompanyWorkload: ensureString(formValue.Evaluation.CurrentWorkloadRemark),

        evaluationIsConsultantRecord: ensureString(formValue.Evaluation.previousRecordRadio),
        evaluationConsultantRecord: ensureString(formValue.Evaluation.previousRecordRemark),

        evaluationIsCompetition: ensureString(formValue.Evaluation.CompetitionRadio),
        evaluationCompetition: ensureString(formValue.Evaluation.CompetitionRemark),

        evaluationIsPaymentTerm: ensureString(formValue.Evaluation.PaymentTermsRadio),
        evaluationPaymentTerm: ensureString(formValue.Evaluation.PaymentTermsRemark),

        evaluationIsValueExtendContract: ensureString(formValue.Evaluation.ContractValueRadio),
        evaluationValueExtendContract: ensureString(formValue.Evaluation.ContractValueRemark),

        evaluationIsSiteManagement: ensureString(formValue.Evaluation.SiteManagementRadio),
        evaluationSiteManagement: ensureString(formValue.Evaluation.SiteManagementRemark),

        evaluationIsTimeAllowed: ensureString(formValue.Evaluation.TimeAllowedRadio),
        evaluationTimeAllowed: ensureString(formValue.Evaluation.TimeAllowedRemark),

        evaluationIsHealthSafetyEnvironment: ensureString(
          formValue.Evaluation.HealthSafetyEnvironmentRadio
        ),
        evaluationHealthSafetyEnvironment: ensureString(
          formValue.Evaluation.HealthSafetyEnvironmentRemark
        ),

        evaluationComments: ensureString(formValue.Evaluation.EvaluationComments),
      });
    }

    if (formValue.Distribution) {
      Object.assign(baseForm, {
        distributionCE: formValue.Distribution.ChiefExecutive || [],
        distributionExeDir: formValue.Distribution.ExecutiveDirector || [],
        distributionDir: formValue.Distribution.Director || [],
        distributionBidMgr: formValue.Distribution.BidManager || [],
        distributionFinDir: formValue.Distribution.FinanceDirector || [],
        distributionComDir: formValue.Distribution.CommercialDirector || [],
        distributionGenC: formValue.Distribution.GeneralCounselLegal || [],
        distributionDivComM: formValue.Distribution.DivisionCommercialManager || [],
        distributionInsMgr: formValue.Distribution.InsuranceManager || [],
        distributionLambeth: formValue.Distribution.HeadofLambeth || [],
        distributionProc: formValue.Distribution.HeadOfProcurement || [],
        distributionRiskOpp: formValue.Distribution.RiskOpportunityManager || [],
        distributionHSEQ: formValue.Distribution.HSEQ || [],
      });
    }

    return baseForm;
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
