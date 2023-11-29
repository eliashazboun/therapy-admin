import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { v4 as uuidv4 } from "uuid";

// create a get request to retreive all appointments for this practice

//create a post request to create a new appointment
export async function POST(
  req: Request,
  { params }: { params: { practiceId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unathenticated", { status: 401 });

    const body = await req.json();
    console.log(body);
    if (
      body.action === "insert" ||
      (body.action === "batch" && body.added.length > 0)
    ) {
      const appointmentInfo =
        body.action === "insert" ? body.value : body.added[0];

      //find the name of the client from their id
      const client = await prismadb.client.findUnique({
        where: { id: appointmentInfo.clientId },
      });

      if (!client) return new NextResponse("Client not found", { status: 404 });

      const fullName = client.firstName + " " + client.lastName;

      const appointment = await prismadb.appointment.create({
        data: {
          startTime: new Date(appointmentInfo.startTime),
          endTime: new Date(appointmentInfo.endTime),
          id: uuidv4(),
          practiceId: params.practiceId,
          clientId: appointmentInfo.clientId,
          clientName: fullName,
          notes: appointmentInfo.notes || "No Notes.",
        },
      });
      return NextResponse.json(appointment);
    }

    if (
      body.action === "update" ||
      (body.action === "batch" && body.changed.length > 0)
    ) {
      const appointmentInfo =
        body.action === "update" ? body.value : body.changed[0];
      console.log("appointmentInfo", appointmentInfo);
      const appointment = await prismadb.appointment.update({
        where: { id: appointmentInfo.Id },
        data: {
          startTime: new Date(appointmentInfo.StartTime),
          endTime: new Date(appointmentInfo.EndTime),
          isAllDay: appointmentInfo.IsAllDay,
          notes: appointmentInfo.notes,
        },
      });
      return NextResponse.json(appointment);
    }

    if (
      body.action === "remove" ||
      (body.action === "batch" && body.deleted.length > 0)
    ) {
      const appointmentInfo =
        body.action === "remove" ? body.value : body.deleted[0];
      const appointment = await prismadb.appointment.delete({
        where: { id: appointmentInfo.Id },
      });
      return NextResponse.json(appointment);
    }
    return NextResponse.json({ message: "No appointment created" });
  } catch (err: any) {
    console.log("[APPOINTMENTS_POST]", err);
    return new NextResponse(err.message, { status: 500 });
  }
}
