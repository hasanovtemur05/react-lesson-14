import { toast } from "react-toastify";
const Notification = (props) =>{
    const {title, type} = props
    return toast(title , {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: type,
        });
}
export default Notification