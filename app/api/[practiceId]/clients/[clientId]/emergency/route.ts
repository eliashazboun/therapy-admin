import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req:Request,
  {params}: {params: {practiceId: string; clientId: string}}
){
  try{

    const {userId} = auth();

    if(!userId){
      return new NextResponse("Unathenticated", {status: 401})
    }
    if(!params.clientId){
      return new NextResponse("Client Id is required", {status: 400})
    }

    const practiceByUserId = await prismadb.practice.findFirst({
      where: {
        id: params.practiceId,
        userId,
      },
    });

    if(!practiceByUserId){
      return new NextResponse("Unauthorized", {status: 403})
    }

    const body = await req.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      relationship
    } = body;

    if(!firstName){
      return new NextResponse("First Name is required", {status: 400})
    }
    if(!lastName){
      return new NextResponse("Last Name is required", {status: 400})
    }
    if(!email){
      return new NextResponse("Email is required", {status: 400})
    }
    if(!phone){
      return new NextResponse("Phone is required", {status: 400})
    }
    if(!relationship){
      return new NextResponse("Relationship is required", {status: 400})
    }

    const newContact = await prismadb.emergencyContact.create({
      data:{
        name: `${firstName} ${lastName}`,
        email,
        phone,
        relationship,
        clientId: params.clientId,
      }
    })

    return NextResponse.json(newContact, {status: 200})

  }catch(err){
    console.log("[EMERGENCY_POST]", err)
    return NextResponse.json({error: err}, {status: 500})
  }

}

//create a patch request to update the emergency contact
export async function PATCH(
  req:Request,
  {params}: {params: {practiceId: string; clientId: string; }}
){
  try{

    const {userId} = auth();

    if(!userId){
      return new NextResponse("Unathenticated", {status: 401})
    }
    if(!params.clientId){
      return new NextResponse("Client Id is required", {status: 400})
    }

    const practiceByUserId = await prismadb.practice.findFirst({
      where: {
        id: params.practiceId,
        userId,
      },
    });

    if(!practiceByUserId){
      return new NextResponse("Unauthorized", {status: 403})
    }

    const body = await req.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      relationship,
      id
    } = body;

    if(!firstName){
      return new NextResponse("First Name is required", {status: 400})
    }
    if(!lastName){
      return new NextResponse("Last Name is required", {status: 400})
    }
    if(!email){
      return new NextResponse("Email is required", {status: 400})
    }
    if(!phone){
      return new NextResponse("Phone is required", {status: 400})
    }
    if(!relationship){
      return new NextResponse("Relationship is required", {status: 400})
    }
    if(!id){
      return new NextResponse("Id is required", {status: 400})
    }

    const updatedContact = await prismadb.emergencyContact.update({
      where:{
        id,
        clientId: params.clientId,
      },
      data:{
        name: `${firstName} ${lastName}`,
        email,
        phone,
        relationship,
      }
    })

    return NextResponse.json(updatedContact, {status: 200})

  }catch(err){
    console.log("[EMERGENCY_PATCH]", err)
    return NextResponse.json({error: err}, {status: 500})
  }
}

