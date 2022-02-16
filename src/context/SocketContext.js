import React, { useContext, useEffect } from "react";
import { createContext } from "react";

import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "./chat/ChatContext";
import { useSocket } from "../hooks/useSocket";

import { types } from "../types/types";
import { scrollToBottomAnimated } from "../helpers/scrollToBottom";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    process.env.REACT_APP_API_URL
  );

  const { auth } = useContext(AuthContext);

  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (auth.logged) {
      conectarSocket();
    }
  }, [auth, conectarSocket]);

  useEffect(() => {
    if (!auth.logged) {
      desconectarSocket();
    }
  }, [auth, desconectarSocket]);

  // Escuchar los cambios en los usuarios conectados (cuando se conecta otro socket)
  useEffect(() => {
    socket?.on("lista-usuarios", (usuarios) => {
      console.log("callback users", usuarios);
      dispatch({
        type: types.usuariosCargados,
        payload: usuarios,
      });
    });
  }, [socket, dispatch]);

  // Escuchar mensajes enviados privados a mi, por mi uidd
  useEffect(() => {
    socket?.on("mensaje-personal", (mensaje) => {
      dispatch({
        type: types.nuevoMensaje,
        payload: mensaje,
      });

      scrollToBottomAnimated("mensajes");
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
