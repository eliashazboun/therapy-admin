import prismadb from "@/lib/prismadb";

//create a function that retreives all appointments that are scheduled for today
export async function getTodaysAppointments(practiceId: string) {
  try {
    const appointments = await prismadb.appointment.findMany({
      where: { 
        practiceId: practiceId,
        startTime: {
          gte: new Date(new Date().setHours(0,0,0,0)),
          lt: new Date(new Date().setHours(23,59,59,999))
        } 
      
      },
      orderBy: {
        startTime: "asc"
      }
    });

    
    return appointments;

  } catch (err: any) {
    console.log("[APPOINTMENTS_ACTION]", err);
    return new Error(err.message);
  }
}