import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const fetchOrders = async () => {
  const prisma = new PrismaClient();
  const user = await getServerSession(authOptions);
  if (!user) {
    return { message: "Not logged in" };
  }
  const orders = await prisma.order.findMany({
    where: {
      userId: user?.user?.id,
    },
    include: {
      products: true,
    },
  });
  return orders;
};

export default async function Dashboard() {
  const orders = await fetchOrders();
  console.log(orders);
  return (
    <div>
      {orders.length === 0 ? <h1>No orders</h1> : <h1>Your orders</h1>}
      <div className="font-medium">
        {orders.map((order) => (
          <div className="rounded-lg" key={order.id}>
            <h2>Order reference: {order.id}</h2>
            <p>Time: {new Date(order.createdDate)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
