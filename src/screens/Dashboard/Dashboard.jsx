import {useEffect} from "react";
import {toast} from "react-toastify";

function Dashboard() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("dashboard") === "success") {
            toast.success("Login successful!");
            const newURL = window.location.pathname;
            window.history.replaceState({}, document.title, newURL);
        }
    }, []);

    return (
        <div>
        </div>
    )
}
export default Dashboard
