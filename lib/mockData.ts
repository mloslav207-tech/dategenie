import { Activity, DatePlanInput } from "./types";

// NOTE: This is placeholder/demo logic that fabricates a plausible-looking
// plan from the form inputs. In a real version, this file would be replaced
// by a call to an LLM API (passing city, budget, interests, and language
// so the response comes back in the user's chosen language).

const budgetVocab: Record<
  DatePlanInput["budget"],
  { tier: string; venueWord: string }
> = {
  low: { tier: "budget-friendly", venueWord: "cozy neighborhood" },
  medium: { tier: "mid-range", venueWord: "charming, well-reviewed" },
  high: { tier: "upscale", venueWord: "exclusive, top-rated" },
};

function firstInterest(interests: string): string {
  const list = interests
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return list[0] || "spending time together";
}

function secondInterest(interests: string): string {
  const list = interests
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return list[1] || list[0] || "good conversation";
}

export function generateMockPlan(input: DatePlanInput): Activity[] {
  const { city, budget } = input;
  const vocab = budgetVocab[budget];
  const interestA = firstInterest(input.interests);
  const interestB = secondInterest(input.interests);
  const cityName = city.trim() || "your city";

  return [
    {
      time: "4:00 PM",
      place: `The Sunlit Terrace, ${cityName}`,
      description: `Kick things off at a ${vocab.venueWord} spot with outdoor seating — perfect for easing into the afternoon while chatting about ${interestA}.`,
      icon: "☕",
    },
    {
      time: "6:30 PM",
      place: `Via Bellini, ${cityName}`,
      description: `A ${vocab.tier} dinner reservation at a favorite for anyone who loves ${interestA}. Ask for a corner table — quieter, more romantic.`,
      icon: "🍝",
    },
    {
      time: "8:30 PM",
      place: `Riverside Walk & Lookout, ${cityName}`,
      description: `End the night with a slow stroll and a view. A nice, low-key way to wind down and talk about ${interestB} under the lights.`,
      icon: "🌙",
    },
  ];
}
