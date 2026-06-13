"use client";

import { useState } from "react";
import CalculatorShell from "@/components/CalculatorShell";

export default function SalaryCalculatorPage() {
  const [hourly, setHourly] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [vacation, setVacation] = useState(10);

  const weeksPerYear = 52 - vacation / 7;
  const annual = hourly * hoursPerWeek * weeksPerYear;
  const monthly = annual / 12;
  const biweekly = annual / 26;
  const weekly = annual / weeksPerYear;
  const daily = hourly * (hoursPerWeek / 5);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);

  return (
    <CalculatorShell
      title="Salary Calculator"
      description="Convert between hourly, weekly, monthly, and annual salary. Free salary converter for job offers, budgeting, and negotiations."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
            <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">Hourly Rate: <span className="font-bold text-xl">{formatCurrency(hourly)}</span></label>
            <input type="range" min={7} max={200} step={0.5} value={hourly} onChange={(e) => setHourly(Number(e.target.value))} className="w-full accent-blue-600" />
            <div className="flex justify-between text-xs text-blue-500 mt-1"><span>$7/hr</span><span>$200/hr</span></div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hours per Week: <span className="font-bold">{hoursPerWeek}h</span></label>
            <input type="range" min={10} max={80} step={1} value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Vacation Days per Year: <span className="font-bold">{vacation}d</span></label>
            <input type="range" min={0} max={30} step={1} value={vacation} onChange={(e) => setVacation(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>

          <div className="text-xs text-gray-400">
            Working weeks per year: {weeksPerYear.toFixed(1)} ({52} weeks - {vacation} vacation days)
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Salary Breakdown</h3>

          <div className="p-4 bg-white dark:bg-gray-700 rounded-lg text-center">
            <div className="text-sm text-gray-500">Annual Salary</div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(annual)}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-500">Monthly</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(monthly)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-500">Biweekly</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(biweekly)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-500">Weekly</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(weekly)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-500">Daily (8h)</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(daily)}</div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorShell>
  );
}
