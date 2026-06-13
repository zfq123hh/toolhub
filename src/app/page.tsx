import Link from "next/link";
import AdContainer from "@/components/AdContainer";

const tools = [
  {
    title: "Loan Calculator",
    description: "Calculate monthly payments, total interest, and total cost for any loan. Compare different loan terms easily.",
    href: "/loan-calculator",
    icon: "💰",
    category: "Finance",
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Mortgage Calculator",
    description: "Estimate your monthly mortgage payments. Includes principal, interest, taxes, and insurance (PITI).",
    href: "/mortgage-calculator",
    icon: "🏠",
    category: "Finance",
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index and learn what it means for your health. Includes BMI categories and weight status.",
    href: "/bmi-calculator",
    icon: "⚖️",
    category: "Health",
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Calorie Calculator",
    description: "Calculate your daily calorie needs based on age, gender, weight, height, and activity level. Includes BMR and TDEE.",
    href: "/calorie-calculator",
    icon: "🔥",
    category: "Health",
    color: "from-orange-500 to-red-600",
  },
  {
    title: "Investment Calculator",
    description: "Project your investment growth over time with compound interest. Adjust contributions, rate, and time horizon.",
    href: "/investment-calculator",
    icon: "📈",
    category: "Finance",
    color: "from-green-500 to-emerald-600",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Free Online Calculators &amp; Tools
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Fast, accurate, and free online calculators. No sign-up required. Use our tools for
          finance, health, investment planning, and everyday calculations.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">✓ No registration</span>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">✓ Free to use</span>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">✓ Mobile friendly</span>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">✓ Accurate results</span>
        </div>
      </section>

      {/* Ad */}
      <AdContainer slot="1234567890" />

      {/* Tools Grid */}
      <section className="py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Our Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{tool.icon}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.title}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ad */}
      <AdContainer slot="1234567891" />

      {/* Why Section */}
      <section className="py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Use ToolHub?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Instant Results</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Calculations happen in real-time as you type.</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">100% Private</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">All calculations happen in your browser. Nothing is sent to our servers.</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Works Everywhere</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Desktop, tablet, or phone — our tools work on any device.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
