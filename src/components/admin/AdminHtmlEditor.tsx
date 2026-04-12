"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/lib/stores/auth-store";
import "jodit/es2021/jodit.min.css"; /* peer: `jodit` package */

const JoditEditor = dynamic(() => import("jodit-react").then((m) => m.default), {
  ssr: false,
  loading: () => <Skeleton className="h-[min(420px,50vh)] w-full rounded-md" />,
});

type UploadJson = { secure_url?: string; error?: string };

function joditUploadFail(messages: string[]) {
  return {
    success: false as const,
    time: new Date().toISOString(),
    data: { files: [] as string[], baseurl: "", messages },
  };
}

function joditUploadOk(urls: string[]) {
  return {
    success: true as const,
    time: new Date().toISOString(),
    data: {
      files: urls,
      baseurl: "",
      isImages: urls.map(() => true),
    },
  };
}

export function AdminHtmlEditor({
  id,
  label,
  value,
  onChange,
  minHeight = 420,
  placeholder,
  uploadFolder = "portfolio",
}: {
  id?: string;
  label: string;
  value: string;
  onChange: (html: string) => void;
  minHeight?: number;
  placeholder?: string;
  /** Cloudinary folder segment for `POST /api/admin/uploads/image`. */
  uploadFolder?: string;
}) {
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder ?? "Write content…",
      height: minHeight,
      toolbarAdaptive: true,
      toolbarSticky: true,
      spellcheck: true,
      language: "en",
      removeButtons: ["about", "file", "print"],
      imageDefaultWidth: 560,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_clear_html" as const,
      uploader: {
        insertImageAsBase64URI: false,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "webp", "svg"],
        withCredentials: true,
        url: "/api/admin/uploads/image",
        customUploadFunction: async (requestData: FormData, showProgress: (progress: number) => void) => {
          const files: File[] = [];
          for (const [, v] of requestData.entries()) {
            if (v instanceof File) files.push(v);
          }
          if (files.length === 0) return joditUploadFail(["No file to upload"]);

          const token = useAuthStore.getState().csrfToken;
          const urls: string[] = [];

          for (let i = 0; i < files.length; i += 1) {
            const file = files[i];
            const fd = new FormData();
            fd.append("file", file);
            fd.append("folder", uploadFolder);
            showProgress(5 + Math.round((90 * (i + 1)) / files.length));
            const res = await fetch("/api/admin/uploads/image", {
              method: "POST",
              body: fd,
              credentials: "include",
              headers: token ? { "X-CSRF-Token": token } : {},
            });
            const json = (await res.json()) as UploadJson;
            if (!res.ok || !json.secure_url) {
              return joditUploadFail([json.error || "Upload failed"]);
            }
            urls.push(json.secure_url);
          }
          showProgress(100);
          return joditUploadOk(urls);
        },
      },
    }),
    [minHeight, placeholder, uploadFolder]
  );

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="overflow-hidden rounded-md border border-input bg-background">
        <JoditEditor value={value} config={config} onChange={onChange} tabIndex={0} />
      </div>
    </div>
  );
}
