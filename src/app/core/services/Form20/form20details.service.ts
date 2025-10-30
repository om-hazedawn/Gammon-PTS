import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { SaveForm20 } from "../../../model/entity/saveform20";

export interface Approval {
  id: number;
  staffNo: string;
  approverName: string;
  title: string;
  decision: string;
  comments: string;
  approvalDate: string; // ISO Date string
}

export interface Form20Details {
  id: number;
  status: string;
  tenderNo: string;
  title: string;
  estimator: string;
  planner: string;
  bidManager: string;
  businessUnitCode: string;
  dueDate: string;
  countryId: number;
  location: string;
  description: string;
  clientName: string;
  clientFinanceStanding: number;
  currencyId: number;
  approximateValue: number;
  approximateValueRemark: string;
  tenderTypeId: number;
  period: number;
  periodUnit: string;
  periodDetail: string;
  maintenanceDefectId: number;
  maintenanceDefectPeriod: number;
  maintenanceDefectUnit: string;
  isMarkingScheme: string;
  splitValueId: number;
  bidTypeId: number;
  jvPartner: string;
  jvSplit: string;
  jvAgreementId: number;
  form30Id: number;
  profitMargin: number;
  bondTenderValue: number;
  bondTenderPercentage: string;
  bondTenderRemark: string;
  bondTenderCallBasis: string;
  bondTenderExpiryDate: string;
  bondTenderRiskCode: string;
  bondPerformanceValue: number;
  bondPerformancePercentage: string;
  bondPerformanceRemark: string;
  bondPerformanceCallBasis: string;
  bondPerformanceExpiryDate: string;
  bondPerformanceRiskCode: string;
  bondPaymentValue: number;
  bondPaymentPercentage: string;
  bondPaymentRemark: string;
  bondPaymentCallBasis: string;
  bondPaymentExpiryDate: string;
  bondPaymentRiskCode: string;
  bondRetentionValue: number;
  bondRetentionPercentage: string;
  bondRetentionRemark: string;
  bondRetentionCallBasis: string;
  bondRetentionExpiryDate: string;
  bondRetentionRiskCode: string;
  bondMaintenanceValue: number;
  bondMaintenancePercentage: string;
  bondMaintenanceRemark: string;
  bondMaintenanceCallBasis: string;
  bondMaintenanceExpiryDate: string;
  bondMaintenanceRiskCode: string;
  bondOtherName: string;
  bondOtherValue: number;
  bondOtherPercentage: string;
  bondOtherRemark: string;
  bondOtherCallBasis: string;
  bondOtherExpiryDate: string;
  bondOtherRiskCode: string;
  competitor: string;
  competitorRiskCode: string;
  consultantCivilStructure: string;
  consultantCivilStructureRiskCode: string;
  consultantArchitect: string;
  consultantArchitectRiskCode: string;
  consultantEM: string;
  consultantEMRiskCode: string;
  consultantQuantitySurveyor: string;
  consultantQuantitySurveyorRiskCode: string;
  consultantOthers: string;
  consultantOthersRiskCode: string;
  contractTypeId: number;
  contractFormDescription: string;
  contractFormRiskCode: string;
  contractMeasurementId: number;
  contractMeasurementRiskCode: string;
  contractFluctuationId: number;
  contractFluctuationRiskCode: string;
  contractIsAdversePhyiscal: string;
  contractIsTimeExtension: string;
  contractIsTimeExtensionValue: string;
  contractClausesRiskCode: string;
  contractUnusualConditions: string;
  contractUnusualRiskCode: string;
  contractDesignResponsibility: string;
  contractDesignRiskCode: string;
  contractDamageRate: number;
  contractDamageRateUnit: string;
  contractDamageRateRemark: string;
  contractLiabilityLimit: string;
  contractDamageRiskCode: string;
  contractDFMARequired: string;
  contractDFMARiskCode: string;
  contractBIMRequired: string;
  contractBIMRiskCode: string;
  evaluationIsContractCondition: string;
  evaluationContractCondition: string;
  evaluationIsPaymentTerm: string;
  evaluationPaymentTerm: string;
  evaluationIsCashFlow: string;
  evaluationCashFlow: string;
  evaluationIsClientFinancialStatus: string;
  evaluationClientFinancialStatus: string;
  evaluationIsValueExtendContract: string;
  evaluationValueExtendContract: string;
  evaluationIsPlantEquipmentRequired: string;
  evaluationPlantEquipmentRequired: string;
  evaluationIsSiteManagement: string;
  evaluationSiteManagement: string;
  evaluationIsCompanyWorkload: string;
  evaluationCompanyWorkload: string;
  evaluationIsTimeAllowed: string;
  evaluationTimeAllowed: string;
  evaluationIsEstimatingDepartmentWorkload: string;
  evaluationEstimatingDepartmentWorkload: string;
  evaluationIsConsultantRecord: string;
  evaluationConsultantRecord: string;
  evaluationIsHealthSafetyEnvironment: string;
  evaluationHealthSafetyEnvironment: string;
  evaluationIsCompetition: string;
  evaluationCompetition: string;
  evaluationComments: string;
  insuranceIsProvidedByEmployer: string;
  insuranceProvidedByEmployer: string;
  insuranceProvidedByEmployerRiskCode: string;
  insuranceThirdPartyAmount: number;
  insuranceThirdPartyRiskCode: string;
  insuranceIsOnerousRequirement: string;
  insuranceOnerousRequirement: string;
  insuranceOnerousRequirementRiskCode: string;
  insuranceIsShortFallInCover: string;
  insuranceShortFallInCover: string;
  insuranceShortFallInCoverRiskCode: string;
  otherPlantInvestmentRequirement: string;
  otherPlantInvestmnetRequirementRiskCode: string;
  otherIsPFIPPP: string;
  otherPFIPPPRiskCode: string;
  otherFinancingRequired: string;
  otherFinancingRequiredRiskCode: string;
  otherForeignCurrency: string;
  otherForeignCurrencyRiskCode: string;
  paymentCertificationPeriod: number;
  paymentCertificationPeriodUnit: string;
  paymentCertificationPeriodRemark: string;
  paymentCertificationRiskCode: string;
  paymentPeriod: number;
  paymentPeriodRiskCode: string;
  paymentPeriodUnit: string;
  paymentRetentionAmount: number;
  paymentRetentionAmountRemark: string;
  paymentRetentionRiskCode: string;
  paymentRetentionLimit: string;
  paymentRetentionLimitRiskCode: string;
  paymentMaxExposure: number;
  paymentMaxExposureMonth: number;
  paymentPeakDeficit: number;
  paymentPeakSurplus: number;
  paymentAverageDeficit: number;
  paymentAverageSurplus: number;
  paymentCashRiskCode: string;
  paymentRetentionAmountPercent: string;
  warrantGuranteeIsParentCompanyGuarantee: string;
  warrantGuranteeParentCompanyGuarantee: string;
  warrantGuranteeParentCompanyGuaranteeRiskCode: string;
  warrantGuranteeIsParentCompanyUnderTaking: string;
  warrantGuranteeParentCompanyUnderTaking: string;
  warrantGuranteeParentCompanyUnderTakingRiskCode: string;
  warrantGuranteeIsCollateralWarranties: string;
  warrantGuranteeCollateralWarranties: string;
  warrantGuranteeCollateralWarrantiesRiskCode: string;
  warrantGuranteeIsOtherLiabilities: string;
  warrantGuranteeOtherLiabilities: string;
  warrantGuranteeOtherLiabilitiesRiskCode: string;
  evaluationIsBondGuarantee: string;
  evaluationBondGuarantee: string;

