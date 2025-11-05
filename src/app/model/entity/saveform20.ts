export interface SaveForm20 {
  id: number;
  
  businessUnitId: number | null;
  approximateValue: number | null;
  profitMargin: number | null;
  periodUnit: string;
  period: number | null;
  periodDetail: string;
  
  
  maintenanceDefectId: number | null;
  ContractPeriod: string;
  title: string;

  currencyId: number | null;
  tenderTypeId: number | null;
  clientFinanceStanding: string | null;
  splitValueId: number | null;
  countryId: number | null;
  bidTypeId: number | null;
  JvSplit: string;
  JvPartner: string;
  jvAgreementId: number | null;
  distributionComDir: string[];
  distributionDivComM: string[];
  distributionExeDir: string[];
  distributionFinDir: string[];
  distributionCE: string[];
  distributionDir: string[];
  distributionGenC: string[];
  distributionInsMgr: string[];
  distributionProc: string[];
  distributionRiskOpp: string[];
  distributionLambeth: string[];
  distributionHSEQ: string[];
  businessUnitCode: string;
  distributionBidMgr: string[];
  Status: string;

  //page 2 
  contractTypeId : number | null;
  contractFormRiskCode: string;
  contractFormDescription: string;
  contractDamageRateRemark: string;
  contractLiabilityLimit: string;
  contractDamageRiskCode: string;
  contractMeasurementId : number | null;
  contractMeasurementRiskCode : string;
  contractFluctuationId : number | null;
  contractFluctuationRiskCode : string;
  contractIsAdversePhyiscal : string;
  contractIsTimeExtension: string;
  contractIsTimeExtensionValue: string;
  contractClausesRiskCode: string;
  contractUnusualConditions : string;
  contractUnusualRiskCode: string;
  contractDesignResponsibility: string;
  
  contractBIMRequired: string;
  contractBIMRiskCode: string;
  contractDFMARequired: string;
  contractDFMARiskCode: string;

  /* page 3*/
  maintenanceDefectPeriod: number | null;
  maintenanceDefectUnit: string;
  paymentCertificationPeriod: number | null;
  paymentCertificationPeriodRemark: string;
  paymentCertificationRiskCode: string;
  paymentRetentionAmount: number | null;
  paymentRetentionAmountPercent: string;
  paymentRetentionAmountRemark: string;
  paymentRetentionRiskCode: string;
  paymentPeriod: number | null;
  paymentPeriodUnit: string;
  contractDesignRiskCode: string;
  paymentRetentionLimitRiskCode: string;
  paymentMaxExposure:number | null;
  paymentMaxExposureMonth:number | null;
  paymentPeakDeficit:number | null;
  paymentPeakSurplus:number | null;
  paymentAverageDeficit:number | null;
  paymentAverageSurplus:number | null;
  paymentCashRiskCode: string;
  paymentRetentionLimit: string;

  /* 4th Bond*/
  bondTenderValue: number | null;
  bondTenderCallBasis: string;
  bondTenderExpiryDate: string;
  bondTenderPercentage: string;
  bondTenderRemark: string;
  bondTenderRiskCode: string;

  bondPerformanceValue: number | null;
  bondPerformanceCallBasis: string;
  bondPerformanceExpiryDate: string;
  bondPerformancePercentage: string;
  bondPerformanceRemark: string;
  bondPerformanceRiskCode: string;

  bondPaymentValue  : number | null;
  bondPaymentCallBasis: string;
  bondPaymentExpiryDate: string;
  bondPaymentPercentage: string;
  bondPaymentRemark: string;
  bondPaymentRiskCode: string;

  bondRetentionValue : number | null;
  bondRetentionCallBasis: string;
  bondRetentionExpiryDate: string;
  bondRetentionPercentage: string;
  bondRetentionRemark: string;
  bondRetentionRiskCode: string;

  bondMaintenanceValue: number | null;
  bondMaintenanceCallBasis: string;
  bondMaintenanceExpiryDate: string;
  bondMaintenancePercentage: string;
  bondMaintenanceRemark: string;
  bondMaintenanceRiskCode: string;

  bondOtherValue: number | null;
  bondOtherCallBasis: string;
  bondOtherExpiryDate: string;
  bondOtherPercentage: string;
  bondOtherRemark: string;
  bondOtherRiskCode: string;
  bondOtherName: string;

  /*warrenty 5th*/
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
  
  /* 6th insurance*/
  


  Planner: string;
  Location: string;
  TenderNo: string;
  Estimator: string;

  BidManager: string;
  clientName: string;
  Competitor: string;
  Description: string;
  ConsultantEM: string;
  
  OtherIsPFIPPP: string;
  isMarkingScheme: string;
 
  ConsultantOthers: string;
 
  
 
  
  CompetitorRiskCode: string;
  EvaluationCashFlow: string;
  EvaluationComments: string;
  ConsultantArchitect: string;
 
  OtherPFIPPPRiskCode: string;
 
  ConsultantEMRiskCode: string;
  
  EvaluationIsCashFlow: string;
  OtherForeignCurrency: string;
  
  EvaluationCompetition: string;
  EvaluationPaymentTerm: string;
  EvaluationTimeAllowed: string;
  PaymentPeriodRiskCode: string;
  approximateValueRemark: string;
 
  ContractDamageRateUnit: string;
  
  
  OtherFinancingRequired: string;
  
 
  EvaluationBondGuarantee: string;
  EvaluationIsCompetition: string;
  EvaluationIsPaymentTerm: string;
  EvaluationIsTimeAllowed: string;
 
  ConsultantCivilStructure: string;
  ConsultantOthersRiskCode: string;
  
  EvaluationSiteManagement: string;
  
 
  EvaluationCompanyWorkload: string;
  EvaluationIsBondGuarantee: string;
  InsuranceShortFallInCover: string;
  ConsultantQuantitySurveyor: string;
  EvaluationConsultantRecord: string;
  EvaluationIsSiteManagement: string;
  ConsultantArchitectRiskCode: string;
  EvaluationContractCondition: string;
  EvaluationIsCompanyWorkload: string;
  InsuranceIsShortFallInCover: string;
  InsuranceOnerousRequirement: string;
  InsuranceProvidedByEmployer: string;
  InsuranceThirdPartyRiskCode: string;
  OtherForeignCurrencyRiskCode: string;
  
  
  EvaluationIsContractCondition: string;
  EvaluationValueExtendContract: string;
  InsuranceIsOnerousRequirement: string;
  InsuranceIsProvidedByEmployer: string;
  
  OtherFinancingRequiredRiskCode: string;
  PaymentCertificationPeriodUnit: string;
  EvaluationClientFinancialStatus: string;
  EvaluationIsValueExtendContract: string;
  OtherPlantInvestmentRequirement: string;
 
  ConsultantCivilStructureRiskCode: string;
  EvaluationPlantEquipmentRequired: string;
  
  EvaluationHealthSafetyEnvironment: string;
  EvaluationIsClientFinancialStatus: string;
  InsuranceShortFallInCoverRiskCode: string;
 
  ConsultantQuantitySurveyorRiskCode: string;
  EvaluationIsPlantEquipmentRequired: string;
  EvaluationIsHealthSafetyEnvironment: string;
  InsuranceOnerousRequirementRiskCode: string;
  InsuranceProvidedByEmployerRiskCode: string;
 
  EvaluationEstimatingDepartmentWorkload: string;
  OtherPlantInvestmnetRequirementRiskCode: string;
 
  EvaluationIsEstimatingDepartmentWorkload: string;
  EvaluationIsConsultantRecord: string;
  
  CEApproval: ApprovalInfo[];
  CMApproval: ApprovalInfo[];
  EDApproval: ApprovalInfo[];
  DirApproval: ApprovalInfo[];
  HoEApproval: ApprovalInfo[];
}

interface ApprovalInfo {
  Title: string;
  Comments: string;
  Decision: string;
  StaffNo: string;
  ApproverName: string;
}
