import { useState, useEffect } from "react";

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
          console.log("Пользователь установил приложение");
        } else {
          console.log("Пользователь отменил установку");
        }
        setInstallPrompt(null); // Сбросить сохраненное событие
      });
    }
  };

  return (
    <>
      {isInstallable && (
        <button onClick={handleInstallClick} className="install-button">
          Установить приложение
        </button>
      )}
    </>
  );
};

export default InstallPrompt;
