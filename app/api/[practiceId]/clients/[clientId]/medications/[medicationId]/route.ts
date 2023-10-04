//create a function that deletes a medication
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { practiceId: string; clientId: string; medicationId: string } }
) {
  try {
    const { userId } = auth();

    //check if the user is authenticated
    if (!userId) return new NextResponse("Unathenticated", { status: 401 });

    const practiceByUserId = await prismadb.practice.findFirst({
      where: {
        id: params.practiceId,
        userId,
      },
    });

    if (!practiceByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const deleteMedication = await prismadb.medication.delete({
      where: {
        id: params.medicationId,
        clientId: params.clientId,
      },
    });

    return NextResponse.json(deleteMedication);
  } catch (err: any) {
    console.log("[MEDICATIONS_DELETE]", err);
    return new NextResponse(err, { status: 500 });
  }
}