"use client";

import { useState } from "react";
import CalculatorShell from "@/components/CalculatorShell";

export default function AmortizationCalculatorPage() {
  const [amount, setAmount] = useState(200000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const [showYear, setShowYear] = useState(1);

  const monthlyRate = rate / 100 / 12;
  const totalMonths = years * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0 && totalMonths > 0) {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyPayment = (amount * monthlyRate * factor) / (factor - 1);
  }

  // Generate amortization schedule
  const schedule = [];
  let balance = amount;
  let totalInt = 0;
  for (let m = 1; m <= totalMonths && balance > 0; m++) {
    const interest = balance * monthlyRate;
    const principal = Math.min(monthlyPayment - interest, balance);
    balance = Math.max(0, balance - principal);
    totalInt += interest;
    if (m === 1 || m === Math.min(12, totalMonths) || m % 12 === 0 || m === totalMonths || m === showYear * 12) {
      schedule.push({ month: m, payment: monthlyPayment, principal, interest, balance, totalInt });
    }
  }

  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = totalPayment - amount;

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  return (
    <CalculatorShell
      title="Amortization Calculator"
      description="Full amortization schedule for loans and mortgages. See monthly breakdown of principal vs interest payments over the entire loan term."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Loan Amount: <span className="font-bold">{formatCurrency(amount)}</span></label>
            <input type="range" min={10000} max={1000000} step={5000} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interest Rate: <span className="font-bold">{rate}%</span></label>
            <input type="range" min={0.1} max={15} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Term: <span className="font-bold">{years} years</span></label>
            <div className="flex gap-2 flex-wrap">
              {[5, 10, 15, 20, 25, 30].map((v) => (
                <button key={v} onClick={() => { setYears(v); setShowYear(1) }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${years === v ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}>
                  {v} yr
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Loan Summary</h3>
          <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500">Monthly Payment</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(monthlyPayment)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg text-center">
              <div className="text-xs text-gray-500">Total Interest</div>
              <div className="text-lg font-bold text-orange-600">{formatCurrency(totalInterest)}</div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg text-center">
              <div className="text-xs text-gray-500">Total Payment</div>
              <div className="text-lg font-bold">{formatCurrency(totalPayment)}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 flex">
            <div className="bg-blue-600 h-4 rounded-l-full" style={{ width: `${(amount / totalPayment) * 100}%` }} />
            <div className="bg-orange-400 h-4 rounded-r-full" style={{ width: `${(totalInterest / totalPayment) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Amortization Table */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Amortization Schedule</h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">Jump to year:</span>
          <select value={showYear} onChange={(e) => setShowYear(Number(e.target.value))}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm">
            {Array.from({ length: years }, (_, i) => i + 1).map((y) => (
              <option key={y} value={y}>Year {y}</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 pr-4">Month</th>
                <th className="text-right py-2 pr-4">Payment</th>
                <th className="text-right py-2 pr-4">Principal</th>
                <th className="text-right py-2 pr-4">Interest</th>
                <th className="text-right py-2 pr-4">Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.month} className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${row.month === showYear * 12 ? "font-semibold bg-blue-50 dark:bg-blue-900/20" : ""}`}>
                  <td className="py-2 pr-4 text-gray-500">{row.month}</td>
                  <td className="text-right py-2 pr-4">{formatCurrency(row.payment)}</td>
                  <td className="text-right py-2 pr-4 text-green-600">{formatCurrency(row.principal)}</td>
                  <td className="text-right py-2 pr-4 text-orange-600">{formatCurrency(row.interest)}</td>
                  <td className="text-right py-2">{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorShell>
  );
}
