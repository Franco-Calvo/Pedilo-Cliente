"use client";
import { Check } from "@/Components/Presentation/Icons/Icons";
import LoaderOrder from "@/Components/Presentation/Loader/LoaderOrder";
import useDiscountTimer from "@/Hooks/useTimer";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import styles from "./order.module.css";

type ProductInOrder = {
  product: string;
  title: string;
  quantity: number;
  _id: string;
};

type OrderType = {
  _id: string;
  user: string;
  productsInOrder: ProductInOrder[];
  totalAmount: number;
  paymentId: string;
  status: string;
  paymentDetails: string;
  orderStatus: "pending" | "success";
};

const SuccessPage: React.FC = () => {
  const [order, setOrder] = useState<OrderType | null>(null);
  const initialMinutes = 1;
  const additionalMinutes = 1;
  const { timeLeft, timeExtended } = useDiscountTimer(
    initialMinutes,
    additionalMinutes
  );

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / (1000 * 60));
    const seconds = ((ms / 1000) % 60).toFixed(0);

    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("timerEndTime")
    ) {
      const endTime = new Date(
        new Date().getTime() + initialMinutes * 60 * 1000
      ).toISOString();
      localStorage.setItem("timerEndTime", endTime);
    }
  }, []);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(`${process.env.NEXT_PUBLIC_SERVER_SOCKET}`);

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const clearLocalStorageData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("tableNumber");
      localStorage.removeItem("cart");
    }
  };

  useEffect(() => {
    if (
      order &&
      order.orderStatus === "success" &&
      typeof window !== "undefined"
    ) {
      localStorage.removeItem("timerEndTime");
    }
  }, [order]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      clearLocalStorageData();

      const paymentId = urlParams.get("payment_id");

      if (paymentId) {
        setTimeout(() => {
          axios
            .get(
              `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT_GENERAL}/orders/orderbypayment?payment_id=${paymentId}`
            )
            .then((response) => {
              setOrder(response.data.order);
              socketRef.current?.emit(
                "join-order-room",
                response.data.order._id
              );
            })
            .catch((error) => {
              console.error("Error al obtener la orden:", error);
            });
        }, 5000);
      }

      const socket = socketRef.current;

      socket?.on("order-completed", (updatedOrder) => {
        setOrder(updatedOrder);
        console.log("Order completed", updatedOrder);
      });

      return () => {
        socket?.off("order-completed");
      };
    }
  }, []);

  const goBack = () => {
    const initialUrl = localStorage.getItem("initialUrl") || "/";
    window.location.href = initialUrl;
    localStorage.removeItem("initialUrl");
  };

  return (
    <div className={styles.orderView}>
      <div className={styles.containerCheck}>
        <Check />
        <h3>Pago exitoso</h3>
        {order && order.orderStatus === "success" && (
          <p className={styles.readyText}>
            ¡Tu pedido ya está listo, acércate a la caja para retirarlo!
          </p>
        )}

        {order ? (
          <div className={styles.orderContainer}>
            <p>Pedido N° #{order._id.slice(-5)}</p>
            <div>Total: ${order.totalAmount}</div>
            {order.productsInOrder.map((product: ProductInOrder) => (
              <div key={product._id} className={styles.productDetail}>
                <span>{product.title}</span>
              </div>
            ))}
            <div>
              {order.orderStatus !== "pending"
                ? "¡Tu pedido está listo!"
                : "Estamos preparando tu pedido"}
            </div>
          </div>
        ) : (
          <p className={styles.orderLoading}>
            Cargando los detalles de la orden
            <LoaderOrder />
          </p>
        )}
        {order && order.orderStatus === "pending" && (
          <>
            <p>
              Te avisaremos cuando tu pedido esté listo.
              <br /> El tiempo estimado es{" "}
            </p>
            <span className={styles.timer}>{formatTime(timeLeft)}</span>
            {timeExtended && (
              <p className={styles.extendedText}>
                El local actualizó el horario, lamentamos la demora.
              </p>
            )}
          </>
        )}
      </div>
      {order && order.orderStatus === "success" && (
        <button className={styles.goBack} onClick={goBack}>
          Regresar al menú
        </button>
      )}
    </div>
  );
};

export default SuccessPage;
