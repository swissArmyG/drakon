import { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    type: '',
    message: '',
  });

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification({
          type: '',
          message: ''
        })
      }, 10000) // 10 seconds
    }
  }, [notification])

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };