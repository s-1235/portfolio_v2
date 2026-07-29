"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(json.error ?? "Something went wrong.");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-2xl border border-line bg-surface p-6 text-lg">
        Thanks! Your message is on its way. I&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-5">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Name</span>
          <input
            required
            name="name"
            type="text"
            maxLength={200}
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Email</span>
          <input
            required
            name="email"
            type="email"
            maxLength={320}
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm text-muted">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          minLength={10}
          maxLength={5000}
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent"
        />
      </label>
      {status === "error" && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
