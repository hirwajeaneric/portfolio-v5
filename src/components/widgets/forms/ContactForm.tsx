"use client";

import { submitContactUs } from "@/actions/notifications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, Send } from "lucide-react";
import { useFormState } from "react-dom";

const initialState = {
  response: null,
  type: null,
  fullName: undefined,
  email: undefined,
  message: undefined,
};

export default function ContactForm() {
  const [state, formAction, pending] = useFormState(
    submitContactUs,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      {/* Response Message */}
      {state?.response && (
        <div
          className={cn(
            "w-full rounded-md border-2 px-4 py-3 text-sm font-medium transition-all",
            state.type === "error"
              ? "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
              : "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200"
          )}
        >
          {state.response}
        </div>
      )}

      {/* Full Name Field */}
      <div className="space-y-2">
        <label 
          htmlFor="fullName" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Full Name
        </label>
        <Input
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Enter your full name"
          className={cn(
            "h-11 rounded-none border-2 border-zinc-300 dark:border-zinc-600",
            state?.fullName && "border-red-500 focus-visible:ring-red-500"
          )}
          disabled={pending}
        />
        {state?.fullName && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {state.fullName[0]}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label 
          htmlFor="email" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Email Address
        </label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email address"
          className={cn(
            "h-11 rounded-none border-2 border-zinc-300 dark:border-zinc-600",
            state?.email && "border-red-500 focus-visible:ring-red-500"
          )}
          disabled={pending}
        />
        {state?.email && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {state.email[0]}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label 
          htmlFor="message" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Message
        </label>
        <textarea
          name="message"
          id="message"
          placeholder="Tell me about your project or inquiry..."
          rows={4}
          className={cn(
            "flex w-full rounded-none border-2 border-zinc-300 dark:border-zinc-600 bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
            state?.message && "border-red-500 focus-visible:ring-red-500"
          )}
          disabled={pending}
        />
        {state?.message && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {state.message[0]}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={pending}
        className="w-full h-11 text-base font-medium rounded-none"
        size="lg"
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
