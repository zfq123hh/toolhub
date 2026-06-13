"use client";

import { useState } from "react";
import CalculatorShell from "@/components/CalculatorShell";

export default function MortgageCalculatorPage() {
  const [price, setPrice] = useState(300000);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const [tax, setTax] = useState(2400);
  const [insurance, setInsurance] = useState(1200);

  const downPayment = price * (down / 100);
  const loanAmount = price - downPayment;
  const monthlyRate = rate / 100 / 12;
  const totalMonths = years * 12;

  let monthlyPI = 0;
  if (monthlyRate > 0 && totalMonths > 0) {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyPI = (loanAmount * monthlyRate * factor) / (factor - 1);
  }

  const monthlyTax = tax / 12;
  const monthlyInsurance = insurance / 12;
  const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance;

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  return (
    <CalculatorShell
      title="Mortgage Calculator"
      description="Estimate your monthly mortgage payments including principal, interest, taxes, and insurance (PITI)."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Home Price: <span className="font-bold">{formatCurrency(price)}</span>
            </label>
            <input type="range" min={50000} max={2000000} step={5000} value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-blue-600" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$50k</span><span>$2M</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Down Payment: <span className="font-bold">{down}%</span>
              <span className="text-gray-500 ml-2">({formatCurrency(downPayment)})</span>
            </label>
            <input type="range" min={0} max={50} step={1} value={down}
              onChange={(e) => setDown(Number(e.target.value))}
              className="w-full accent-blue-600" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span><span>50%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interest Rate: <span className="font-bold">{rate}%</span>
            </label>
            <input type="range" min={1} max={12} step={0.1} value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-blue-600" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1%</span><span>12%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Term
              </label>
              <select value={years} onChange={(e) => setYears(Number(e.target.value))}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                <option value={30}>30 Years</option>
                <option value={20}>20 Years</option>
                <option value={15}>15 Years</option>
                <option value={10}>10 Years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Loan Amount
              </label>
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold">
                {formatCurrency(loanAmount)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Payment Breakdown</h3>
          <div className="text-center mb-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Monthly Payment</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(totalMonthly)}</div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between p-2 bg-white dark:bg-gray-700 rounded">
              <span className="text-sm">Principal & Interest</span>
              <span className="font-semibold">{formatCurrency(monthlyPI)}</span>
            </div>
            <div className="flex justify-between p-2 bg-white dark:bg-gray-700 rounded">
              <span className="text-sm">Property Tax</span>
              <span className="font-semibold">{formatCurrency(monthlyTax)}</span>
            </div>
            <div className="flex justify-between p-2 bg-white dark:bg-gray-700 rounded">
              <span className="text-sm">Home Insurance</span>
              <span className="font-semibold">{formatCurrency(monthlyInsurance)}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 mt-4 flex overflow-hidden">
            <div className="bg-blue-600 h-full" style={{ width: `${(monthlyPI / totalMonthly) * 100}%` }} />
            <div className="bg-amber-500 h-full" style={{ width: `${(monthlyTax / totalMonthly) * 100}%` }} />
            <div className="bg-green-500 h-full" style={{ width: `${(monthlyInsurance / totalMonthly) * 100}%` }} />
          </div>
          <div className="flex justify-center gap-4 text-xs mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-600 rounded-full" /> P&I</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rounded-full" /> Tax</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full" /> Insurance</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What is PITI?</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          PITI stands for Principal, Interest, Taxes, and Insurance — the four components of a
          typical mortgage payment. Most lenders use PITI to determine how much you can afford
          to borrow. This calculator provides estimates only; actual payments may vary based on
          PMI, HOA fees, and other factors.
        </p>
      </div>
    </CalculatorShell>
  );
}
