import { useEffect, useState } from "react";

const OrderConfirmTimer = () => {
  const targetTimes = ["12:00", "15:30", "16:30", "17:00"];
  const targetTimesReg = ["15:00", "16:00"];
  const [timers, setTimers] = useState([]);
  const [timersReg, setTimersReg] = useState([]);

  useEffect(() => {
    const calculateTimers = () => {
      const now = new Date();
      const today = now.toISOString().split("T")[0]; // Bugünün tarihi (YYYY-MM-DD formatında)

      const updatedTimers = targetTimes.map((time) => {
        const target = new Date(`${today}T${time}:00`);
        const diff = target - now;

        if (diff <= 0) {
          // Eğer süre geçmişse
          return { time, status: "Təsdiqləndi", timeLeft: "", type: 1 };
        } else {
          // Kalan süreyi hesapla
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);

          const timeLeft = `${hours.toString().padStart(2, "0")}h ${minutes
            .toString()
            .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;

          return { time, status: "", timeLeft, type: 0 };
        }
      });

      setTimers(updatedTimers);
    };

    calculateTimers(); // İlk hesaplama
    const intervalId = setInterval(calculateTimers, 1000); // Her saniye güncelle

    return () => clearInterval(intervalId); // Component unmount olduğunda interval'i temizle
  }, []);

  useEffect(() => {
    const calculateTimers = () => {
      const now = new Date();
      const today = now.toISOString().split("T")[0]; // Bugünün tarihi (YYYY-MM-DD formatında)

      const updatedTimers = targetTimesReg.map((time) => {
        const target = new Date(`${today}T${time}:00`);
        const diff = target - now;

        if (diff <= 0) {
          // Eğer süre geçmişse
          return { time, status: "Təsdiqləndi", timeLeft: "", type: 1 };
        } else {
          // Kalan süreyi hesapla
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);

          const timeLeft = `${hours.toString().padStart(2, "0")}h ${minutes
            .toString()
            .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;

          return { time, status: "", timeLeft, type: 0 };
        }
      });

      setTimersReg(updatedTimers);
    };

    calculateTimers(); // İlk hesaplama
    const intervalId = setInterval(calculateTimers, 1000); // Her saniye güncelle

    return () => clearInterval(intervalId); // Component unmount olduğunda interval'i temizle
  }, []);

  return (
    <div className="mb-5 border-b pb-3">
      {/* <p>TƏSDİQ TIMER</p> */}
      <div className="flex gap-5">
        <div className="flex flex-col  min-w-[250px]">
          <p className="font-bold mb-1">BAKI</p>
          <ul className="text-[13px]">
            {timers.map(({ time, status, timeLeft, type }, index) => (
              <li key={index}>
                <strong>{time}</strong> - {status}{" "}
                {type === 0 && `(${timeLeft})`}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col min-w-[250px]">
          <p className="font-bold mb-1">BÖLGƏ</p>
          <ul className="text-[13px]">
            {timersReg.map(({ time, status, timeLeft, type }, index) => (
              <li key={index}>
                <strong>{time}</strong> - {status}{" "}
                {type === 0 && `(${timeLeft})`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmTimer;
