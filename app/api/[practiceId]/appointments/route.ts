import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


// create a get request to retreive all appointments for this practice
export async function GET(
  req: Request,
  { params }: { params: { practiceId: string } }
) {
  
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unathenticated", { status: 401 });

    const appointments = await prismadb.appointment.findMany({
      where: { practiceId: params.practiceId },
    });

    return NextResponse.json(appointments);
  } catch (err: any) {
    console.log("[APPOINTMENTS_GET]", err);
    return new NextResponse(err.message, { status: 500 });
  }
}

//create a post request to create a new appointment
export async function POST(
  req: Request,
  { params }: { params: { practiceId: string } }
) {
  console.log("🚀 ~ file: route.ts:32 ~ req:", req) 
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unathenticated", { status: 401 });

    const body = await req.json()
    const {
      id,
      subject,
      description,
      startTime,
      endTime,
      isAllDay,
    } = body

    if (!id) return new NextResponse("Id is required", { status: 400 });
    if (!subject) return new NextResponse("Subject is required", { status: 400 });
    if (!description) return new NextResponse("Description is required", { status: 400 });
    if (!startTime) return new NextResponse("Start Time is required", { status: 400 });
    if (!endTime) return new NextResponse("End Time is required", { status: 400 });
    if (!isAllDay) return new NextResponse("Is All Day is required", { status: 400 });
    
    
      


    const appointment = await prismadb.appointment.create({
      data: {
        id,
        subject,
        description,
        startTime,
        endTime,
        isAllDay,
        clientId: Date.now().toString(),
        practiceId: params.practiceId,
      },
    });

    return NextResponse.json(appointment);
  } catch (err: any) {
    console.log("[APPOINTMENTS_POST]", err);
    return new NextResponse(err.message, { status: 500 });
  }
}
