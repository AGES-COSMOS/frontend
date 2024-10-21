import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastNotificationProps {
  message: string;
  type: ToastType;
  onClose?: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    if (message && message.trim() !== '') {
      switch (type) {
        case 'success':
          toast.success(message, { onClose });
          break;
        case 'error':
          toast.error(message, { onClose });
          break;
        case 'warning':
          toast.warning(message, { onClose });
          break;
        case 'info':
          toast.info(message, { onClose });
          break;
        default:
          break;
      }
    }

    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 5000);
    }
  }, [message, type, onClose]);
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      draggable
    />
  );
};

export default ToastNotification;
