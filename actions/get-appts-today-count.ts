import prismadb from "@/lib/prismadb";

//Create a function that retreives the count of  all apointments that are today
export const getAppointmentsTodayCount = async (practiceId: string) => {
  const appointmentCount = await prismadb.appointment.count({
    where: { 
      practiceId,
      startTime: {
        gte: new Date(new Date().setHours(0,0,0,0)),
        lte: new Date(new Date().setHours(23,59,59,999))
      }
    },
  
  });
  return appointmentCount;
}