import { Link } from "react-router-dom";
import "./error.css";

function ResourceError({error, errorBody}) {
  return (
    <div className="container">
      <h1>{ error }</h1>
      <p>{errorBody }</p>
      <Link to="/">Back to home...</Link>
    </div>
  );
}

export default ResourceError;
