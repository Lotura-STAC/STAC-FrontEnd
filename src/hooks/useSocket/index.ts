import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { DeviceType } from "../../types/device";
import { getCookie } from "../../libs/utils/cookie";

export type StatusType = "loading" | "connected" | "disconnected";

export const useSocket = () => {
  const [data, setData] = useState<DeviceType[]>([]);
  const [status, setStatus] = useState<StatusType>("disconnected");
  const [uptime, setUptime] = useState<string>("00:00:00");
  const socket = io(import.meta.env.VITE_SOCKET_IO_BASE_URL, {
    autoConnect: false,
    forceNew: true,
    transports: ["websocket"],
  });
  useEffect(() => {
    return () => disconnect();
  }, []);
  const connect = () => {
    if (status === "disconnected") {
      setStatus("loading");
      socket.connect();
      socket.emit("request_data_all", {
        accesstoken: getCookie("accessToken"),
      });
      socket.on("update", (data) => {
        setStatus("connected");
        const now = new Date();
        setUptime(
          `${now.getHours().toString().padStart(2, "0")}:${now
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
        );
        setData(data);
      });
    }
  };
  const disconnect = () => {
    socket.off("update");
    socket.disconnect();
    setStatus("disconnected");
    setData([]);
  };
  return { data, status, uptime, connect, disconnect };
};
