import { Link } from "react-router-dom";

export function femaleOrMale() {
  return (
    <>
      <Link to="/products/female">Female</Link>
      <Link to="/products/male">Male</Link>
    </>
  );
}
