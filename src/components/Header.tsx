import Link from "next/link";

import {
  ArrowLeftRight,
} from "lucide-react";

import { cn } from "@/lib/utils";

import ProfileButton from "./ProfileButton";


export default function Header() {
  return (
    <aside className="flex h-screen flex-col justify-between px-6 py-6">
      <div className="flex flex-col gap-2">
        <div className="p-2">
          <Link href="/">
            <HeaderButton Icon={ArrowLeftRight} text="Switch User" active />
          </Link>
        </div>
        {
    
        }
      </div>
      <ProfileButton />
    </aside>
  );
}

type HeaderButtonProps = {
  Icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number | string;
  }>;
  text: string;
  active?: boolean;
};

function HeaderButton({ Icon, text, active }: HeaderButtonProps) {
  return (
    <button className="group w-full">
      <div
        className="flex w-fit items-center gap-4 rounded-full p-2 transition-colors duration-300 group-hover:bg-gray-200 lg:pr-4"
      >
        <div className="grid h-[40px] w-[40px] place-items-center">
          <Icon
            // now that we defined the interface for Icon, we can pass in the size and strokeWidth props safely
            size={26}
            strokeWidth={active ? 3 : 2}
          />
        </div>
        <span
          className={cn("text-xl max-lg:hidden", active && "font-bold")}
        >
          {text}
        </span>
      </div>
    </button>
  );
}
