"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

type Props = {
  name: string;
  subtitle: string;
};

export function UserMenu({
  name,
  subtitle,
}: Props) {
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <Menu
      as="div"
      className="relative"
    >
      <Menu.Button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 transition hover:bg-slate-50">
        <Image
          src="/mi_logo.png"
          alt="Logo"
          width={38}
          height={38}
          className="rounded-full"
        />

        <div className="text-left">
          <p className="font-semibold text-slate-900">
            {name}
          </p>

          <p className="text-xs text-slate-500">
            {subtitle}
          </p>
        </div>

        <ChevronDown
          size={18}
          className="text-slate-500"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition duration-150"
        enterFrom="scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition duration-100"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl focus:outline-none">

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => router.push("/admin/profile")}
                className={`flex w-full items-center gap-3 px-5 py-4 text-slate-700 transition ${
                  active ? "bg-slate-100" : ""
                }`}
              >
                <User size={18} />
                Mi perfil
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => router.push("/admin/settings")}
                className={`flex w-full items-center gap-3 px-5 py-4 text-slate-700 transition ${
                  active ? "bg-slate-100" : ""
                }`}
              >
                <Settings size={18} />
                Ajustes
              </button>
            )}
          </Menu.Item>

          <div className="border-t border-slate-200" />

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={logout}
                className={`flex w-full items-center gap-3 px-5 py-4 text-red-600 transition ${
                  active ? "bg-red-50" : ""
                }`}
              >
                <LogOut size={18} />
                Cerrar sesión
              </button>
            )}
          </Menu.Item>

        </Menu.Items>
      </Transition>
    </Menu>
  );
}