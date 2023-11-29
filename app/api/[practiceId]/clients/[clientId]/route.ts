//Create a patch request for the route

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { practiceId: string; clientId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    //Destucture the body that contains a Client object
    const { firstName, lastName, gender, birthday, phone, email, country } =
      body;

    //check if the user is authenticated
    if (!userId) {
      return new NextResponse("Unathenticated", { status: 401 });
    }
    if (!firstName) {
      return new NextResponse("First Name is required", { status: 400 });
    }
    if (!lastName) {
      return new NextResponse("Last Name is required", { status: 400 });
    }
    if (!gender) {
      return new NextResponse("Gender is required", { status: 400 });
    }
    if (!birthday) {
      return new NextResponse("Birthday is required", { status: 400 });
    }
    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    if (!country) {
      return new NextResponse("Country is required", { status: 400 });
    }

    //check if userid matches the practiceid
    const practiceByUserId = await prismadb.practice.findFirst({
      where: {
        id: params.practiceId,
        userId,
      },
    });

    if (!practiceByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    //update the client
    const client = await prismadb.client.update({
      where: {
        id: params.clientId,
      },
      data: {
        firstName,
        lastName,
        gender,
        birthday,
        phone,
        email,
        country,
      },
    });

    //return the updated client
    return NextResponse.json(client);
  } catch (err: any) {
    console.log("[CLIENTS_PATCH]", err);
    return new NextResponse(err.message, { status: 500 });
  }
}

//create a delete request
export async function DELETE(
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

    //delete the client
    const client = await prismadb.client.deleteMany({
      where: {
        id: params.clientId,
      },
    });
    console.log(params.clientId);

    //return the deleted client
    return NextResponse.json(client);
  } catch (err: any) {
    console.log("[CLIENTS_DELETE]", err);
    return new NextResponse(err.message, { status: 500 });
  }
}
