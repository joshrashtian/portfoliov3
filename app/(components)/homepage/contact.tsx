"use client";
import { useState } from "react";
import { Playwrite_US_Modern } from "next/font/google";

const playwrite = Playwrite_US_Modern({ weight: "400" });

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
    <div className="relative h-full w-full overflow-hidden rounded-xl border-2 border-black bg-stone-50 p-6 sm:p-10 lg:p-14 dark:border-white dark:bg-zinc-950 flex flex-col justify-center">
      <div className="relative z-10 -rotate-3 flex flex-wrap items-start justify-between gap-4">
        <span className={`inline-flex items-center gap-2 rounded-full ${playwrite.className} bg-black px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black`}>
          Send Me A Postcard!
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 mt-8 grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto_240px]"
      >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="font-climate-crisis text-lg uppercase tracking-wide"
            >
              Your Message
            </label>
            <textarea
              id="message"
              required
              rows={7}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full resize-none bg-[repeating-linear-gradient(transparent,transparent_31px,rgba(0,0,0,0.15)_32px)] leading-[32px] text-lg text-zinc-800 outline-none dark:bg-[repeating-linear-gradient(transparent,transparent_31px,rgba(255,255,255,0.15)_32px)] dark:text-zinc-200"
            />
          </div>

          <div className="hidden border-l-2 border-dashed border-black/30 sm:block dark:border-white/20" />

          <div className="flex flex-col gap-6">
            <div className={`ml-auto flex h-24 w-24 rotate-3 rounded-full shrink-0 items-center justify-center border-2 border-dashed border-black/40 text-center text-[10px] uppercase leading-tight  text-black/40 dark:border-white/30 dark:text-white/40 ${playwrite.className}`}>
              Place Stamp Here
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
                >
                  From
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="border-b border-black/30 bg-transparent py-1 text-sm outline-none focus:border-orange-400 dark:border-white/30"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
                >
                  Return Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="border-b border-black/30 bg-transparent py-1 text-sm outline-none focus:border-orange-400 dark:border-white/30"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="subject"
                  className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Let's work together"
                  className="border-b border-black/30 bg-transparent py-1 text-sm outline-none focus:border-orange-400 dark:border-white/30"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:col-span-3">
            <button
              type="submit"
              disabled={status === "loading"}
              className="-skew-x-12 self-start rounded-lg bg-orange-400 px-6 py-2 font-header text-sm font-bold text-black transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
            >
              <span className="block skew-x-12">
                {status === "loading" ? "Sending..." : "Send Postcard"}
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
          </div>
      </form>
    </div>
  );
}
