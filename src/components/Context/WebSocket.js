import React, { useState, useRef, useEffect } from 'react';

const WebSocketContext = React.createContext({
  connection: null,
  setUser: () => {},
  setConnection: () => {},
});

export const WebSocketProvider = ({ shouldConnect, children }) => {
  const [webSocket, setWebSocket] = useState(null);
  const isConnecting = useRef(false);

  useEffect(() => {if (!conn && shouldConnect && hasTokens && !isConnecting.current) {
      isConnecting.current = true;
      raw
        .connect("", "", {
          waitToReconnect: true,
          url: apiBaseUrl.replace("http", "ws") + "/socket",
          getAuthOptions: () => {
            const { recvTransport, sendTransport } = useVoiceStore.getState();

            const reconnectToVoice = !recvTransport
              ? true
              : recvTransport.connectionState !== "connected" ||
                sendTransport?.connectionState !== "connected";

            console.log({
              reconnectToVoice,
              recvState: recvTransport?.connectionState,
              sendState: sendTransport?.connectionState,
            });

            return {
              accessToken,
              refreshToken,
              reconnectToVoice,
              currentRoomId: useCurrentRoomIdStore.getState().currentRoomId,
              muted: useMuteStore.getState().muted,
              deafened: useDeafStore.getState().deafened,
            };
          },
          onConnectionTaken: () => {
            closeVoiceConnections(null);
            useCurrentRoomIdStore.getState().setCurrentRoomId(null);
            replace("/connection-taken");
          },
          onClearTokens: () => {
            console.log("clearing tokens...");
            useTokenStore
              .getState()
              .setTokens({ accessToken: "", refreshToken: "" });
            setConn(null);
            closeVoiceConnections(null);
            useCurrentRoomIdStore.getState().setCurrentRoomId(null);
            replace("/logout");
          },
        })
        .then((x) => {
          setConn(x);
          if (x.user.currentRoomId) {
            useCurrentRoomIdStore
              .getState()
              // if an id exists already, that means they are trying to join another room
              // just let them join the other room rather than overwriting it
              .setCurrentRoomId((id) => id || x.user.currentRoomId);
          }
        })
        .catch((err) => {
          if (err.code === 4001) {
            replace(`/?next=${window.location.pathname}`);
          }
        })
        .finally(() => {
          isConnecting.current = false;
        });
    }}, [connection, shouldConnect, replace, authenticated]);

    useEffect(() => {
    if (!conn) {
      return;
    }

    return conn.addListener<{
      refreshToken: string;
      accessToken: string;
    }>("new-tokens", ({ refreshToken, accessToken }) => {
      useTokenStore.getState().setTokens({
        accessToken,
        refreshToken,
      });
    });
  }, [conn]);

  return (
    <WebSocketContext.Provider value={useMemo(() => ({
        connection, setConnection, setUser: (u) => {
            if(connection) {
                setConnection({
                    ...connection,
                    user: u
                })
            }
        }
    }), [connection])}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => React.useContext(WebSocketContext);
