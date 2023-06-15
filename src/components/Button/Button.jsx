import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ onClick }) => (
  <button type="button" className={styles.button} onClick={onClick}>
    Załaduj więcej plików graficznych
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
