import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import priceFormat from "@/util/PriceFormat";
import Image from "next/image";

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
      <div className="">
        <div className="font-medium">
          <h1 className="text-xl">Your recent orders</h1>
          {orders.map((order) => (
            <div className="rounded-lg border border-black" key={order.id}>
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
              <p className="font-medium">Total: {priceFormat(order.amount)}</p>
              <div className="flex gap-8">
                {order.products.map((product) => (
                  <div className="py-2" key={product.id}>
                    <h2 className="py-2">{product.name}</h2>
                    <div className="flex items-center gap-4">
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
            </div>
          ))}
        </div>
      </div>
    );
  }
}
