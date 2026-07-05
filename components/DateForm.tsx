"use client";

import { useState, FormEvent } from "react";
import { Budget, DatePlanInput } from "@/lib/types";

const LANGUAGES = [
  "Auto-detect",
  "English",
  "Mandarin Chinese",
  "Hindi",
  "Spanish",
  "French",
  "Arabic",
  "Portuguese",
  "Russian",
  "Japanese",
  "German",
];

interface DateFormProps {
  onSubmit: (input: DatePlanInput) => void;
  isLoading: boolean;
}

export default function DateForm({ onSubmit, isLoading }: DateFormProps) {
  const [city, setCity] = useState<string>("");
  const [budget, setBudget] = useState<Budget>("medium");
  const [interests, setInterests] = useState<string>("");
  const [language, setLanguage] = useState<string>("Auto-detect");
  const [touched, setTouched] = useState<boolean>(false);

  const cityIsValid = city.trim().length > 0;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    if (!cityIsValid) return;
    onSubmit({ city: city.trim(), budget, interests: interests.trim(), language });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card w-full max-w-md rounded-3xl border border-white/60 p-6 shadow-xl shadow-plum/10 sm:p-8"
    >
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="city" className="mb-1.5 block text-sm font-semibold text-ink">
            City
          </label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Prague, Paris, Tokyo..."
            className="focus-ring w-full rounded-2xl border border-plum/15 bg-white/80 px-4 py-3 text-ink placeholder:text-ink/40 transition focus:border-plum/40"
          />
          {touched && !cityIsValid && (
            <p className="mt-1.5 text-xs font-medium text-petal">
              The genie needs a city to work its magic.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="budget" className="mb-1.5 block text-sm font-semibold text-ink">
            Budget
          </label>
          <select
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value as Budget)}
            className="focus-ring w-full rounded-2xl border border-plum/15 bg-white/80 px-4 py-3 text-ink transition focus:border-plum/40"
          >
            <option value="low">Low — $</option>
            <option value="medium">Medium — $$</option>
            <option value="high">High — $$$</option>
          </select>
        </div>

        <div>
          <label htmlFor="interests" className="mb-1.5 block text-sm font-semibold text-ink">
            Partner&apos;s interests
          </label>
          <input
            id="interests"
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Italian food, walks, art..."
            className="focus-ring w-full rounded-2xl border border-plum/15 bg-white/80 px-4 py-3 text-ink placeholder:text-ink/40 transition focus:border-plum/40"
          />
        </div>

        <div>
          <label htmlFor="language" className="mb-1.5 block text-sm font-semibold text-ink">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="focus-ring w-full rounded-2xl border border-plum/15 bg-white/80 px-4 py-3 text-ink transition focus:border-plum/40"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group relative mt-2 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-petal to-plum 
