import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
){
  try{
    const { userId} = auth()
    const body = await req.json()

    const { name } = body

    if(!userId){
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if(!name){
      return new NextResponse("Name is required", { status: 400 })
    }

    const practice = await prismadb.practice.create({
      data:{
        name,
        userId
      }
    })

    return NextResponse.json(practice)



  }catch(err){
    console.log("[PRACTICES_POST]",err)
    return new NextResponse("Internale error", { status: 500 })
  }

}

//create a get function that returns the names of all of the practices
export async function GET(
  req: Request,
){
  try{
   

    const practices = await prismadb.practice.findMany({
      select:{
        name: true,
      }
    })

    return NextResponse.json(practices)

  }catch(err){
    console.log("[PRACTICES_GET]",err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
