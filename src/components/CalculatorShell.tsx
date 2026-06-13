import AdContainer from "./AdContainer";

interface CalculatorShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function CalculatorShell({ title, description, children }: CalculatorShellProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4 no-print">
        <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</a>
        <span className="mx-2">›</span>
        <span className="text-gray-900 dark:text-white">{title}</span>
      </nav>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
        {description}
      </p>

      {/* Tool Content */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 shadow-sm">
        {children}
      </div>

      {/* Ad */}
      <AdContainer slot="1234567892" />
    </div>
  );
}
