import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🔧</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            ToolHub
          </span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link href="/loan-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Loan
          </Link>
          <Link href="/mortgage-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Mortgage
          </Link>
          <Link href="/bmi-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            BMI
          </Link>
          <Link href="/calorie-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Calorie
          </Link>
          <Link href="/investment-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Investment
          </Link>
        </nav>
      </div>
    </header>
  );
}
