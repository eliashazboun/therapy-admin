import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

//create a get request that retreives all the disorders
export async function GET(
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

    const disorders = prismadb.disorders.findMany();

    return NextResponse.json(disorders);
  } catch (err: any) {
    console.log("[DISORDERS_GET]", err);
    return new NextResponse(err, { status: 500 });
  }
}

//create a post request that adds a disorder to the client
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

    const { disorderId } = body;

    const updatedClient = await prismadb.client.update({
      where: {
        id: params.clientId,
      },
      data: {
        disorders: {
          connect: {
            id: disorderId,
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

//create a function that deletes a disorder from a client
export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { practiceId: string; clientId: string; disorderId: string } }
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

    const { disorderId } = body;

    const updatedClient = await prismadb.client.update({
      where: {
        id: params.clientId,
      },
      data: {
        disorders: {
          disconnect: {
            id: disorderId,
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
