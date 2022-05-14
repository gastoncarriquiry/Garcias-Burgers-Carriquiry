import "./Button.css";

const Button = ({ click, text = "Button", disabled = false, classes }) => {
  return (
    <>
      {disabled ? (
        <button onClick={click} disabled className="btn">
          {text}
        </button>
      ) : (
        <button onClick={click} className={`btn ${classes}`}>
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
