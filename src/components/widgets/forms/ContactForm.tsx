"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { ContactSchema, type ContactFormData } from "@/types";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        toast.error(payload.error || "Request failed");
        return;
      }
      toast.success(payload.message || "Message sent.");
      reset();
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name Field */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-zinc-300">Full Name</Label>
        <Input
          id="fullName"
          placeholder="Enter your full name"
          className={cn(
            "h-11 rounded-none border-2 border-zinc-300",
            errors.fullName && "border-red-500 focus-visible:ring-red-500"
          )}
          disabled={isSubmitting}
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-sm text-red-600">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          className={cn(
            "h-11 rounded-none border-2 border-zinc-300",
            errors.email && "border-red-500 focus-visible:ring-red-500"
          )}
          disabled={isSubmitting}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-zinc-300">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell me about your project or inquiry..."
          rows={4}
          className={cn(
            "rounded-none border-2 border-zinc-300 resize-none",
            errors.message && "border-red-500 focus-visible:ring-red-500"
          )}
          disabled={isSubmitting}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-red-600">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 text-base font-medium rounded-none bg-zinc-300 text-zinc-900 hover:bg-zinc-700 hover:text-zinc-300 transition-all duration-300"
        size="lg"
      >
        {isSubmitting ? (
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
