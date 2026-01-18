"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // TODO: Implement actual newsletter signup integration
    // For now, show a message that signup is coming soon
    setStatus("success");
    setEmail("");
    
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <form className="mt-4 flex flex-col sm:flex-row gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-3 py-2.5 text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
        required
      />
      <button
        type="submit"
        className="px-4 py-2.5 text-sm font-medium text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors whitespace-nowrap"
      >
        Subscribe
      </button>
      {status === "success" && (
        <span className="absolute mt-12 sm:mt-14 text-xs text-green-600">
          Thank you! Newsletter signup coming soon.
        </span>
      )}
    </form>
  );
}

