import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ paddingTop: "50px" }}>
      <h1>404</h1>
      <h4>Not Found</h4>
      <p>The page you are looking for doesnot exist</p>
      <p>
        Go To <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default NotFound;
