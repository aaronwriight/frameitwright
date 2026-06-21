"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

async function submitForm(endpoint: string, form: HTMLFormElement) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(new FormData(form))),
  });
  const result = (await response.json()) as { message?: string };
  if (!response.ok) throw new Error(result.message || "Something went wrong. Please try again.");
  return result.message;
}

export function NewsletterSignup() {
  const [subscribeStatus, setSubscribeStatus] = useState<FormStatus>("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [unsubscribeStatus, setUnsubscribeStatus] = useState<FormStatus>("idle");
  const [unsubscribeMessage, setUnsubscribeMessage] = useState("");

  async function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubscribeStatus("submitting");
    setSubscribeMessage("");
    try {
      setSubscribeMessage((await submitForm("/api/newsletter/subscribe", form)) || "You’re on the list—thank you!");
      setSubscribeStatus("success");
      form.reset();
    } catch (error) {
      setSubscribeStatus("error");
      setSubscribeMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  async function handleUnsubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setUnsubscribeStatus("submitting");
    setUnsubscribeMessage("");
    try {
      setUnsubscribeMessage((await submitForm("/api/newsletter/unsubscribe", form)) || "You’ve been unsubscribed.");
      setUnsubscribeStatus("success");
      form.reset();
    } catch (error) {
      setUnsubscribeStatus("error");
      setUnsubscribeMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  const fieldClass =
    "w-full border border-stone-300 bg-transparent px-3 py-2 font-serif text-sm text-stone-900 outline-none focus:border-stone-500 dark:border-stone-700 dark:text-stone-100";

  return (
    <div>
      <form onSubmit={handleSubscribe} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5 text-xs text-stone-500">
            <span className="block lowercase tracking-wider">first name</span>
            <input name="firstName" type="text" autoComplete="given-name" maxLength={80} className={fieldClass} />
          </label>
          <label className="space-y-1.5 text-xs text-stone-500">
            <span className="block lowercase tracking-wider">last name</span>
            <input name="lastName" type="text" autoComplete="family-name" maxLength={80} className={fieldClass} />
          </label>
        </div>

        <label className="block space-y-1.5 text-xs text-stone-500">
          <span className="block lowercase tracking-wider">email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} />
        </label>

        <label className="block space-y-1.5 text-xs text-stone-500">
          <span className="block lowercase tracking-wider">most interested in</span>
          <select name="interest" defaultValue="everything" className={fieldClass}>
            <option value="everything">everything</option>
            <option value="life updates">life updates</option>
            <option value="musings">musings</option>
            <option value="cognitive science">cognitive science</option>
            <option value="photography">photography</option>
            <option value="travel and adventure">travel and adventure</option>
            <option value="faith">faith</option>
          </select>
        </label>

        <label className="hidden" aria-hidden="true">
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>

        <p className="text-xs leading-5 text-stone-500">Occasional Scope for Imagination updates. Unsubscribe whenever you like.</p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={subscribeStatus === "submitting"}
            className="border border-stone-400 px-4 py-2 font-serif text-xs lowercase tracking-widest text-stone-700 hover:border-stone-700 hover:text-stone-950 disabled:cursor-wait disabled:opacity-60 dark:border-stone-600 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:text-stone-100"
          >
            {subscribeStatus === "submitting" ? "joining…" : "join the list"}
          </button>
          {subscribeMessage && (
            <p role="status" className={`text-xs ${subscribeStatus === "error" ? "text-red-700 dark:text-red-400" : "text-stone-500"}`}>
              {subscribeMessage}
            </p>
          )}
        </div>
      </form>

      <form onSubmit={handleUnsubscribe} className="mt-10 border-t border-stone-300 pt-6 dark:border-stone-700">
        <p className="font-serif text-sm lowercase tracking-widest text-stone-700 dark:text-stone-300">unsubscribe</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="unsubscribe-email">Email</label>
          <input id="unsubscribe-email" name="email" type="email" autoComplete="email" required placeholder="email address" className={fieldClass} />
          <button
            type="submit"
            disabled={unsubscribeStatus === "submitting"}
            className="whitespace-nowrap border border-stone-300 px-4 py-2 font-serif text-xs lowercase tracking-widest text-stone-500 hover:border-stone-500 hover:text-stone-800 disabled:cursor-wait disabled:opacity-60 dark:border-stone-700 dark:hover:border-stone-500 dark:hover:text-stone-200"
          >
            {unsubscribeStatus === "submitting" ? "removing…" : "unsubscribe"}
          </button>
        </div>
        {unsubscribeMessage && (
          <p role="status" className={`mt-3 text-xs ${unsubscribeStatus === "error" ? "text-red-700 dark:text-red-400" : "text-stone-500"}`}>
            {unsubscribeMessage}
          </p>
        )}
      </form>
    </div>
  );
}
