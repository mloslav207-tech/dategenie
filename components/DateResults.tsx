"use client";

import { Activity } from "@/lib/types";

interface DateResultsProps {
  activities: Activity[];
  city: string;
  onReset: () => void;
}

export default function DateResults({ activities, city, onReset }: DateResultsProps) {
  return (
    <div className="w-full max-w-md">
      <div className="mb-6 flex flex-col items-center gap-1 text-center animate-sparklePop">
        <span className="text-3xl">🧞‍♂️✨</span>
        <h2 className="font-display text-2xl font-semibold text-ink">
          Your date in {city || "your city"}
        </h2>
        <p className="text-sm text-ink/60">Wish granted. Here&apos;s the plan.</p>
      </div>

      <ol className="relative flex flex-col gap-5 pl-2">
        <span
          aria-hidden="true"
          className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-petal via-plum to-petal/40"
        />
        {activities.map((activity, i) => (
          <li
            key={i}
            className="relative animate-fadeSlideUp rounded-3xl border border-white/60 bg-white/80 p-5 pl-14 shadow-lg shadow-plum/10 backdrop-blur"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <span className="absolute left-2 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-petal to-plum text-base shadow-md shadow-plum/30">
              {activity.icon}
            </span>
            <p className="text-xs font-bold uppercase tracking-wide text-plum">
              {activity.time}
            </p>
            <h3 className="mt-0.5 font-display text-lg font-semibold text-ink">
              {activity.place}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-ink/70">
              {activity.description}
            </p>
          </li>
        ))}
      </ol>

      <button
        onClick={onReset}
        className="focus-ring mx-auto mt-8 block rounded-full border-2 border-plum/30 bg-white/70 px-6 py-3 text-sm font-semibold text-plum transition hover:bg-white active:scale-[0.98]"
      >
        Plan another date
      </button>
    </div>
  );
}
