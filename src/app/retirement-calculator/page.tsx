"use client";

import { useState } from "react";
import CalculatorShell from "@/components/CalculatorShell";

export default function RetirementCalculatorPage() {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(65);
  const [savings, setSavings] = useState(50000);
  const [monthly, setMonthly] = useState(1000);
  const [rate, setRate] = useState(7);
  const [withdrawal, setWithdrawal] = useState(4);

  const yearsToGrow = retireAge - age;
  const monthlyRate = rate / 100 / 12;
  const totalMonths = yearsToGrow * 12;

  let futureValue = 0;
  if (monthlyRate > 0 && totalMonths > 0) {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    futureValue = savings * factor + monthly * ((factor - 1) / monthlyRate);
  }

  const annualWithdrawal = futureValue * (withdrawal / 100);
  const monthlyIncome = annualWithdrawal / 12;

  const targetSavings = annualWithdrawal / 0.04;
  const monthlyNeeded = (() => {
    if (monthlyRate <= 0 || totalMonths <= 0) return 0;
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    return (targetSavings - savings * factor) * monthlyRate / (factor - 1);
  })();

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

  return (
    <CalculatorShell
      title="Retirement Calculator"
      description="Plan your retirement savings. Estimate how much you need to save for a comfortable retirement with compound interest projections."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Age: <span className="font-bold">{age}</span></label>
              <input type="range" min={18} max={70} value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Retire At: <span className="font-bold">{retireAge}</span></label>
              <input type="range" min={40} max={80} value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Savings: <span className="font-bold">{formatCurrency(savings)}</span></label>
            <input type="range" min={0} max={2000000} step={5000} value={savings} onChange={(e) => setSavings(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Contribution: <span className="font-bold">{formatCurrency(monthly)}</span></label>
            <input type="range" min={0} max={10000} step={100} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Return Rate: <span className="font-bold">{rate}%</span></label>
              <input type="range" min={1} max={15} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Withdrawal Rate: <span className="font-bold">{withdrawal}%</span></label>
              <input type="range" min={2} max={8} step={0.25} value={withdrawal} onChange={(e) => setWithdrawal(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Retirement Summary</h3>
          <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Savings at Retirement</div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(futureValue)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg text-center">
              <div className="text-sm text-gray-500">Monthly Income</div>
              <div className="text-lg font-bold text-blue-600">{formatCurrency(monthlyIncome)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg text-center">
              <div className="text-sm text-gray-500">Years to Grow</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{yearsToGrow}</div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 text-sm mb-1">4% Rule</h4>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              The 4% rule suggests you can withdraw 4% of your savings annually (adjusted for inflation) with a low risk of running out over 30 years. At this rate, you&apos;d need <strong>{formatCurrency(targetSavings)}</strong> in savings to replace your target income.
            </p>
          </div>
        </div>
      </div>
    </CalculatorShell>
  );
}
