"use client";

import { useState } from "react";
import CalculatorShell from "@/components/CalculatorShell";

type Unit = "metric" | "imperial";

const bmiCategories = [
  { min: 0, max: 18.5, label: "Underweight", color: "text-blue-500" },
  { min: 18.5, max: 25, label: "Normal weight", color: "text-green-500" },
  { min: 25, max: 30, label: "Overweight", color: "text-orange-500" },
  { min: 30, max: 40, label: "Obese", color: "text-red-500" },
  { min: 40, max: Infinity, label: "Severely Obese", color: "text-red-700" },
];

export default function BMICalculatorPage() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);

  const bmi = unit === "metric"
    ? weight / Math.pow(height / 100, 2)
    : (weight / Math.pow(height, 2)) * 703;

  const category = bmiCategories.find((c) => bmi >= c.min && bmi < c.max) ?? bmiCategories[3];

  return (
    <CalculatorShell
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) and check your weight category. Free, instant, and private."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Unit toggle */}
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
            <button
              onClick={() => setUnit("metric")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                unit === "metric" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Metric (kg, cm)
            </button>
            <button
              onClick={() => setUnit("imperial")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                unit === "imperial" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Imperial (lbs, in)
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight ({unit === "metric" ? "kg" : "lbs"}): <span className="font-bold">{weight}</span>
            </label>
            <input type="range" min={unit === "metric" ? 30 : 60} max={unit === "metric" ? 250 : 550} step={1} value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height ({unit === "metric" ? "cm" : "inches"}): <span className="font-bold">{height}</span>
            </label>
            <input type="range" min={unit === "metric" ? 100 : 48} max={unit === "metric" ? 250 : 96} step={1} value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-blue-600" />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center">
          <div className="text-6xl mb-2">{bmi < 18.5 ? "😟" : bmi < 25 ? "😊" : bmi < 30 ? "🤔" : "😟"}</div>
          <div className="text-5xl font-bold text-gray-900 dark:text-white mb-1">{bmi.toFixed(1)}</div>
          <div className="text-lg font-medium mb-4">Your BMI</div>
          <div className={`text-xl font-bold ${category.color}`}>{category.label}</div>

          {/* BMI Scale Bar */}
          <div className="w-full mt-6">
            <div className="relative h-4 bg-gradient-to-r from-blue-400 via-green-400 via-orange-400 to-red-500 rounded-full overflow-hidden">
              <div
                className="absolute top-[-4px] w-1 h-6 bg-black dark:bg-white rounded-full transition-all duration-200"
                style={{ left: `${Math.min((bmi / 45) * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">BMI Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
          {bmiCategories.map((c) => (
            <div key={c.label} className={`p-2 rounded-lg text-center ${c.color} ${bmi >= c.min && bmi < c.max ? "bg-blue-50 dark:bg-blue-900/20 font-bold" : "bg-gray-50 dark:bg-gray-800"}`}>
              <div className="font-medium">{c.label}</div>
              <div className="text-gray-500">
                {c.max === Infinity ? `${c.min}+` : `${c.min}–${c.max}`}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          BMI is a screening measure, not a diagnostic tool. Consult a healthcare provider for a complete health assessment.
        </p>
      </div>
    </CalculatorShell>
  );
}
