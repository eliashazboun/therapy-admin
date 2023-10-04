//create a function that returns all of the disorder from disorders table
import prismadb from "@/lib/prismadb"
export const getDisorders = async () => {
  const disorders = await prismadb.disorders.findMany()
  return disorders
}