import { Link } from "react-router-dom";
import "./error.css";

function NotFound() {
  return (
    <div className="container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Back to home...</Link>
    </div>
  );
}

export default NotFound;
