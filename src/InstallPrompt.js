import React, { useState, useEffect } from "react";
import { notification, Button } from "antd";
import "antd/dist/reset.css"; // Импорт стилей Ant Design

const InstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // Предотвратить показ стандартного диалога
      setInstallPrompt(e); // Сохранить событие
      setIsInstallable(true); // Показать кнопку для установки
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt(); // Показать диалог установки
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          notification.success({
            message: "Установка завершена",
            description: "Приложение успешно установлено на ваш рабочий стол.",
            placement: "topRight", // Появление в верхнем правом углу
          });
        } else {
          notification.info({
            message: "Установка отменена",
            description: "Пользователь отменил установку приложения.",
            placement: "topRight",
          });
        }
        setInstallPrompt(null); // Сбросить сохраненное событие
      });
    }
  };

  return (
    <>
      {isInstallable && (
        <Button
          onClick={handleInstallClick}
          className="install-button"
          type="primary"
        >
          Установить приложение
        </Button>
      )}
    </>
  );
};

export default InstallPrompt;
