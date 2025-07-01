import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

interface NotificationProps {
  message: string;
  imageUrl: StaticImageData;
  link: string;
  visible: boolean;
  onClose: () => void;
}

const NewComponent: FC<NotificationProps> = ({ message, imageUrl, link, visible, onClose }) => {
  return (
    <motion.div
      className={`fixed bottom-3 right-4 bg-gradient-to-tr from-zinc-700 to to-zinc-600 text-white p-2 rounded-lg shadow-xl flex items-center ${visible ? 'opacity-100' : 'opacity-0'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      <Image src={imageUrl} alt="New Component" className="w-16 h-16 rounded  mr-4" />
      <div className="flex-1">
        <p className="font-medium mb-1">{message}</p>
        <a
          href={link}
          className="text-blue-300 text-sm hover:underline"
          rel="noopener noreferrer"
        >
          Explore
        </a>
      </div>
      <button
        className="text-gray-300 hover:text-gray-400 ml-4 relative"
        onClick={onClose}
      >
        &times;
      </button>
    </motion.div>
  );
};

export default NewComponent;
