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
  insuranceIsProvidedByEmployer: string;
  insuranceProvidedByEmployer: string;
  insuranceProvidedByEmployerRiskCode: string;
  insuranceThirdPartyAmount : number | null;
  insuranceThirdPartyRiskCode: string;
  insuranceIsOnerousRequirement: string;
  insuranceOnerousRequirement: string;
  insuranceOnerousRequirementRiskCode: string;
  insuranceIsShortFallInCover:string;
  insuranceShortFallInCover: string;
  insuranceShortFallInCoverRiskCode: string;

  /* 7th other*/
  otherPlantInvestmentRequirement: string;
  otherPlantInvestmnetRequirementRiskCode: string;
  otherIsPFIPPP: string;
  otherPFIPPPRiskCode: string;
  otherFinancingRequired: string;
  otherFinancingRequiredRiskCode: string;
  otherForeignCurrency: string;
  otherForeignCurrencyRiskCode: string;

  /*8th  consultant */
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
  competitor: string;

  /*9th evaluation */
  EvaluationCashFlow: string;
  EvaluationComments: string;
  EvaluationIsCashFlow: string;
  EvaluationCompetition: string;
  EvaluationPaymentTerm: string;
  EvaluationTimeAllowed: string;
  EvaluationBondGuarantee: string;
  EvaluationIsCompetition: string;
  EvaluationIsPaymentTerm: string;
  EvaluationIsTimeAllowed: string; 
  EvaluationSiteManagement: string;
  EvaluationCompanyWorkload: string;
  EvaluationIsBondGuarantee: string;
  EvaluationConsultantRecord: string;
  EvaluationIsSiteManagement: string;
  EvaluationContractCondition: string;
  EvaluationIsCompanyWorkload: string;
  EvaluationIsContractCondition: string;
  EvaluationValueExtendContract: string;
  EvaluationClientFinancialStatus: string;
  EvaluationIsValueExtendContract: string;
  EvaluationPlantEquipmentRequired: string;
  EvaluationHealthSafetyEnvironment: string;
  EvaluationIsClientFinancialStatus: string;
  EvaluationIsPlantEquipmentRequired: string;
  EvaluationIsHealthSafetyEnvironment: string;
  EvaluationEstimatingDepartmentWorkload: string;
  EvaluationIsEstimatingDepartmentWorkload: string;
  EvaluationIsConsultantRecord: string;
  

  Planner: string;
  Location: string;
  TenderNo: string;
  Estimator: string;

  BidManager: string;
  clientName: string;
  Description: string;
  
  
  isMarkingScheme: string;
 
 
  PaymentCertificationPeriodUnit: string;
 
  
  CompetitorRiskCode: string;
  
  PaymentPeriodRiskCode: string;
  approximateValueRemark: string;
 
  ContractDamageRateUnit: string;
  
 
 
 

  
 
  
 
  
  
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
