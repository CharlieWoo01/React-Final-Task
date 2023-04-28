import { Link } from "react-router-dom";
import "./navigation.css";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

function MainNavigation({basketCount}) {

  const basketClass = classNames("basket-amount", (basketCount === 0) ? "empty-basket" : "value-basket");

  return (
    <div>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li style={{ float: "right" }}>
            <div className="basket-container">
              <Link to="/shopping-basket">
                <FontAwesomeIcon icon={faShoppingBasket} />
                <span className={basketClass}>{basketCount}</span>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MainNavigation;
