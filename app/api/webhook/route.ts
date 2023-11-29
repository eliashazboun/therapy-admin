import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import {
  UserCreatedObject,
  UserDeletedObject,
  UserUpdatedObject,
} from "@/types";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import HttpStatusCode from "@/http_enums";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  console.log("[POST_WEBHOOK]");

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  let body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;

  /**
   * The type of the event. The events the webhook can receive are
   * - user.created
   * - user.updated
   * - user.deleted
   */
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { data } = JSON.parse(body) as UserCreatedObject;
    console.log("[USER_CREATED]", data);
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      primary_email_address_id,
      profile_image_url,
    } = data;

    const primaryEmail = email_addresses.find(
      (email) => email.id === primary_email_address_id
    );

    const newClient = await prismadb.client.create({
      data: {
        id,
        firstName: first_name,
        lastName: last_name,
        profilePicture: profile_image_url,
        email: primaryEmail ? primaryEmail.email_address : "",
      },
    });

    return NextResponse.json(newClient, { status: HttpStatusCode.CREATED_201 });
  }

  if (eventType === "user.updated") {
    const { data } = JSON.parse(body) as UserUpdatedObject;
    const {} = data;
  }

  if (eventType === "user.deleted") {
    const { data } = JSON.parse(body) as UserDeletedObject;
    const removedClient = await prismadb.client.delete({
      where: {
        id: data.id,
      },
    });
    const {} = data;

    return NextResponse.json(removedClient, { status: HttpStatusCode.OK_200 });
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("", { status: 201 });
}
