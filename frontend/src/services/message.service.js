import { toast } from 'react-toastify';

const toastConfig = {
  position: 'bottom-right',
  autoClose: 3000,
}
const error = message => toast.error(message, toastConfig)
const info = message => toast.info(message, toastConfig)
const success = message => toast.success(message, toastConfig)
const warning = message => toast.warning(message, toastConfig)

export default {
  error,
  info,
  success,
  warning
}