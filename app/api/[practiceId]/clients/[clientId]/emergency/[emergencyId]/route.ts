//create a delete request to delete the emergency contact
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { practiceId: string; clientId: string; emergencyId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unathenticated", { status: 401 });
    }
    if (!params.clientId) {
      return new NextResponse("Client Id is required", { status: 400 });
    }
    if(!params.emergencyId){
      return new NextResponse("Emergency Id is required", {status: 400})
    }

    const practiceByUserId = await prismadb.practice.findFirst({
      where: {
        id: params.practiceId,
        userId,
      },
    });

    if (!practiceByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const emergency = await prismadb.emergencyContact.findFirst({
      where: {
        id: params.emergencyId,
        clientId: params.clientId,
      },
    });

    if (!emergency) {
      return new NextResponse("Emergency contact not found", { status: 404 });
    }

    const deletedEmergency = await prismadb.emergencyContact.delete({
      where: {
        id: params.emergencyId,
      },
    });

    return  NextResponse.json(deletedEmergency, { status: 200 });
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
}
