"use client";
import logo from "@/Components/Images/firstlogo.png";
import { Home } from "@/Components/Presentation/Icons/Icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import styles from "./NewStore.module.css";

type Props = {};

const NewStore = (props: Props) => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const router = useRouter();

  const UrlSignUp = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/signup`;
  const UrlSignIn = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/signin`;

  const handleChange =
    (setState: React.Dispatch<React.SetStateAction<string | undefined>>) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setState(e.target.value);
    };

  const submitRegister = async (): Promise<void> => {
    const data = { email, password, name };

    try {
      const response = await fetch(UrlSignUp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error desconocido");
      }

      const successResponse = await response.json();
      toast.success(successResponse.message || "Registro exitoso");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const submitLogin = async (): Promise<void> => {
    const data = { email, password };

    try {
      const response = await fetch(UrlSignIn, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resData = await response.json();
      localStorage.setItem("token", resData.token);
      localStorage.setItem("userId", resData.user._id);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: resData.user.name,
          email: resData.user.email,
          is_online: resData.user.is_online,
          is_admin: true,
        })
      );

      toast.success("Has iniciado sesión");

      setTimeout(() => router.push("/admin"), 2000);
    } catch (error: any) {
      toast.error("El usuario o contraseña son incorrectos");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (activeTab === "login") {
        submitLogin();
      } else if (activeTab === "register") {
        submitRegister();
      }
    }
  };

  return (
    <div className={styles.containerLogin}>
      <Toaster position="top-right" />
      <div className={styles.container}>
        <Image src={logo} width={150} alt="Logo Pedilo" priority={true} />
        <div className={styles.containerTabs}>
          <span
            className={activeTab === "login" ? styles.active : ""}
            onClick={() => setActiveTab("login")}
          >
            Ingresar
          </span>
          <span
            className={activeTab === "register" ? styles.active : ""}
            onClick={() => setActiveTab("register")}
          >
            Registrarse
          </span>
        </div>
        {activeTab === "login" && (
          <div className={styles.containerInputs} onKeyDown={handleKeyDown}>
            <input
              type="text"
              onChange={handleChange(setEmail)}
              placeholder="Correo electrónico"
            />
            <input
              type="password"
              placeholder="Contraseña"
              onChange={handleChange(setPassword)}
            />
            <div className={styles.passwordRecovery}>
              <button>¿Olvidaste tu contraseña?</button>
            </div>
            <button className={styles.buttonLogin} onClick={submitLogin}>
              Ingresar
            </button>
          </div>
        )}
        {activeTab === "register" && (
          <div className={styles.containerInputs} onKeyDown={handleKeyDown}>
            <input
              type="text"
              placeholder="Nombre de tu negocio"
              onChange={handleChange(setName)}
            />
            <input
              type="text"
              placeholder="Correo electrónico"
              onChange={handleChange(setEmail)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              onChange={handleChange(setPassword)}
            />

            <button className={styles.buttonLogin} onClick={submitRegister}>
              Registrarse
            </button>
          </div>
        )}
        <Link className={styles.goBack} href="/">
          <Home />
          Regresar al inicio
        </Link>
      </div>
    </div>
  );
};

export default NewStore;
