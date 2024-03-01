import { useEffect, useState } from "react";

const useDiscountTimer = (
  initialMinutes: number,
  additionalMinutes: number
) => {
  const calculateTimeLeft = (): number => {
    if (typeof window !== "undefined") {
      const storedEndTime = localStorage.getItem("timerEndTime");

      if (storedEndTime) {
        const endTime = new Date(storedEndTime).getTime();
        const currentTime = new Date().getTime();
        const timeLeft = endTime - currentTime;

        return timeLeft > 0 ? timeLeft : 0;
      }
    }

    return initialMinutes * 60 * 1000;
  };

  const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft);
  const [timeExtended, setTimeExtended] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeExtended(!!localStorage.getItem("timerEndTime"));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 1000) {
          return prevTimeLeft - 1000;
        } else {
          const additionalTime = additionalMinutes * 60 * 1000;
          localStorage.setItem(
            "timerEndTime",
            new Date(new Date().getTime() + additionalTime).toISOString()
          );
          if (!timeExtended) setTimeExtended(true);
          return additionalTime;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [additionalMinutes, timeExtended]);

  return { timeLeft, timeExtended };
};

export default useDiscountTimer;
