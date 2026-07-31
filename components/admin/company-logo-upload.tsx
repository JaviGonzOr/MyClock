"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Props {
  value: string | null;
  onChange(url: string): void;
}

export default function CompanyLogoUpload({
  value,
  onChange,
}: Props) {
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    try {
      setUploading(true);

      const ext = file.name.split(".").pop();

      const filename =
        crypto.randomUUID() + "." + ext;

      const { error } = await supabase.storage
        .from("company-logos")
        .upload(filename, file, {
          upsert: true,
        });

      if (error) throw error;

      const { data } = supabase.storage
        .from("company-logos")
        .getPublicUrl(filename);

      onChange(data.publicUrl);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">

      {value && (
        <img
          src={value}
          className="h-28 w-28 rounded-3xl border object-cover"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) upload(file);
        }}
      />

      {uploading && (
        <p>Subiendo imagen...</p>
      )}

    </div>
  );
}