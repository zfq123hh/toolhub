"use client";

import { useState } from "react";
import CalculatorShell from "@/components/CalculatorShell";

export default function CalorieCalculatorPage() {
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [activity, setActivity] = useState(2);

  // Mifflin-St Jeor Equation
  const bmr = gender === "male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityLevels = [
    { value: 1.2, label: "Sedentary", desc: "Little or no exercise" },
    { value: 1.375, label: "Lightly Active", desc: "1–3 days/week" },
    { value: 1.55, label: "Moderately Active", desc: "3–5 days/week" },
    { value: 1.725, label: "Very Active", desc: "6–7 days/week" },
    { value: 1.9, label: "Extra Active", desc: "Hard daily exercise" },
  ];

  const tdee = bmr * activityLevels[activity].value;

  const formatNumber = (n: number) => n.toFixed(0);

  return (
    <CalculatorShell
      title="Calorie Calculator"
      description="Calculate your daily calorie needs based on age, gender, weight, height, and activity level. Uses the Mifflin-St Jeor equation."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age: <span className="font-bold">{age}</span></label>
              <input type="range" min={10} max={100} step={1} value={age}
                onChange={(e) => setAge(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
              <div className="flex gap-2 mt-2">
                <button onClick={() => setGender("male")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    gender === "male" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}>Male</button>
                <button onClick={() => setGender("female")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    gender === "female" ? "bg-pink-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}>Female</button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight: <span className="font-bold">{weight} kg</span>
            </label>
            <input type="range" min={30} max={250} step={1} value={weight}
              onChange={(e) => setWeight(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height: <span className="font-bold">{height} cm</span>
            </label>
            <input type="range" min={100} max={250} step={1} value={height}
              onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Level</label>
            <div className="grid grid-cols-1 gap-1">
              {activityLevels.map((level, i) => (
                <button key={i} onClick={() => setActivity(i)}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activity === i ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700" : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}>
                  <span className="font-medium">{level.label}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">{level.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-6">
          <div className="text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your Daily Calorie Needs (TDEE)</div>
            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(tdee)}</div>
            <div className="text-sm text-gray-500 mt-1">calories/day</div>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
              <span className="text-sm">Basal Metabolic Rate (BMR)</span>
              <span className="font-semibold">{formatNumber(bmr)} cal</span>
            </div>
            <div className="flex justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
              <span className="text-sm">Activity Level</span>
              <span className="font-semibold">{activityLevels[activity].label}</span>
            </div>
            <div className="flex justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
              <span className="text-sm">Weight Maintenance</span>
              <span className="font-semibold text-green-600 dark:text-green-400">{formatNumber(tdee)} cal/day</span>
            </div>
            <div className="flex justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
              <span className="text-sm">Mild Weight Loss (0.25 kg/week)</span>
              <span className="font-semibold text-orange-600">{formatNumber(tdee - 250)} cal/day</span>
            </div>
            <div className="flex justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
              <span className="text-sm">Weight Loss (0.5 kg/week)</span>
              <span className="font-semibold text-red-600">{formatNumber(tdee - 500)} cal/day</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What is TDEE?</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns
          in a day. It includes your Basal Metabolic Rate (BMR) — the calories needed for basic
          bodily functions — plus additional calories burned through physical activity. This
          calculator uses the Mifflin-St Jeor equation, considered one of the most accurate BMR
          formulas for the general population.
        </p>
      </div>
    </CalculatorShell>
  );
}
