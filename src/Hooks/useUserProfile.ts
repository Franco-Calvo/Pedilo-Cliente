import { User } from "@/Types/user";
import { useEffect, useState } from "react";

export const useUserProfile = (pathname: string, searchParams: string) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = pathname.split("/")[1];
        if (username) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT_GENERAL}/${username}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const userId = data._id;
          localStorage.setItem("userId", userId);
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, [pathname, searchParams]);

  return user;
};
