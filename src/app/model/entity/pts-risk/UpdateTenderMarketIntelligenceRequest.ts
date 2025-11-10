export interface UpdateTenderMarketIntelligenceRequest  {
  tenderId: number;
  winningCompetitor?: string;
  marginLostPercentage?: number;
  otherReasonsForLoss?: string;
  reportDate?: string;
}