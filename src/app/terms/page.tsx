import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto prose dark:prose-invert">
      <h1>Terms of Use</h1>
      <p className="text-sm text-gray-500">Last updated: June 2026</p>

      <h2>Acceptance of Terms</h2>
      <p>By using ToolHub, you agree to these terms of use. If you do not agree, please do not use the site.</p>

      <h2>Use of Service</h2>
      <p>ToolHub provides free online calculators and tools for informational purposes only. All tools are provided &ldquo;as is&rdquo; without warranty of any kind.</p>

      <h2>No Financial Advice</h2>
      <p>The calculators on this site are for educational and illustrative purposes only. They do not constitute financial, medical, or legal advice. Always consult a qualified professional for decisions affecting your health, finances, or legal matters.</p>

      <h2>Accuracy</h2>
      <p>While we strive for accuracy, the results from our calculators may contain errors or inaccuracies. We are not liable for any losses or damages arising from the use of this site.</p>

      <h2>Intellectual Property</h2>
      <p>All content, design, and code on this website are the property of ToolHub unless otherwise noted.</p>

      <h2>Changes</h2>
      <p>We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.</p>
    </div>
  );
}
