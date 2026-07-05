export type Budget = "low" | "medium" | "high";

export interface DatePlanInput {
  city: string;
  budget: Budget;
  interests: string;
  language: string;
}

export interface Activity {
  time: string;
  place: string;
  description: string;
  icon: string;
}
