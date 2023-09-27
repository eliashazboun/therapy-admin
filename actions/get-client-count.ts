import  prismadb  from "@/lib/prismadb";

export const getClientCount = async (practiceId: string) => {
  const clientCount = await prismadb.client.count({
    where: { 
      practiceId 
    },
  });
  return clientCount;
}