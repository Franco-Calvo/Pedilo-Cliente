"use client";
import React, { useEffect } from "react";
import axios from "axios";
import styles from "./config.module.css";

type Props = {};

function Config({}: Props) {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const token = localStorage.getItem("token");

    if (code) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_MP}`,
          { code },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Cuenta vinculada con éxito:", response.data);
        })
        .catch((error) => {
          console.log("Error vinculando la cuenta:", error);
        });
    }
  }, []);

  return (
    <div className={styles.containerProducts}>
      <div className={styles.config}>
        <h3>Vincula tu cuenta de Mercado Pago</h3>
        <p>
          Para comenzar a recibir pagos a través de tu menú online debes
          vincular tu cuenta de Mercado Pago a nuestra plataforma.
        </p>
        <button
          onClick={() =>
            (window.location.href = `${process.env.NEXT_PUBLIC_SERVER_MERCADO_PAGO_LINK}`)
          }
        >
          Vincular cuenta de Mercado Pago
        </button>
      </div>
    </div>
  );
}

export default Config;
