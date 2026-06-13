"use client";

import { useState, useEffect } from "react";
import CalculatorShell from "@/components/CalculatorShell";

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "MXN", name: "Mexican Peso", symbol: "MX$" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "TWD", name: "Taiwan Dollar", symbol: "NT$" },
];

// Fallback rates (approximate)
const fallbackRates: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, CNY: 7.24,
  AUD: 1.54, CAD: 1.37, CHF: 0.89, HKD: 7.82, SGD: 1.35,
  KRW: 1320, INR: 83.5, MXN: 17.2, BRL: 5.05, TWD: 32.1,
};

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("CNY");
  const [rates, setRates] = useState<Record<string, number>>(fallbackRates);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.frankfurter.app/latest?from=USD")
      .then((r) => r.json())
      .then((data) => {
        if (data.rates) setRates({ ...data.rates, USD: 1 });
      })
      .catch(() => { /* use fallback */ })
      .finally(() => setLoading(false));
  }, []);

  const fromRate = rates[from] || 1;
  const toRate = rates[to] || 1;
  const result = (amount / fromRate) * toRate;

  return (
    <CalculatorShell
      title="Currency Converter"
      description="Convert between 15 major world currencies with real-time exchange rates. Free currency converter for USD, EUR, GBP, CNY, JPY, and more."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-2xl font-bold text-gray-900 dark:text-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>{c.symbol} {c.code} - {c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To</label>
              <select value={to} onChange={(e) => setTo(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>{c.symbol} {c.code} - {c.name}</option>
                ))}
              </select>
            </div>
          </div>
          {loading && <p className="text-xs text-gray-400">Loading live rates... (using approximate rates if API unavailable)</p>}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {amount.toLocaleString()} {from} =
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
          <div className="text-xl text-gray-700 dark:text-gray-300">{to}</div>
          <div className="text-xs text-gray-400 mt-4">
            1 {from} = {(1 / fromRate * toRate).toFixed(6)} {to}
          </div>
          <div className="flex gap-2 mt-4 flex-wrap justify-center">
            {[100, 500, 1000, 5000].map((v) => (
              <button key={v} onClick={() => setAmount(v)}
                className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>
    </CalculatorShell>
  );
}
