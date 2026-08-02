"use client";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, subject, message }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setEmail("");
      setName("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full sm:flex-row sm:gap-10">

      <form
        onSubmit={handleSubmit}

      >
        <div className="flex flex-col  gap-1">
          <label htmlFor="email" className="text-lg font-bold">
            Your Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="rounded-md border w-96 border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="subject" className="text-lg   font-bold">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Let's work together"
            className="rounded-md border w-96 border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-lg   font-bold">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="rounded-md border w-96 border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="text-lg font-bold">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's on your mind?"
            className="rounded-md border w-96 border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 -skew-x-12 rounded-lg bg-orange-400 px-4 py-2 font-header text-sm font-bold text-black transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
        >
          <span className="skew-x-12 block">
            {status === "loading" ? "Sending..." : "Send Message"}
          </span>
        </button>

        {status === "success" && (
          <p className="text-sm text-green-600 dark:text-green-400">
            Message sent! I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
