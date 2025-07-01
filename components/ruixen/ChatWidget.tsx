import { useEffect } from 'react';

const ChatWidget: React.FC = () => {
  useEffect(() => {
    // Function to check if the device is a desktop
    const isDesktop = () => window.innerWidth > 768; // You can adjust the width threshold as needed

    if (isDesktop()) {
      const loadCrispScript = () => {
        (window as any).$crisp = [];
        (window as any).CRISP_WEBSITE_ID = '83747591-c664-41d6-b281-f8b96605cc9f';
        const script = document.createElement('script');
        script.src = 'https://client.crisp.chat/l.js';
        script.async = true;
        document.getElementsByTagName('head')[0].appendChild(script);
      };

      loadCrispScript();
    }

    return () => {
      const scripts = document.querySelectorAll(`script[src='https://client.crisp.chat/l.js']`);
      scripts.forEach((script) => script.remove());
    };
  }, []);

  return null; 
};

export default ChatWidget;
