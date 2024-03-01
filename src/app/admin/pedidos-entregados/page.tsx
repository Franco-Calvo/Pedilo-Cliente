"use client";
import { useEffect, useState } from "react";
import styles from "./pedidos.module.css";

type ProductInOrderType = {
  product: string;
  quantity: number;
  title: string;
  _id: string;
  orders: SingleOrderType[];
};

type SingleOrderType = {
  _id: string;
  user: string;
  productsInOrder: ProductInOrderType[];
  totalAmount: number;
  paymentId: string;
  status: string;
  paymentDetails: string;
  tableNumber: string;
  orderStatus: "pending" | "success";
  updatedAt: String;
  __v: number;
};

const Pedidos = () => {
  const [orders, setOrders] = useState<SingleOrderType[]>([]);

  console.log(orders);

  const [expandedOrders, setExpandedOrders] = useState<{
    [key: string]: boolean;
  }>({});

  const getAllOrders = async (): Promise<void> => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT_GENERAL}/orders/getorders`;
    const idUser = localStorage.getItem("userId");
    const userIdData = { user: idUser };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userIdData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setOrders(responseData.orders);
    } catch (error) {
      console.log("Error al obtener las órdenes:", error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const [busqueda, setBusqueda] = useState("");

  return (
    <div className={styles.containerPedidos}>
      <span>Pedidos entregados</span>

      <div>
        <input
          type="text"
          placeholder="Buscar id de orden..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={styles.inputSearch}
        />
      </div>

      <div className={styles.containerOrders}>
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Total</th>
              <th>Fecha y hora</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) &&
              orders
                .filter((order) => order.orderStatus === "success")
                .filter((order) => order._id.slice(-5).includes(busqueda))
                .map((order) => {
                  const date = new Date(order.updatedAt.toString());

                  const formattedDate = date.toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });

                  return (
                    <>
                      <tr
                        key={order._id}
                        className={`${styles.orderRow} ${
                          expandedOrders[order._id] ? styles.expanded : ""
                        }`}
                        onClick={() => {
                          setExpandedOrders((prevExpandedOrders) => ({
                            ...prevExpandedOrders,
                            [order._id]: !prevExpandedOrders[order._id],
                          }));
                        }}
                      >
                        <td> #{order._id.slice(-5)}</td>
                        <td>${order.totalAmount.toFixed(2)}</td>
                        <td>{formattedDate}</td>
                      </tr>
                      {expandedOrders[order._id] && (
                        <tr
                          key={order._id + "expanded"}
                          className={styles.expandedRow}
                        >
                          <td colSpan={3}>
                            <div className={styles.orderDetails}>
                              {order.productsInOrder.map((product) => (
                                <div
                                  className={styles.orderExpan}
                                  key={product._id}
                                >
                                  {product.quantity} - {product.title}
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pedidos;
