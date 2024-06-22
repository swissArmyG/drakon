import React, { useContext, useState, useEffect } from "react";
import { NotificationContext } from "../../contexts";

export const Notification = () => {
  const { notification, setNotification } = useContext(NotificationContext);
  const [ isVisible, setIsVisible ] = useState(false);

  useEffect(() => {
    if (!notification.message || !notification.type) {
      return setIsVisible(false);
    }
    return setIsVisible(true);
  }, [notification]);

  if (!isVisible) {
    return null;
  }

  return (
    <section className={`Notification ${notification.type}`}>
      {isVisible && (
        <React.Fragment>
          <h3
            className="--button --button-text -exit"
            onClick={() => setNotification({ type: "", message: "" })}
          >
            X
          </h3>
          <p>{notification.message}</p>
        </React.Fragment>
      )}
    </section>
  );
};