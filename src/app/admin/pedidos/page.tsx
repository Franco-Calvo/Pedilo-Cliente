"use client";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import styles from "./pedidos.module.css";
import { io, Socket } from "socket.io-client";
import {
  ArrowDown,
  OrderStatus,
  StatusPayment,
} from "@/Components/Presentation/Icons/Icons";
import { printer, types } from "node-thermal-printer";

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
  __v: number;
};

const PedidosPage = () => {
  const [orders, setOrders] = useState<SingleOrderType[]>([]);
  const [incomingOrder, setIncomingOrder] = useState<SingleOrderType | null>(
    null
  );
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const socketRef = useRef<Socket | null>(null);
  if (!socketRef.current) {
    socketRef.current = io(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT_SOCKET}`);
  }

  const handleNewOrder = (newOrder: SingleOrderType) => {
    setIncomingOrder(newOrder);
  };

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

    const socket = socketRef.current;

    socket?.on("new-order", handleNewOrder);

    return () => {
      socket?.off("new-order", handleNewOrder);
    };
  }, []);

  useEffect(() => {
    if (incomingOrder) {
      setOrders((prevOrders) => [...prevOrders, incomingOrder]);
      setIncomingOrder(null);
    }
  }, [incomingOrder]);

  const updateOrderStatus = async (orderId: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT_GENERAL}/orders/${orderId}`;
      const updatedStatus = { orderStatus: "success" };
      const userId = localStorage.getItem("userId");
      const updatedData = { ...updatedStatus, userId };

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Credentials: "include",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.success) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
      } else {
        console.log("Error:", responseData.message);
      }
    } catch (error) {
      console.log("Error al actualizar el estado de la orden:", error);
    }
  };

  return (
    <div className={styles.containerPedidos}>
      <span>Pedidos en espera</span>
      {Array.isArray(orders) &&
        orders
          .filter((order) => order.orderStatus === "pending")
          .map((order) => (
            <div
              key={order._id}
              className={`${styles.order} ${
                expandedOrders.has(order._id) ? "expanded" : ""
              }`}
            >
              <div className={styles.orderDetails}>
                Pedido: #{order._id.slice(-5)}
                <p>Mesa N°: {order.tableNumber}</p>
                <div className={styles.paymentStatus}>
                  {order.status === "paid" ? (
                    <StatusPayment color="#3b8d5a" />
                  ) : (
                    <StatusPayment color="#c03" />
                  )}
                  Pagado
                </div>
                <button
                  className={styles.orderStatus}
                  onClick={() => updateOrderStatus(order._id)}
                >
                  <OrderStatus />
                  Entregar
                </button>
              </div>
              <div className={styles.containerProducts}>
                {order.productsInOrder
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .slice(0, expandedOrders.has(order._id) ? undefined : 4)
                  .map((product: ProductInOrderType) => (
                    <div key={product._id} className={styles.product}>
                      {product.quantity} | {product.title} <br />
                    </div>
                  ))}
              </div>
              {order.productsInOrder.length > 4 && (
                <button
                  className={
                    expandedOrders.has(order._id)
                      ? styles.arrowUp
                      : styles.arrowDown
                  }
                  onClick={() => {
                    const newSet = new Set(expandedOrders);
                    if (expandedOrders.has(order._id)) {
                      newSet.delete(order._id);
                    } else {
                      newSet.add(order._id);
                    }
                    setExpandedOrders(newSet);
                  }}
                >
                  <ArrowDown color="black" />
                </button>
              )}
            </div>
          ))}
    </div>
  );
};

export default PedidosPage;
