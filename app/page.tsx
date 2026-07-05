"use client";

import { useState } from "react";
import DateForm from "@/components/DateForm";
import DateResults from "@/components/DateResults";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import { Activity, DatePlanInput } from "@/lib/types";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [city, setCity] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [totalLocalCost, setTotalLocalCost] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(input: DatePlanInput) {
    setIsLoading(true);
    setCity(input.city);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Failed to generate plan");
      }

      const data = await response.json();
      setActivities(data.activities);
      setTotalCost(data.totalCost);
      setTotalLocalCost(data.totalLocalCost);
    } catch (err) {
      console.error(err);
      setError("The genie is resting. Please try again in a moment. ✨");
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setActivities(null);
    setError(null);
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-12 sm:py-20">
      <BackgroundBlobs />

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
          <span className="shimmer-text">DateGenie</span> 🧞
        </h1>
        <p className="font-display text-lg italic text-ink/70 sm:text-xl">
          Your AI-powered date planner ✨
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-petal/40 bg-white/80 px-5 py-3 text-sm text-petal shadow-md">
          {error}
        </div>
      )}

      {activities ? (
        <DateResults
          activities={activities}
          city={city}
          totalCost={totalCost}
          totalLocalCost={totalLocalCost}
          onReset={handleReset}
        />
      ) : (
        <DateForm onSubmit={handleSubmit} isLoading={isLoading} />
      )}
    </main>
  );
}