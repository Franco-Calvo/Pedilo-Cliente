import Loader from "@/Components/Presentation/Loader/Loader";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminLayoutWrapper = ({ children }: any) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.get(
          "https://pediloserver.onrender.com/auth/verifytoken",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.is_admin === true) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error(error);
        setIsAdmin(false);
      }
    };

    verifyToken();
  }, []);

  if (isAdmin) {
    return <div>{children}</div>;
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          color: "black",
          gap: "1rem",
        }}
      >
        <Loader />
        <p>Estamos verificando su sesión...</p>
      </div>
    );
  }
};

export default AdminLayoutWrapper;
