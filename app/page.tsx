"use client";

import { useState } from "react";
import DateForm from "@/components/DateForm";
import DateResults from "@/components/DateResults";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import { generateMockPlan } from "@/lib/mockData";
import { Activity, DatePlanInput } from "@/lib/types";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [city, setCity] = useState("");

  function handleSubmit(input: DatePlanInput) {
    setIsLoading(true);
    setCity(input.city);

    // Simulated "thinking" delay so the loading state feels intentional.
    setTimeout(() => {
      setActivities(generateMockPlan(input));
      setIsLoading(false);
    }, 900);
  }

  function handleReset() {
    setActivities(null);
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

      {activities ? (
        <DateResults activities={activities} city={city} onReset={handleReset} />
      ) : (
        <DateForm onSubmit={handleSubmit} isLoading={isLoading} />
      )}
    </main>
  );
}