  distributionCE: string[];
  distributionExeDir: string[];
  distributionDir: string[];
  distributionBidMgr: string[];
  distributionFinDir: string[];
  distributionComDir: string[];
  distributionGenC: string[];
  distributionDivComM: string[];
  distributionInsMgr: string[];
  distributionLambeth: string[];
  distributionProc: string[];
  distributionRiskOpp: string[];
  distributionHSEQ: string[];

  hoEApproval: Approval[];
  cmApproval: Approval[];
  dirApproval: Approval[];
  edApproval: Approval[];
  ceApproval: Approval[];
}

export class UpdateForm20IdRequest {
  form20Id: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class Form20DetailsService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "/api/pts20/Form20";
  }

  getForm20Details(formId: number): Observable<Form20Details> {
    const url = `${this.baseUrl}/obtainForm`;
    return this.http.post<Form20Details>(url, formId).pipe(
      catchError(error => {
        console.error('Error fetching Form20 Details:', error);
        throw error;
      })
    );
  }

  saveForm20(formData: SaveForm20): Observable<Form20Details> {
    const url = `${this.baseUrl}/saveForm`;

    return this.http.post<Form20Details>(url, formData).pipe(
      catchError(error => {
        console.error('Error saving Form20:', error);
        throw error;
      })
    );
  }

  updateForm20Id(tenderId: number, form20Id: number): Observable<any> {
    const request: UpdateForm20IdRequest = {
      form20Id
    };

    const relative = `../api/ptsrisk/Tender/api/tender/${tenderId}/form20Id`;
    const url = new URL(relative, window.location.href).toString(); // Translate to final URL
    return this.http.put<any>(
      url,
      request
    );
  }
}