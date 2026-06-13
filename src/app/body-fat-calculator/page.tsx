"use client";

import { useState } from "react";
import CalculatorShell from "@/components/CalculatorShell";

type Unit = "metric" | "imperial";
type Gender = "male" | "female";

export default function BodyFatCalculatorPage() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [gender, setGender] = useState<Gender>("male");
  const [waist, setWaist] = useState(34);
  const [neck, setNeck] = useState(16);
  const [height, setHeight] = useState(70);
  const [hip, setHip] = useState(40);

  // US Navy Method
  let bodyFat = 0;
  if (unit === "imperial") {
    if (gender === "male") {
      bodyFat = 86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
      bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    }
  } else {
    // Convert to inches for formula
    const waistIn = waist / 2.54;
    const neckIn = neck / 2.54;
    const heightIn = height / 2.54;
    const hipIn = hip / 2.54;
    if (gender === "male") {
      bodyFat = 86.01 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76;
    } else {
      bodyFat = 163.205 * Math.log10(waistIn + hipIn - neckIn) - 97.684 * Math.log10(heightIn) - 78.387;
    }
  }

  bodyFat = Math.max(2, Math.min(70, bodyFat));

  const getCategory = (bf: number, g: Gender) => {
    if (g === "male") {
      if (bf < 6) return { label: "Essential Fat", color: "text-blue-500", desc: "Dangerously low" };
      if (bf < 14) return { label: "Athletic", color: "text-green-500", desc: "Lean, fit" };
      if (bf < 18) return { label: "Fitness", color: "text-yellow-500", desc: "Moderate, healthy" };
      if (bf < 25) return { label: "Average", color: "text-orange-500", desc: "Acceptable range" };
      return { label: "Obese", color: "text-red-500", desc: "Above recommended" };
    }
    if (bf < 10) return { label: "Essential Fat", color: "text-blue-500", desc: "Dangerously low" };
    if (bf < 20) return { label: "Athletic", color: "text-green-500", desc: "Lean, fit" };
    if (bf < 25) return { label: "Fitness", color: "text-yellow-500", desc: "Moderate, healthy" };
    if (bf < 32) return { label: "Average", color: "text-orange-500", desc: "Acceptable range" };
    return { label: "Obese", color: "text-red-500", desc: "Above recommended" };
  };

  const category = getCategory(bodyFat, gender);

  return (
    <CalculatorShell
      title="Body Fat Calculator"
      description="Calculate your body fat percentage using the US Navy method. Measure your waist, neck, and hip circumference for an accurate estimate."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
            <button onClick={() => setUnit("imperial")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${unit === "imperial" ? "bg-white dark:bg-gray-700 shadow-sm" : ""}`}>Imperial (in, lb)</button>
            <button onClick={() => setUnit("metric")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${unit === "metric" ? "bg-white dark:bg-gray-700 shadow-sm" : ""}`}>Metric (cm, kg)</button>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setGender("male")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${gender === "male" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}>Male</button>
            <button onClick={() => setGender("female")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${gender === "female" ? "bg-pink-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}>Female</button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Waist {unit === "metric" ? "cm" : "inches"}: <span className="font-bold">{waist}</span>
            </label>
            <input type="range" min={unit === "metric" ? 50 : 20} max={unit === "metric" ? 150 : 60} step={0.5} value={waist}
              onChange={(e) => setWaist(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Neck {unit === "metric" ? "cm" : "inches"}: <span className="font-bold">{neck}</span>
            </label>
            <input type="range" min={unit === "metric" ? 25 : 10} max={unit === "metric" ? 60 : 24} step={0.5} value={neck}
              onChange={(e) => setNeck(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height {unit === "metric" ? "cm" : "inches"}: <span className="font-bold">{height}</span>
            </label>
            <input type="range" min={unit === "metric" ? 120 : 48} max={unit === "metric" ? 220 : 84} step={0.5} value={height}
              onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          {gender === "female" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hip {unit === "metric" ? "cm" : "inches"}: <span className="font-bold">{hip}</span>
              </label>
              <input type="range" min={unit === "metric" ? 60 : 24} max={unit === "metric" ? 160 : 64} step={0.5} value={hip}
                onChange={(e) => setHip(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center">
          <div className="text-6xl mb-2">
            {bodyFat < 6 ? "💀" : bodyFat < 14 ? "💪" : bodyFat < 18 ? "😊" : bodyFat < 25 ? "🤔" : "😟"}
          </div>
          <div className="text-5xl font-bold text-gray-900 dark:text-white mb-1">{bodyFat.toFixed(1)}%</div>
          <div className="text-sm text-gray-500 mb-1">Body Fat</div>
          <div className={`text-xl font-bold ${category.color}`}>{category.label}</div>
          <div className="text-sm text-gray-500 mt-1">{category.desc}</div>

          {/* Scale */}
          <div className="w-full mt-6">
            <div className="relative h-4 bg-gradient-to-r from-blue-300 via-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden">
              <div className="absolute top-[-4px] w-1 h-6 bg-black dark:bg-white rounded-full transition-all duration-200"
                style={{ left: `${Math.min((bodyFat / 45) * 100, 100)}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>6%</span>
              <span>14%</span>
              <span>18%</span>
              <span>25%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500">
        Uses the US Navy Method, one of the most accurate circumference-based body fat estimation formulas. Results are estimates only.
      </div>
    </CalculatorShell>
  );
}
