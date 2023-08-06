import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import priceFormat from "@/util/PriceFormat";
import Image from "next/image";

export const revalidate = 0

const fetchOrders = async () => {
  const prisma = new PrismaClient();
  const user = await getServerSession(authOptions);
  if (!user) {
    return null;
  }
  const orders = await prisma.order.findMany({
    where: {
      userId: user?.user?.id, status: "complete"
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
          <h1 className="text-xl">Your recent orders</h1>
          {orders.map((order) => (
            <div className="rounded-lg p-8 my-4 space-y-2" key={order.id}>
              <h2 className="text-xs font-medium">Order reference: {order.id}</h2>
              <p className="text-xs">
                Status:
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
              <p className="text-xs">Time: {new Date(order.createdDate).toString()}</p>
              <div className="text-xs lg:flex items-center gap-2 ">
                {order.products.map((product) => (
                  <div className="py-2" key={product.id}>
                    <h2 className="py-2">{product.name}</h2>
                    <div className="flex items-baseline gap-4">
                      <Image
                        src={product.image!}
                        width={36}
                        height={36}
                        alt={product.name}
                      />
                      <p>{priceFormat(product.unit_amount)}</p>
                      <p>Quantity: {product.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm">Total: {priceFormat(order.amount)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
