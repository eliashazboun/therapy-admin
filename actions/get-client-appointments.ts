import prismadb from "@/lib/prismadb";

//create a function that takes the client id and practice id as  parameters and returns a list of all appointments for that client
export async function getClientAppointments(
  clientId: string,
  practiceId: string
) {
  try {
    const appointments = await prismadb.appointment.findMany({
      where: { 
        clientId: clientId, 
        practiceId: practiceId 
      },
      orderBy:{
        startTime: "desc"
      }
    });
    return appointments;
  } catch (err: any) {
    console.log("[APPOINTMENTS_GET_CLIENTS]", err);
    return null;
  }
}
