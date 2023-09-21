import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//*   | Get all clients |
export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unathenticated", { status: 401 });

    const clients = await prismadb.client.findMany();

    return NextResponse.json(clients);
  } catch (err: any) {
    console.log("[CLIENTS_GET]", err);
    return new NextResponse(err.message, { status: 500 });
  }
}

//*    | Create a new client |
export async function POST(
  req: Request,
  { params }: {params: {practiceId: string}}
  ) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      firstName,
      lastName,
      gender,
      birthday,
      phone,
      email,
      street,
      city,
      country,
    } = body;

    if (!userId) return new NextResponse("Unathenticated", { status: 401 });

    if (!firstName)
      return new NextResponse("First Name is required", { status: 400 });
    if (!lastName)
      return new NextResponse("Last Name is required", { status: 400 });
    if (!gender) return new NextResponse("Gender is required", { status: 400 });
    if (!birthday)
      return new NextResponse("Birthday is required", { status: 400 });
    if (!phone) return new NextResponse("Phone is required", { status: 400 });
    if (!email) return new NextResponse("Email is required", { status: 400 });
    if (!street) return new NextResponse("Street is required", { status: 400 });
    if (!city) return new NextResponse("City is required", { status: 400 });
    if (!country)
      return new NextResponse("Country is required", { status: 400 });

    const client = await prismadb.client.create({
      data: {
        firstName,
        lastName,
        gender,
        birthday,
        phone,
        email,
        city,
        street,
        country,
        practiceId: params.practiceId,
      },
    });

    return NextResponse.json(client);
  } catch (err: any) {
    console.log("[CLIENTS_POST]", err);
    return new NextResponse(err.message, { status: 500 });
  }
}
