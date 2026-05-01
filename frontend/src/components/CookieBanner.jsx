import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50 shadow-lg">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          We use cookies to improve your experience, analyze usage, and
          support platform features.
        </p>

        <div className="flex gap-2">
          <button
            onClick={declineCookies}
            className="px-4 py-2 bg-gray-700 rounded"
          >
            Decline
          </button>

          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-blue-600 rounded"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}