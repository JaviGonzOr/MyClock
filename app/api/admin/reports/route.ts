import { NextResponse } from "next/server";

import { getMonthlyReports } from "@/services/report.service";

export async function GET() {
  try {
    const reports = await getMonthlyReports();

    return NextResponse.json(reports);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudieron obtener los informes",
      },
      {
        status: 500,
      }
    );
  }
}