export interface SaveForm20 {
  id: number;
  title: string;
  businessUnitCode: string;
  status: string;
  periodUnit: string;
  period: number | null;
  periodDetail: string;
  isMarkingScheme: string;
  splitValueId: number | null;
  bidTypeId: number | null;
  jvSplit: string;
  jvPartner: string;
  jvAgreementId: number | null;
  form30Id: number | null;
  dueDate: string;

  maintenanceDefectId: number | null;
  maintenanceDefectPeriod: number | null;
  maintenanceDefectUnit: string;
  approximateValue: number | null;
  profitMargin: number | null;
  currencyId: number | null;
  tenderTypeId: number | null;
  clientFinanceStanding: string | null;
  countryId: number | null;
 
  
  
  planner: string;
  location: string;
  tenderNo: string;
  estimator: string;
  bidManager: string;
  clientName: string;
  description: string;

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
  evaluationIsContractCondition: string;
  evaluationContractCondition: string;

  evaluationIsBondGuarantee: string;
  evaluationBondGuarantee: string;

  evaluationIsPlantEquipmentRequired: string;
  evaluationPlantEquipmentRequired: string;

  evaluationIsCompanyWorkload: string;
  evaluationCompanyWorkload: string;

  evaluationIsConsultantRecord: string;
  evaluationConsultantRecord: string;

  evaluationIsCompetition: string;
  evaluationCompetition: string;

  evaluationIsPaymentTerm: string;
  evaluationPaymentTerm: string;

  evaluationIsValueExtendContract: string;
  evaluationValueExtendContract: string;

  evaluationIsSiteManagement: string;
  evaluationSiteManagement: string;

  evaluationIsTimeAllowed: string;
  evaluationTimeAllowed: string;

  evaluationIsHealthSafetyEnvironment: string;
  evaluationHealthSafetyEnvironment: string;

  evaluationComments: string;
  
  /*  10  */
  distributionCE: [],
  distributionDivComM: [],
  distributionComDir: string[];
  distributionExeDir: string[];
  distributionFinDir: string[];
  distributionDir: string[];
  distributionGenC: string[];
  distributionInsMgr: string[];
  distributionProc: string[];
  distributionRiskOpp: string[];
  distributionLambeth: string[];
  distributionHSEQ: string[];
 
  distributionBidMgr: string[];

  /* Approval Info 11th*/
  ceApproval: Approvalce[];
  cmApproval: Approvalce[];
  edApproval: Approvalce[];
  dirApproval: Approvalce[];
  hoEApproval: Approvalce[];

 
  
  
  paymentCertificationPeriodUnit: string;
  competitorRiskCode: string;
  paymentPeriodRiskCode: string;
  approximateValueRemark: string;
  contractDamageRateUnit: string;

  /* this field not found*/

  evaluationCashFlow: string;
  evaluationIsCashFlow: string;
  evaluationClientFinancialStatus: string;
  evaluationIsClientFinancialStatus: string;
  evaluationEstimatingDepartmentWorkload: string;
  evaluationIsEstimatingDepartmentWorkload: string;

  
}

interface Approvalce {
  approvalDate: string,
  approverName: string,
  comments: string,
  decision: string,
  id: number | null,
  staffNo: string,
  title: string ,
}
