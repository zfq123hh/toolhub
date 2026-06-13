export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">ToolHub</h3>
            <p>Free online calculators and tools for everyday use. Fast, accurate, and easy to use.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tools</h3>
            <ul className="space-y-1">
              <li><a href="/loan-calculator" className="hover:text-blue-600 dark:hover:text-blue-400">Loan Calculator</a></li>
              <li><a href="/mortgage-calculator" className="hover:text-blue-600 dark:hover:text-blue-400">Mortgage Calculator</a></li>
              <li><a href="/retirement-calculator" className="hover:text-blue-600 dark:hover:text-blue-400">Retirement Calculator</a></li>
              <li><a href="/salary-calculator" className="hover:text-blue-600 dark:hover:text-blue-400">Salary Calculator</a></li>
              <li><a href="/bmi-calculator" className="hover:text-blue-600 dark:hover:text-blue-400">BMI Calculator</a></li>
              <li><a href="/currency-converter" className="hover:text-blue-600 dark:hover:text-blue-400">Currency Converter</a></li>
              <li><a href="/date-calculator" className="hover:text-blue-600 dark:hover:text-blue-400">Date Calculator</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Legal</h3>
            <ul className="space-y-1">
              <li><a href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} ToolHub. All rights reserved. This site is for informational purposes only.
        </div>
      </div>
    </footer>
  );
}
