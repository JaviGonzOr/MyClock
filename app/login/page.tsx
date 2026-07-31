import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 p-4">
      <Card className="w-full max-w-md rounded-[36px] border border-slate-200 bg-white shadow-2xl">
        <CardHeader className="space-y-4 pb-2 text-center">
          <div className="mx-auto">
            <Image
              src="/mi_logo.png"
              alt="MyClock"
              width={220}
              height={220}
              priority
              className="mx-auto"
            />
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
