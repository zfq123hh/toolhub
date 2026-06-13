import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto prose dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-gray-500">Last updated: June 2026</p>

      <h2>Information We Collect</h2>
      <p>ToolHub does not collect, store, or transmit any personal information. All calculations are performed entirely in your browser using client-side JavaScript. No data is sent to our servers.</p>

      <h2>Third-Party Services</h2>
      <p>We use Google AdSense to display advertisements. Google may use cookies to serve relevant ads. You can learn more about how Google uses your data at <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy &amp; Terms</a>.</p>
      <p>We use Google Analytics to understand anonymous usage patterns. This collects non-personal information such as page views, browser type, and device type.</p>

      <h2>Cookies</h2>
      <p>We use minimal cookies required for Google AdSense and Google Analytics functionality. You can disable cookies in your browser settings.</p>

      <h2>Changes to This Policy</h2>
      <p>We may update this privacy policy from time to time. Changes will be posted on this page.</p>

      <h2>Contact</h2>
      <p>If you have questions about this privacy policy, please contact us at privacy@toolhub.example.com.</p>
    </div>
  );
}
