import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div>Page not found</div>
      <Link to="/">
        <Button variant="success">Click me for go back</Button>
      </Link>
    </>
  );
};
export default NotFound;
