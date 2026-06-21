import classes from "./Header.module.css";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.headerLink}>
        BLOG
      </Link>
      <Link to="/contact" className={classes.headerLink}>
        お問合せ
      </Link>
    </header>
  );
};
