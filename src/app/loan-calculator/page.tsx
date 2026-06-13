"use client";

import { useState } from "react";
import CalculatorShell from "@/components/CalculatorShell";

export default function LoanCalculatorPage() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(5);

  const monthlyRate = rate / 100 / 12;
  const totalMonths = years * 12;

  let monthlyPayment = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (monthlyRate > 0 && totalMonths > 0) {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyPayment = (amount * monthlyRate * factor) / (factor - 1);
    totalPayment = monthlyPayment * totalMonths;
    totalInterest = totalPayment - amount;
  }

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  return (
    <CalculatorShell
      title="Loan Calculator"
      description="Calculate your monthly loan payments, total interest, and total cost. Works for personal loans, auto loans, student loans, and more."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loan Amount: <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(amount)}</span>
            </label>
            <input
              type="range"
              min={1000}
              max={1000000}
              step={1000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$1,000</span>
              <span>$1,000,000</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Annual Interest Rate: <span className="font-bold text-gray-900 dark:text-white">{rate}%</span>
            </label>
            <input
              type="range"
              min={0.1}
              max={30}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0.1%</span>
              <span>30%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loan Term: <span className="font-bold text-gray-900 dark:text-white">{years} years</span>
            </label>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 year</span>
              <span>30 years</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-300">Monthly Payment</span>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(monthlyPayment)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-300">Total Payment</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(totalPayment)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-300">Total Interest</span>
              <span className="text-lg font-semibold text-orange-600 dark:text-orange-400">{formatCurrency(totalInterest)}</span>
            </div>
          </div>

          {/* Amortization Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Principal: {formatCurrency(amount)}</span>
              <span>Interest: {formatCurrency(totalInterest)}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mt-2">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${(amount / totalPayment) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How It Works</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          This calculator uses the standard loan amortization formula: 
          <strong> M = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1]</strong>, where M is the monthly payment,
          P is the principal loan amount, r is the monthly interest rate, and n is the number
          of monthly payments. The results are estimates only and do not include fees, insurance,
          or taxes that may be part of your actual loan.
        </p>
      </div>
    </CalculatorShell>
  );
}
