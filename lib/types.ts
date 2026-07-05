export interface DatePlanInput {
  city: string;
  budgetAmount: number;
  currency: string;
  interests: string;
  language: string;
}

export interface Activity {
  time: string;
  place: string;
  description: string;
  icon: string;
  estimatedCost: string;
  localCost: string;
}

export interface DatePlanResponse {
  activities: Activity[];
  totalCost: string;
  totalLocalCost: string;
}