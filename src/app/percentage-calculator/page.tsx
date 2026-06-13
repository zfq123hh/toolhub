"use client";

import { useState } from "react";
import CalculatorShell from "@/components/CalculatorShell";

type Mode = "percent" | "change" | "tip";

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<Mode>("percent");
  const [value, setValue] = useState(200);
  const [percent, setPercent] = useState(15);
  const [oldVal, setOldVal] = useState(100);
  const [newVal, setNewVal] = useState(150);
  const [bill, setBill] = useState(50);
  const [tipPercent, setTipPercent] = useState(15);

  const result = value * (percent / 100);

  const change = oldVal > 0 ? ((newVal - oldVal) / oldVal) * 100 : 0;

  const tipAmount = bill * (tipPercent / 100);
  const totalWithTip = bill + tipAmount;

  return (
    <CalculatorShell
      title="Percentage Calculator"
      description="Free online percentage calculator. Calculate percentages, percent change, and tips. Simple, fast, and accurate."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit flex-wrap">
            <button onClick={() => setMode("percent")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${mode === "percent" ? "bg-white dark:bg-gray-700 shadow-sm" : ""}`}>
              % of Number
            </button>
            <button onClick={() => setMode("change")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${mode === "change" ? "bg-white dark:bg-gray-700 shadow-sm" : ""}`}>
              % Change
            </button>
            <button onClick={() => setMode("tip")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${mode === "tip" ? "bg-white dark:bg-gray-700 shadow-sm" : ""}`}>
              Tip Calculator
            </button>
          </div>

          {mode === "percent" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Value: <span className="font-bold">${value}</span></label>
                <input type="range" min={1} max={10000} step={1} value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full accent-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Percentage: <span className="font-bold">{percent}%</span></label>
                <input type="range" min={0.1} max={100} step={0.1} value={percent} onChange={(e) => setPercent(Number(e.target.value))} className="w-full accent-blue-600" />
              </div>
            </>
          )}

          {mode === "change" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Original Value: <span className="font-bold">${oldVal}</span></label>
                <input type="range" min={1} max={10000} step={1} value={oldVal} onChange={(e) => setOldVal(Number(e.target.value))} className="w-full accent-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Value: <span className="font-bold">${newVal}</span></label>
                <input type="range" min={1} max={10000} step={1} value={newVal} onChange={(e) => setNewVal(Number(e.target.value))} className="w-full accent-blue-600" />
              </div>
            </>
          )}

          {mode === "tip" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bill Amount: <span className="font-bold">${bill}</span></label>
                <input type="range" min={1} max={1000} step={1} value={bill} onChange={(e) => setBill(Number(e.target.value))} className="w-full accent-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tip: <span className="font-bold">{tipPercent}%</span></label>
                <input type="range" min={5} max={30} step={0.5} value={tipPercent} onChange={(e) => setTipPercent(Number(e.target.value))} className="w-full accent-blue-600" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {[10, 12.5, 15, 18, 20, 25].map((v) => (
                  <button key={v} onClick={() => setTipPercent(v)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${tipPercent === v ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}>
                    {v}%
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex flex-col justify-center">
          {mode === "percent" && (
            <div className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">{percent}% of ${value.toLocaleString()}</div>
              <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 my-4">
                ${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-gray-500">
                {percent}% × ${value.toLocaleString()} = ${result.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>
          )}
          {mode === "change" && (
            <div className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">Percent Change</div>
              <div className={`text-6xl font-bold my-4 ${change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {change >= 0 ? "+" : ""}{change.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-500">
                ${oldVal.toLocaleString()} → ${newVal.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                {change >= 0 ? "Increase" : "Decrease"} of ${Math.abs(newVal - oldVal).toLocaleString()}
              </div>
            </div>
          )}
          {mode === "tip" && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-500">Tip Amount ({tipPercent}%)</div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">${tipAmount.toFixed(2)}</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-sm text-blue-600 dark:text-blue-400">Total to Pay</div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">${totalWithTip.toFixed(2)}</div>
              </div>
              <div className="text-center text-sm text-gray-500">
                Split between 2: <strong>${(totalWithTip / 2).toFixed(2)}</strong> each &middot;
                3: <strong>${(totalWithTip / 3).toFixed(2)}</strong> each &middot;
                4: <strong>${(totalWithTip / 4).toFixed(2)}</strong> each
              </div>
            </div>
          )}
        </div>
      </div>
    </CalculatorShell>
  );
}
