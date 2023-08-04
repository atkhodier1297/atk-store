import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const fetchOrders = async () => {
  const prisma = new PrismaClient();
  const user = await getServerSession(authOptions);
  if (!user) {
    return null;
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

  if (orders === null)
    return <div>You need to be logged in to view your orders</div>;

  console.log(orders);

  if (orders.length === 0) {
    return (
      <div>
        <h1>No orders placed</h1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="font-medium">
          <h1 className="text-cl">Your orders</h1>
          {orders.map((order) => (
            <div className="rounded-lg" key={order.id}>
              <h2>Order reference: {order.id}</h2>
              <p>Time: {new Date(order.createdDate)}</p>
              <p className="text-md py-2">
                Status{" "}
                <span
                  className={`${
                    order.status === "complete"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  } text-white py-1 rounded-md px-2 mx-2 text-small`}
                >
                  {order.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
