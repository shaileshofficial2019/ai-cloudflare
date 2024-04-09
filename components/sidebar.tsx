"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { Code, Home, ImageIcon, Languages, LayoutDashboard, MessageSquare, WrapText } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const poppins = Montserrat ({ weight: '600', subsets: ['latin'] });

const routes = [
  {
    label: 'Home',
    icon: Home,
    href: '/',
    color: "text-sky-500"
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-pink-700",
    href: '/image',
  },
  {
    label: 'Text Summarization',
    icon: WrapText,
    color: "text-orange-700",
    href: '/summarize',
  },
  {
    label: 'Translation Generation',
    icon: Languages,
    color: "text-emerald-500",
    href: '/translate',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: "text-green-700",
    href: '/code',
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.svg" sizes="100vw,50vw" />
          </div>
          <h1 className={cn("text-2xl font-bold text-black", poppins.className)}>
            Infinite AI
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href} 
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-black hover:bg-black/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-black/70" : "text-black/50",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
