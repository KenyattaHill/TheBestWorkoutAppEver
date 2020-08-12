import { toast } from 'react-toastify';

export default class MessageService{
  constructor() {
    this.toastConfig = {
      position: 'bottom-right',
      autoClose: 3000,
    }
  }
  error(message) {
    return toast.error(message, this.toastConfig)
  }

  info(message) {
    return toast.info(message, this.toastConfig)
  }
  success(message) {
    return toast.success(message, this.toastConfig)
  }
  warning(message) {
    return toast.warning(message, this.toastConfig)
  }

}