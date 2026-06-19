import classes from "./Header.module.css"
export const Header = () => {
    return(
        <header className={classes.header}>
            <a href="/" className={classes.headerLink}>BLOG</a>
            <a href="/contact" className={classes.headerLink}>お問合せ</a>

        </header>
    );
};

