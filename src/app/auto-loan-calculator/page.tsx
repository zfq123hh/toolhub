"use client";

import { useState } from "react";
import CalculatorShell from "@/components/CalculatorShell";

export default function AutoLoanCalculatorPage() {
  const [price, setPrice] = useState(35000);
  const [down, setDown] = useState(5000);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(60);
  const [tradeIn, setTradeIn] = useState(0);

  const loanAmount = Math.max(0, price - down - tradeIn);
  const monthlyRate = rate / 100 / 12;
  const totalMonths = term;

  let monthlyPayment = 0;
  let totalPayment = 0;
  let totalInterest = 0;
  if (monthlyRate > 0 && totalMonths > 0) {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyPayment = (loanAmount * monthlyRate * factor) / (factor - 1);
    totalPayment = monthlyPayment * totalMonths;
    totalInterest = totalPayment - loanAmount;
  }

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  return (
    <CalculatorShell
      title="Auto Loan Calculator"
      description="Calculate your monthly car loan payments, total interest, and total cost. Compare different loan terms for your auto purchase."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Car Price: <span className="font-bold">{formatCurrency(price)}</span></label>
            <input type="range" min={5000} max={150000} step={1000} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Down Payment: <span className="font-bold">{formatCurrency(down)}</span></label>
              <input type="range" min={0} max={50000} step={500} value={down} onChange={(e) => setDown(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trade-In: <span className="font-bold">{formatCurrency(tradeIn)}</span></label>
              <input type="range" min={0} max={30000} step={500} value={tradeIn} onChange={(e) => setTradeIn(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interest Rate: <span className="font-bold">{rate}%</span></label>
            <input type="range" min={0.1} max={20} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Loan Term: <span className="font-bold">{term} months ({Math.floor(term/12)}yr {term%12}mo)</span></label>
            <div className="flex gap-2 flex-wrap">
              {[36, 48, 60, 72, 84].map((v) => (
                <button key={v} onClick={() => setTerm(v)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${term === v ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
                  {v} mo
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Summary</h3>
          <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500">Monthly Payment</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(monthlyPayment)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg text-center">
              <div className="text-xs text-gray-500">Loan Amount</div>
              <div className="text-lg font-bold">{formatCurrency(loanAmount)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg text-center">
              <div className="text-xs text-gray-500">Total Interest</div>
              <div className="text-lg font-bold text-orange-600">{formatCurrency(totalInterest)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg text-center">
              <div className="text-xs text-gray-500">Total Cost</div>
              <div className="text-lg font-bold">{formatCurrency(totalPayment)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg text-center">
              <div className="text-xs text-gray-500">+ Down/Trade</div>
              <div className="text-lg font-bold">{formatCurrency(down + tradeIn)}</div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorShell>
  );
}
