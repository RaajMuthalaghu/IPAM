import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const toaster = (msg,msgtype) => {
    switch(msgtype){
        case "warning":
            toast.warning(msg);
            break;
        case "success":
            toast.success(msg);
            break;
        case "info":
            toast.info(msg);
            break;
        case "error":
            toast.error(msg);
            break;
        default:
            toast(msg);
    }
  };