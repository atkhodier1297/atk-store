import Stripe from "stripe";
import { prisma } from "@/util/prisma";
// import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import getRawBody from "raw-body";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const buf = await buffer(req);
  const rawBody = (await getRawBody(req)).toString()
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).send("Missing stripe signature");
  }
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_DEPLOYED!
    );
  } catch (err) {
    return res.status(400).send("Webhook error" + err);
  }
  //handle diff event types
  switch (event?.type) {
    case "payment_intent.created":
      const paymentIntent = event.data.object;
      console.log("Payment intent was created");
      break;
    case "charge.succeeded":
      const charge = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === "string") {
        const order = await prisma.order.update({
          where: { paymentIntentID: charge.payment_intent },
          data: { status: "complete" },
        });
      }
      break;
    default:
      console.log("Unhandled event type:" + event.type);
  }
  res.json({ received: true });
}
