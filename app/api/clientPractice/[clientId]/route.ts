import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import HttpStatusCode from "@/http_enums";
import { corsHeaders } from "@/lib/consts";

export async function GET(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    // const {userId} = auth()

    // if(!userId){
    //   return new NextResponse("Unauthorized", {status: HttpStatusCode.UNAUTHORIZED_401})
    // }

    const clientsPractice = await prismadb.client.findFirst({
      where: {
        id: params.clientId,
      },
      select: {
        practiceId: true,
      },
    });

    return NextResponse.json(clientsPractice, {
      status: HttpStatusCode.OK_200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.log("[CLIENT_PRACTICE_GET]", err);
  }
}
