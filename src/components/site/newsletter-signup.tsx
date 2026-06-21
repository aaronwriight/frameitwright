"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function NewsletterSignup() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) throw new Error(result.message || "Something went wrong. Please try again.");

      setStatus("success");
      setMessage(result.message || "You’re on the list—thank you!");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5 text-xs text-stone-500">
          <span className="block lowercase tracking-wider">first name</span>
          <input
            name="firstName"
            type="text"
            autoComplete="given-name"
            maxLength={80}
            className="w-full border border-stone-300 bg-transparent px-3 py-2 font-serif text-sm text-stone-900 outline-none focus:border-stone-500 dark:border-stone-700 dark:text-stone-100"
          />
        </label>
        <label className="space-y-1.5 text-xs text-stone-500">
          <span className="block lowercase tracking-wider">email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            className="w-full border border-stone-300 bg-transparent px-3 py-2 font-serif text-sm text-stone-900 outline-none focus:border-stone-500 dark:border-stone-700 dark:text-stone-100"
          />
        </label>
      </div>

      <label className="block space-y-1.5 text-xs text-stone-500">
        <span className="block lowercase tracking-wider">most interested in</span>
        <select
          name="interest"
          defaultValue="everything"
          className="w-full border border-stone-300 bg-transparent px-3 py-2 font-serif text-sm text-stone-900 outline-none focus:border-stone-500 dark:border-stone-700 dark:text-stone-100"
        >
          <option value="everything">everything</option>
          <option value="life updates">life updates</option>
          <option value="musings">musings</option>
          <option value="cognitive science">cognitive science</option>
          <option value="photography, travel & adventure">photography, travel &amp; adventure</option>
          <option value="faith">faith</option>
        </select>
      </label>

      <label className="hidden" aria-hidden="true">
        Company
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="flex items-start gap-2 text-xs leading-5 text-stone-500">
        <input name="consent" type="checkbox" value="yes" required className="mt-1" />
        <span>I’d like occasional Scope for Imagination updates by email. I can unsubscribe anytime.</span>
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="border border-stone-400 px-4 py-2 font-serif text-xs lowercase tracking-widest text-stone-700 hover:border-stone-700 hover:text-stone-950 disabled:cursor-wait disabled:opacity-60 dark:border-stone-600 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:text-stone-100"
        >
          {status === "submitting" ? "joining…" : "join the list"}
        </button>
        {message && (
          <p role="status" className={`text-xs ${status === "error" ? "text-red-700 dark:text-red-400" : "text-stone-500"}`}>
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
