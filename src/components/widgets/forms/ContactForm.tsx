"use client";

import { submitContactUs } from "@/actions/notifications";
import { cn } from "@/lib/utils";
import { useActionState } from "react";

const initialState = {
  response: null,
  type: null,
  fullName: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactUs,
    initialState
  );

  return (
    <form action={formAction}>
      {state?.response && (
        <div
          className={cn(
            state.type == "error"
              ? "bg-red-100 text-red-800 border-red-800"
              : "bg-green-100 text-green-800 border-green-800",
            "w-full border-2 px-4 py-2 font-semibold mb-4"
          )}
        >
          {state.response}
        </div>
      )}
      <input
        type="text"
        name="fullName"
        id="fullName"
        placeholder="Full name"
        className="w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-700 rounded-sm"
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        className="w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-700 rounded-sm mt-4"
      />
      <textarea
        name="message"
        id="message"
        placeholder="Message"
        rows={4}
        className="w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-700 rounded-sm mt-4"
      />
      <button
        type="submit"
        disabled={pending}
        className="w-full p-2 md:p-4 bg-zinc-300 rounded-sm mt-4 text-black text-base md:text-xl font-semibold"
      >
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
