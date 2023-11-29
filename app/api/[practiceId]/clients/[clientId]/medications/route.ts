import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(
  req: Request,
  { params }: { params: { practiceId: string; clientId: string } }
) {
  try {
    const { userId } = auth();

    //check if the user is authenticated
    if (!userId) return new NextResponse("Unathenticated", { status: 401 });
    if (!params.clientId)
      return new NextResponse("Client Id is required", { status: 400 });

    const practiceByUserId = await prismadb.practice.findFirst({
      where: {
        id: params.practiceId,
        userId,
      },
    });

    if (!practiceByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const body = await req.json();

    const { drugName, dosage, frequency } = body;

    if (!drugName || !dosage || !frequency) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const addToClient = await prismadb.medication.create({
      data: {
        name: drugName,
        dosage,
        frequency,
        clientId: params.clientId,
      },
    });

    return NextResponse.json(addToClient);
  } catch (err: any) {
    console.log("[DISORDERS_POST]", err);
    return new NextResponse(err, { status: 500 });
  }
}

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

    const updatedClient = await prismadb.client.update({
      where: {
        id: params.clientId,
      },
      data: {
        medications: {
          disconnect: {
            id: params.medicationId,
          },
        },
      },
    });
    console.log(updatedClient);

    return new NextResponse("Updated!", { status: 200 });
  } catch (err: any) {
    console.log("[DISORDERS_POST]", err);
    return new NextResponse(err, { status: 500 });
  }
}
