"use client";

import { useState } from "react";
import CalculatorShell from "@/components/CalculatorShell";

export default function CreditCardPayoffPage() {
  const [balance, setBalance] = useState(5000);
  const [apr, setApr] = useState(22);
  const [payment, setPayment] = useState(200);
  const [monthlyNew, setMonthlyNew] = useState(0);

  const monthlyRate = apr / 100 / 12;

  // Calculate months to pay off
  let months = 0;
  let totalPaid = 0;
  let totalInterest = 0;
  let b = balance;

  if (monthlyRate > 0 && payment > 0) {
    while (b > 0 && months < 600) {
      const interest = b * monthlyRate;
      const principal = Math.min(payment - interest, b);
      if (principal <= 0) { months = Infinity; break; }
      b = b - principal + monthlyNew;
      totalPaid += interest + principal;
      months++;
    }
    totalInterest = totalPaid - balance;
  }

  const years = Math.floor(months / 12);
  const remMonths = months % 12;

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  return (
    <CalculatorShell
      title="Credit Card Payoff Calculator"
      description="Find out how long it will take to pay off your credit card balance. See how much interest you'll pay and strategies to pay off debt faster."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Balance: <span className="font-bold">{formatCurrency(balance)}</span></label>
            <input type="range" min={100} max={50000} step={100} value={balance} onChange={(e) => setBalance(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Annual Interest Rate (APR): <span className="font-bold">{apr}%</span></label>
            <input type="range" min={5} max={35} step={0.5} value={apr} onChange={(e) => setApr(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Payment: <span className="font-bold">{formatCurrency(payment)}</span></label>
            <input type="range" min={25} max={2000} step={25} value={payment} onChange={(e) => setPayment(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Charges per Month: <span className="font-bold">{formatCurrency(monthlyNew)}</span></label>
            <input type="range" min={0} max={1000} step={25} value={monthlyNew} onChange={(e) => setMonthlyNew(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          {payment <= balance * monthlyRate && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
              ⚠️ Your payment is less than the monthly interest. The balance will never decrease. Increase your payment to at least {formatCurrency(Math.ceil(balance * monthlyRate))}.
            </div>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payoff Summary</h3>
          {months === Infinity ? (
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-2xl font-bold text-red-600">Never Pays Off</div>
              <p className="text-sm text-red-600 mt-2">Your payment doesn&apos;t cover the monthly interest.</p>
            </div>
          ) : (
            <>
              <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-500">Time to Pay Off</div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {years > 0 ? `${years}y ${remMonths}m` : `${months} months`}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg text-center">
                  <div className="text-xs text-gray-500">Total Paid</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalPaid)}</div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg text-center">
                  <div className="text-xs text-gray-500">Total Interest</div>
                  <div className="text-xl font-bold text-red-600">{formatCurrency(totalInterest)}</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: `${Math.min((balance / totalPaid) * 100, 100)}%` }} />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Principal: {formatCurrency(balance)}</span>
                <span>Interest: {formatCurrency(totalInterest)}</span>
              </div>
            </>
          )}

          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-green-800 dark:text-green-300 text-sm">💡 Payoff Tip</h4>
            <p className="text-xs text-green-700 dark:text-green-400 mt-1">
              Paying an extra {formatCurrency(payment * 0.5)} would save you
              significantly in interest. Consider the debt avalanche or snowball method.
            </p>
          </div>
        </div>
      </div>
    </CalculatorShell>
  );
}
