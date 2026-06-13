"use client";

import { useState } from "react";
import CalculatorShell from "@/components/CalculatorShell";

type Mode = "diff" | "add";

export default function DateCalculatorPage() {
  const [mode, setMode] = useState<Mode>("diff");
  const [date1, setDate1] = useState("2026-06-13");
  const [date2, setDate2] = useState("2026-12-25");
  const [days, setDays] = useState(90);
  const [startDate, setStartDate] = useState("2026-06-13");

  const parseDate = (s: string) => {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  let diffResult = { days: 0, weeks: 0, months: 0, years: 0, totalDays: 0 };
  if (mode === "diff") {
    const d1 = parseDate(date1);
    const d2 = parseDate(date2);
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    diffResult.totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    diffResult.weeks = Math.floor(diffResult.totalDays / 7);
    diffResult.months = Math.floor(diffResult.totalDays / 30.44);
    diffResult.years = Math.floor(diffResult.totalDays / 365.25);
  }

  let addResult: Date | null = null;
  if (mode === "add") {
    const d = parseDate(startDate);
    addResult = new Date(d);
    addResult.setDate(addResult.getDate() + days);
  }

  return (
    <CalculatorShell
      title="Date Calculator"
      description="Calculate the difference between two dates, or add/subtract days from a date. Free online date calculator for planning and counting."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Mode toggle */}
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
            <button onClick={() => setMode("diff")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === "diff" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
              Date Difference
            </button>
            <button onClick={() => setMode("add")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === "add" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
              Add / Subtract Days
            </button>
          </div>

          {mode === "diff" ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
                <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Days to Add (+/-): <span className="font-bold">{days}</span></label>
                <input type="range" min={-365} max={365} value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full accent-blue-600" />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>-365</span><span>0</span><span>+365</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
          {mode === "diff" ? (
            <>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Date Difference</h3>
              <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">{diffResult.totalDays.toLocaleString()}</div>
                <div className="text-sm text-gray-500 mt-1">Days</div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{diffResult.weeks}</div>
                  <div className="text-xs text-gray-500">Weeks</div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{diffResult.months}</div>
                  <div className="text-xs text-gray-500">Months (~30d)</div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{diffResult.years}</div>
                  <div className="text-xs text-gray-500">Years</div>
                </div>
              </div>
              <div className="text-xs text-gray-400 text-center pt-2">
                {formatDate(parseDate(date1))} → {formatDate(parseDate(date2))}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Result Date</h3>
              <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {formatDate(addResult || new Date())}
                </div>
                <div className="text-sm text-gray-500">
                  {days >= 0 ? `${days} days after` : `${Math.abs(days)} days before`} {startDate}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </CalculatorShell>
  );
}
