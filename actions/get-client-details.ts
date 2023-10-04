import prismadb from "@/lib/prismadb";

//Create a function that takes in clientId and practiceId as parameters and returns the client details
export async function getClientDetails(clientId: string, practiceId: string) {
  try {
    const client = await prismadb.client.findFirst({
      where: {
        id: clientId,
        practiceId: practiceId,
      },
      include:{
        disorders: true,
        medications: true,
        contacts: true,
        
      }
    });
    return client;
  } catch (err: any) {
    return null;
  }
}