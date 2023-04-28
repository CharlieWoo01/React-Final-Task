import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
