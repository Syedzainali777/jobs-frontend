import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Insight - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold text-stone-900 mb-6">
        Privacy Policy
      </h1>
      <p className="text-sm text-stone-500 mb-8">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="prose prose-stone max-w-none space-y-6 text-stone-700">
        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Introduction</h2>
          <p>
            Welcome to Insight ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Information We Collect</h2>
          <h3 className="text-lg font-medium text-stone-900 mt-6 mb-3">Information You Provide</h3>
          <p>
            We may collect information that you voluntarily provide to us, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Email address (when you subscribe to our newsletter)</li>
            <li>Name and contact information (if you contact us)</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3 className="text-lg font-medium text-stone-900 mt-6 mb-3">Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain information, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Pages you visit and time spent on pages</li>
            <li>Referring website addresses</li>
            <li>Device information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Provide, maintain, and improve our website</li>
            <li>Send you newsletters and updates (with your consent)</li>
            <li>Respond to your inquiries and requests</li>
            <li>Analyze website usage and trends</li>
            <li>Ensure website security and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Third-Party Services</h2>
          <p>
            We may use third-party services that collect, monitor, and analyze information, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong>Google Analytics:</strong> To understand how visitors use our website</li>
            <li><strong>Google AdSense:</strong> To display advertisements on our website</li>
            <li><strong>Email Service Providers:</strong> To manage newsletter subscriptions</li>
          </ul>
          <p className="mt-4">
            These third parties have their own privacy policies. We encourage you to review them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our website.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-stone-200">
        <Link
          href="/"
          className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

