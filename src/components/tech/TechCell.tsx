"use client";

import type { IconType } from "react-icons";
import { FaReact, FaNodeJs, FaCss3Alt, FaGithub, FaExternalLinkAlt, FaJava } from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiNestjs,
  SiPostgresql,
} from "react-icons/si";

const REGISTRY: Record<string, IconType> = {
  react: FaReact,
  typescript: SiTypescript,
  css: FaCss3Alt,
  github: FaGithub,
  demo: FaExternalLinkAlt,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  shadcn: SiShadcnui,
  nestjs: SiNestjs,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  nodejs: FaNodeJs,
  java: FaJava,
};

function resolveKey(iconKey?: string, name?: string) {
  const raw = (iconKey || name || "").toLowerCase().replace(/\s+/g, "").replace(/\./g, "");
  if (REGISTRY[raw]) return raw;
  if (raw.includes("react")) return "react";
  if (raw.includes("typescript")) return "typescript";
  if (raw.includes("next")) return "nextjs";
  if (raw.includes("tailwind")) return "tailwind";
  if (raw.includes("nest")) return "nestjs";
  if (raw.includes("postgres")) return "postgresql";
  if (raw.includes("mongo")) return "mongodb";
  if (raw.includes("node")) return "nodejs";
  if (raw.includes("java") && !raw.includes("javascript")) return "java";
  if (raw.includes("github")) return "github";
  return "demo";
}

export function TechCell({ name, iconKey }: { name: string; iconKey?: string }) {
  const key = resolveKey(iconKey, name);
  const Icon = REGISTRY[key] ?? FaGithub;
  return (
    <div className="relative flex flex-col items-center justify-center p-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300 cursor-default">
      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-zinc-700 dark:text-zinc-300 group-hover:scale-110 transition-transform duration-300" />
      <span className="mt-2 text-[10px] sm:text-xs text-center text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors duration-300 line-clamp-2 leading-tight">
        {name}
      </span>
    </div>
  );
}
