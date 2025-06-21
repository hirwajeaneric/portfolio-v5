"use client";

import { submitContactUs } from "@/actions/notifications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ContactSchema, type ContactFormData } from "@/types";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });

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
    setSubmitStatus({ type: null, message: null });

    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("message", data.message);

      const result = await submitContactUs({} as any, formData);
      
      if (result.type === "success") {
        setSubmitStatus({ type: "success", message: result.response });
        reset(); // Clear form on success
      } else {
        setSubmitStatus({ type: "error", message: result.response });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: "error", 
        message: "An unexpected error occurred. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Response Message */}
      {submitStatus.message && (
        <div
          className={cn(
            "w-full rounded-md border-2 px-4 py-3 text-sm font-medium transition-all",
            submitStatus.type === "error"
              ? "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
              : "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200"
          )}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Full Name Field */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          placeholder="Enter your full name"
          className={cn(
            "h-11 rounded-none border-2 border-zinc-300 dark:border-zinc-600",
            errors.fullName && "border-red-500 focus-visible:ring-red-500"
          )}
          disabled={isSubmitting}
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          className={cn(
            "h-11 rounded-none border-2 border-zinc-300 dark:border-zinc-600",
            errors.email && "border-red-500 focus-visible:ring-red-500"
          )}
          disabled={isSubmitting}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell me about your project or inquiry..."
          rows={4}
          className={cn(
            "rounded-none border-2 border-zinc-300 dark:border-zinc-600 resize-none",
            errors.message && "border-red-500 focus-visible:ring-red-500"
          )}
          disabled={isSubmitting}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 text-base font-medium rounded-none"
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
