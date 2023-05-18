import { Link } from "react-router-dom";
import "./error.css";
import MainNavigation from "../Navigation/MainNavigation";

function ResourceError({ error, errorBody }) {
  return (
    <>
      <MainNavigation />
      <div className="container">
        <h1>{error}</h1>
        <p>{errorBody}</p>
        <Link to="/">Back to home...</Link>
      </div>
    </>
  );
}

export default ResourceError;
