"use client";

import { useState } from "react";
import CalculatorShell from "@/components/CalculatorShell";

export default function InvestmentCalculatorPage() {
  const [principal, setPrincipal] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);
  const [compound, setCompound] = useState(12); // monthly

  const periods = years * compound;
  const periodicRate = rate / 100 / compound;

  let futureValue = 0;
  let totalContributions = 0;
  let totalInterest = 0;

  // FV = P * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
  if (periodicRate > 0) {
    const growthFactor = Math.pow(1 + periodicRate, periods);
    const pvComponent = principal * growthFactor;
    const pmtComponent = monthly * ((growthFactor - 1) / periodicRate);
    futureValue = pvComponent + pmtComponent;
    totalContributions = principal + monthly * periods;
    totalInterest = futureValue - totalContributions;
  }

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n);

  // Generate year-by-year data for chart
  const chartData = Array.from({ length: years + 1 }, (_, i) => {
    const y = i;
    const n = y * compound;
    const factor = Math.pow(1 + periodicRate, n);
    const pv = principal * factor;
    const pmt = monthly * ((factor - 1) / periodicRate);
    const fv = pv + pmt;
    const contrib = principal + monthly * n;
    const interest = fv - contrib;
    return { year: y, value: fv, contributions: contrib, interest };
  });

  return (
    <CalculatorShell
      title="Investment Calculator"
      description="Project how your investments will grow over time with compound interest. Adjust contributions, rate, and time horizon."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Initial Investment: <span className="font-bold">{formatCurrency(principal)}</span>
            </label>
            <input type="range" min={0} max={1000000} step={1000} value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Monthly Contribution: <span className="font-bold">{formatCurrency(monthly)}</span>
            </label>
            <input type="range" min={0} max={10000} step={100} value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Annual Return Rate: <span className="font-bold">{rate}%</span>
            </label>
            <input type="range" min={0.1} max={30} step={0.1} value={rate}
              onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time Horizon: <span className="font-bold">{years} years</span>
              </label>
              <input type="range" min={1} max={50} step={1} value={years}
                onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Compound</label>
              <select value={compound} onChange={(e) => setCompound(Number(e.target.value))}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option value={1}>Annually</option>
                <option value={2}>Semi-annually</option>
                <option value={4}>Quarterly</option>
                <option value={12}>Monthly</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Results</h3>
          <div className="text-center mb-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Future Value</div>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400">{formatCurrency(futureValue)}</div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
              <span className="text-sm">Total Contributions</span>
              <span className="font-semibold">{formatCurrency(totalContributions)}</span>
            </div>
            <div className="flex justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
              <span className="text-sm">Total Interest Earned</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{formatCurrency(totalInterest)}</span>
            </div>
          </div>

          {/* Simple bar chart */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex gap-[2px] items-end h-20">
              {chartData.filter((_, i) => i % Math.max(1, Math.floor(years / 10)) === 0 || i === years).map((d) => (
                <div key={d.year} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(d.value / futureValue) * 70}px` }} />
                  <span className="text-[10px] text-gray-400">{d.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Growth Table */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Year-by-Year Growth</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 pr-4">Year</th>
                <th className="text-right py-2 pr-4">Balance</th>
                <th className="text-right py-2 pr-4">Contributions</th>
                <th className="text-right py-2">Interest</th>
              </tr>
            </thead>
            <tbody>
              {chartData.slice(0, 21).map((d) => (
                <tr key={d.year} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-2 pr-4 text-gray-500">{d.year}</td>
                  <td className="text-right py-2 pr-4 font-medium">{formatCurrency(d.value)}</td>
                  <td className="text-right py-2 pr-4 text-gray-500">{formatCurrency(d.contributions)}</td>
                  <td className="text-right py-2 text-green-600 dark:text-green-400">{formatCurrency(d.interest)}</td>
                </tr>
              ))}
              {years > 20 && (
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td colSpan={4} className="text-center py-2 text-gray-400 italic">... showing years 0–20 of {years}</td>
                </tr>
              )}
              {years > 20 && chartData.slice(-1).map((d) => (
                <tr key="final" className="font-semibold bg-gray-50 dark:bg-gray-800">
                  <td className="py-2 pr-4">{d.year}</td>
                  <td className="text-right py-2 pr-4">{formatCurrency(d.value)}</td>
                  <td className="text-right py-2 pr-4">{formatCurrency(d.contributions)}</td>
                  <td className="text-right py-2 text-green-600">{formatCurrency(d.interest)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Compound Interest Explained</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Compound interest is the interest on your interest. The formula used is:
          <strong> FV = P(1+r)ⁿ + PMT × [((1+r)ⁿ − 1) / r]</strong>, where FV is the future
          value, P is the principal, r is the periodic interest rate, n is the total number of
          compounding periods, and PMT is the periodic contribution. This is a projection only
          — actual returns vary and past performance does not guarantee future results.
        </p>
      </div>
    </CalculatorShell>
  );
}
