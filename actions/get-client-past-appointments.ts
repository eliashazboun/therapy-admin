import prismadb from "@/lib/prismadb";
//create a function that retreives all past appointments for a client
export async function getClientPastAppointments(clientId: string, practiceId: string) {
  try {
    const appointments = await prismadb.appointment.findMany({
      where: { 
        clientId: clientId,
        practiceId: practiceId,
        startTime: {
          lt: new Date(new Date().setHours(0,0,0,0))
        } 
      
      },
      orderBy: {
        startTime: "desc"
      }
    });

    
    return appointments;

  } catch (err: any) {
    console.log("[APPOINTMENTS_ACTION]", err);
    return new Error(err.message);
  }
}