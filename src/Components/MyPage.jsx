import { useEffect, useState } from "react";

export default function MyPage() {
  const [myOrders, setMyOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/order");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setMyOrders(data.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {myOrders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {myOrders.map((order) => (
            <div
              key={order.orderNum}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <p className="font-semibold">Order Number: {order.orderNum}</p>
              <p>
                Status: <span className="text-blue-600">{order.status}</span>
              </p>
              <p>
                Total Price:{" "}
                <span className="font-bold">${order.totalPrice}</span>
              </p>
              <p>
                Ship To: {order.shipTo.firstName} {order.shipTo.lastName}
              </p>
              <p>
                Address: {order.shipTo.address}, {order.shipTo.city} (
                {order.shipTo.zip})
              </p>

              <div className="mt-4">
                <h3 className="font-semibold">Products:</h3>
                <div className="space-y-2">
                  {order.products.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center space-x-4 p-2 border rounded-md"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium">
                          {product.title} ({product.option})
                        </p>
                        <p>Quantity: {product.quantity}</p>
                        <p className="font-bold">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
