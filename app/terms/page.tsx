import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Insight - Read our terms and conditions for using our website.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold text-stone-900 mb-6">
        Terms of Service
      </h1>
      <p className="text-sm text-stone-500 mb-8">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="prose prose-stone max-w-none space-y-6 text-stone-700">
        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Agreement to Terms</h2>
          <p>
            By accessing or using Insight ("the Website"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on Insight's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Content</h2>
          <p>
            The content on this website, including articles, images, and other materials, is provided for informational purposes only. We strive to provide accurate and up-to-date information, but we make no warranties or representations regarding the accuracy, completeness, or reliability of any content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">User Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Use the website in any way that violates applicable laws or regulations</li>
            <li>Transmit any harmful, offensive, or illegal content</li>
            <li>Interfere with or disrupt the website or servers</li>
            <li>Attempt to gain unauthorized access to any portion of the website</li>
            <li>Use automated systems to access the website without permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images, and software, is the property of Insight or its content suppliers and is protected by copyright and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Disclaimer</h2>
          <p>
            The materials on Insight's website are provided on an 'as is' basis. Insight makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Limitations</h2>
          <p>
            In no event shall Insight or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Insight's website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Links to Other Websites</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Modifications</h2>
          <p>
            Insight may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with applicable laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us through our website.
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

