import { toast } from 'react-toastify';

//   const notify = () => toast("Wow so easy!");

export function Message(message, type) {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
    }
}
