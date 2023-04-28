import { Link } from "react-router-dom";
import "./error.css";

function ResourceError({error}) {
  return (
    <div className="container">
      <h1>Oops - { error }</h1>
      <p>Sorry, there was an fetching the resource</p>
      <Link to="/">Back to home...</Link>
    </div>
  );
}

export default ResourceError;
