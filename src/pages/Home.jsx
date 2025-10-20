import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

export default function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(routes.authentication);
    };

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the home page</p>
            <button onClick={handleClick}>Go to Authentication</button>
        </div>
    )
}
