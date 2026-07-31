import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      password,
      full_name,
      role = "employee",
      company_id = null,
    } = body;

    if (!email || !password || !full_name) {
      return NextResponse.json(
        {
          error: "Faltan datos obligatorios.",
        },
        {
          status: 400,
        }
      );
    }

    // Comprobar si ya existe el email
    const { data: existing } = await admin
      .from("profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        {
          error: "Ya existe un empleado con ese correo.",
        },
        {
          status: 400,
        }
      );
    }

    // Crear usuario en Auth
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error || !data.user) {
      return NextResponse.json(
        {
          error: error?.message ?? "No se pudo crear el usuario.",
        },
        {
          status: 400,
        }
      );
    }

    const user = data.user;

    // Esperar un instante para que el trigger cree el perfil
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Actualizar el perfil creado por el trigger
    const { error: profileError } = await admin
      .from("profiles")
      .update({
        full_name,
        email,
        role,
        company_id,
        active: true,
      })
      .eq("id", user.id);

    if (profileError) {
      await admin.auth.admin.deleteUser(user.id);

      return NextResponse.json(
        {
          error: profileError.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error interno del servidor.",
      },
      {
        status: 500,
      }
    );
  }
}