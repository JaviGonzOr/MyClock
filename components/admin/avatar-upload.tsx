"use client";

import { useState } from "react";

import Image from "next/image";

import { Camera } from "lucide-react";

import { uploadAvatar } from "@/services/storage.service";
import { employeeService } from "@/services/employee.service";

type Props = {
  id: string;
  avatar: string | null;
};

export function AvatarUpload({
  id,
  avatar,
}: Props) {
  const [image, setImage] =
    useState(avatar);

  const [loading, setLoading] =
    useState(false);

  async function change(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);

      const url =
        await uploadAvatar(
          id,
          file
        );

      await employeeService.updateAvatar(
        id,
        url
      );

      setImage(url);

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="flex flex-col items-center gap-4">

      <div className="relative">

        <Image
          src={
            image ??
            "/avatar-placeholder.png"
          }
          alt=""
          width={130}
          height={130}
          className="rounded-full border-4 border-slate-200 object-cover"
        />

        <label className="absolute bottom-1 right-1 cursor-pointer rounded-full bg-violet-600 p-3 text-white shadow-lg">

          <Camera size={18} />

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={change}
          />

        </label>

      </div>

      {loading && (
        <p className="text-sm text-slate-500">
          Subiendo imagen...
        </p>
      )}

    </div>
  );
}