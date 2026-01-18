import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Insight - Your trusted source for jobs, news, education, and technology.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold text-stone-900 mb-6">
        About Insight
      </h1>

      <div className="prose prose-stone max-w-none space-y-6 text-stone-700">
        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Our Mission</h2>
          <p>
            Insight is your trusted source for the latest in jobs, education, scholarships, and technology news. We are committed to providing quality, informative content that helps you stay informed and make better decisions for your career and personal growth.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Latest job opportunities and career advice</li>
            <li>Educational resources and scholarship information</li>
            <li>Technology news and trends</li>
            <li>In-depth articles and analysis</li>
            <li>Regular updates to keep you informed</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Our Commitment</h2>
          <p>
            We strive to deliver accurate, timely, and valuable content to our readers. Our team works diligently to ensure that the information we provide is reliable and relevant to your needs.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Contact Us</h2>
          <p>
            We value your feedback and suggestions. If you have any questions, comments, or concerns, please feel free to reach out to us through our website.
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

