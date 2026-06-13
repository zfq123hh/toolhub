"use client";

import { useState } from "react";
import CalculatorShell from "@/components/CalculatorShell";

export default function AgeCalculatorPage() {
  const [birthYear, setBirthYear] = useState(1995);
  const [birthMonth, setBirthMonth] = useState(6);
  const [birthDay, setBirthDay] = useState(15);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();

  let age = currentYear - birthYear;
  let monthDiff = currentMonth - birthMonth;
  let dayDiff = currentDay - birthDay;

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
    monthDiff += 12;
  }
  if (dayDiff < 0) {
    monthDiff--;
    const prevMonth = new Date(currentYear, currentMonth - 1, 0);
    dayDiff += prevMonth.getDate();
  }

  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  const totalDays = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24 + now.getHours();
  const totalMinutes = totalHours * 60 + now.getMinutes();

  const nextBirthday = new Date(currentYear, birthMonth - 1, birthDay);
  if (nextBirthday < now) nextBirthday.setFullYear(currentYear + 1);
  const daysToBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const zodiacSigns = [
    { sign: "Capricorn", emoji: "🐐", from: { m: 12, d: 22 }, to: { m: 1, d: 19 } },
    { sign: "Aquarius", emoji: "🏺", from: { m: 1, d: 20 }, to: { m: 2, d: 18 } },
    { sign: "Pisces", emoji: "🐟", from: { m: 2, d: 19 }, to: { m: 3, d: 20 } },
    { sign: "Aries", emoji: "🐏", from: { m: 3, d: 21 }, to: { m: 4, d: 19 } },
    { sign: "Taurus", emoji: "🐂", from: { m: 4, d: 20 }, to: { m: 5, d: 20 } },
    { sign: "Gemini", emoji: "👯", from: { m: 5, d: 21 }, to: { m: 6, d: 20 } },
    { sign: "Cancer", emoji: "🦀", from: { m: 6, d: 21 }, to: { m: 7, d: 22 } },
    { sign: "Leo", emoji: "🦁", from: { m: 7, d: 23 }, to: { m: 8, d: 22 } },
    { sign: "Virgo", emoji: "🌾", from: { m: 8, d: 23 }, to: { m: 9, d: 22 } },
    { sign: "Libra", emoji: "⚖️", from: { m: 9, d: 23 }, to: { m: 10, d: 22 } },
    { sign: "Scorpio", emoji: "🦂", from: { m: 10, d: 23 }, to: { m: 11, d: 21 } },
    { sign: "Sagittarius", emoji: "🏹", from: { m: 11, d: 22 }, to: { m: 12, d: 21 } },
  ];

  const getZodiac = (m: number, d: number) => {
    return zodiacSigns.find((z) => {
      if (z.from.m === 12 && z.to.m === 1) {
        return (m === 12 && d >= z.from.d) || (m === 1 && d <= z.to.d);
      }
      return (m === z.from.m && d >= z.from.d) || (m === z.to.m && d <= z.to.d);
    }) || zodiacSigns[0];
  };

  const zodiac = getZodiac(birthMonth, birthDay);

  return (
    <CalculatorShell
      title="Age Calculator"
      description="Calculate your exact age in years, months, days, hours, and minutes. Free online age calculator with zodiac sign and birthday countdown."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="font-semibold text-gray-900 dark:text-white">Enter Your Date of Birth</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Year</label>
              <select value={birthYear} onChange={(e) => setBirthYear(Number(e.target.value))}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                {Array.from({ length: 100 }, (_, i) => currentYear - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Month</label>
              <select value={birthMonth} onChange={(e) => setBirthMonth(Number(e.target.value))}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Day</label>
              <select value={birthDay} onChange={(e) => setBirthDay(Number(e.target.value))}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <div className="text-center">
            <div className="text-7xl font-bold text-blue-600 dark:text-blue-400 mb-1">{age}</div>
            <div className="text-lg text-gray-500 mb-1">Years Old</div>
            <div className="text-sm text-gray-400">{age} years, {monthDiff} months, {dayDiff} days</div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{totalDays.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Days</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{totalHours.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Hours</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{totalMinutes.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Minutes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Zodiac & Birthday countdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center gap-4">
          <span className="text-4xl">{zodiac.emoji}</span>
          <div>
            <div className="text-sm text-gray-500">Zodiac Sign</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{zodiac.sign}</div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center gap-4">
          <span className="text-4xl">🎂</span>
          <div>
            <div className="text-sm text-gray-500">Next Birthday</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{daysToBirthday} days</div>
          </div>
        </div>
      </div>
    </CalculatorShell>
  );
}
