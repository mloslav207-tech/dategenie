import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import type { DatePlanInput, DatePlanResponse } from "@/lib/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const input: DatePlanInput = await request.json();

    if (!input.city || !input.budgetAmount) {
      return NextResponse.json(
        { error: "City and budget are required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const languageInstruction =
      input.language === "Auto-detect"
        ? "Detect the most appropriate language based on the city and respond in that language."
        : `Respond entirely in ${input.language}.`;

    const prompt = `You are DateGenie, a creative and romantic date planner AI.

Plan a perfect date with these details:
- City: ${input.city}
- Total budget: ${input.budgetAmount} ${input.currency}
- Partner's interests: ${input.interests || "not specified"}
- ${languageInstruction}

Create exactly 3 activities for a memorable date. For each activity:
- Choose a realistic time (afternoon to evening)
- Suggest a real-sounding place name in ${input.city}
- Write a warm, romantic 1-2 sentence description
- Pick ONE emoji that fits the activity
- Estimate the cost in ${input.currency} (user's currency)
- Estimate the cost in the LOCAL currency of ${input.city}

The total cost of all activities should be close to (but not exceeding) ${input.budgetAmount} ${input.currency}.

Respond ONLY with valid JSON in this exact format (no markdown, no code blocks):
{
  "activities": [
    {
      "time": "4:00 PM",
      "place": "Place Name, ${input.city}",
      "description": "Romantic description here.",
      "icon": "☕",
      "estimatedCost": "25 ${input.currency}",
      "localCost": "23 EUR"
    }
  ],
  "totalCost": "Total in ${input.currency}",
  "totalLocalCost": "Total in local currency"
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const cleanedText = responseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const parsed: DatePlanResponse = JSON.parse(cleanedText);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error generating date plan:", error);
    return NextResponse.json(
      { error: "Failed to generate date plan. Please try again." },
      { status: 500 }
    );
  }
}