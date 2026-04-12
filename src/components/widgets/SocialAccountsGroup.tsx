import Link from "next/link";
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { ArrowRightIcon } from "lucide-react";
import { FaYoutube } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa";
import type { SocialLink } from "@/lib/db-queries";

export default function SocialAccountsGroup({ accounts }: { accounts: SocialLink[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 w-full justify-between">
      {accounts.map((account) => (
        <Link
          key={account.name + account.url}
          href={account.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 md:gap-6 w-full p-2 md:p-4 bg-zinc-800 border border-zinc-700 group hover:bg-zinc-700 transition-transform duration-300"
        >
          <div className="flex items-center">
            {account.name.toLowerCase().includes("linkedin") && (
              <LinkedInLogoIcon className="text-zinc-300 w-8 h-8 hover:text-zinc-900 transition-all duration-300" />
            )}
            {account.name.toLowerCase().includes("github") && <GitHubLogoIcon className="text-zinc-300 w-8 h-8 hover:text-zinc-900 transition-all duration-300" />}
            {account.name.toLowerCase().includes("instagram") && (
              <InstagramLogoIcon className="text-zinc-300 w-8 h-8 hover:text-zinc-900 transition-all duration-300" />
            )}
            {account.name.toLowerCase().includes("medium") && <FaMedium className="text-zinc-300 w-8 h-8 hover:text-zinc-900 transition-all duration-300" />}
            {account.name.toLowerCase().includes("youtube") && <FaYoutube className="text-zinc-300 w-8 h-8 hover:text-zinc-900 transition-all duration-300" />}
            <span className="ml-4 text-zinc-300 uppercase">{account.name}</span>
          </div>
          <ArrowRightIcon className="group-hover:-rotate-45 transition-transform duration-300 text-zinc-300 hover:text-zinc-900 transition-all duration-300" />
        </Link>
      ))}
    </div>
  );
}
