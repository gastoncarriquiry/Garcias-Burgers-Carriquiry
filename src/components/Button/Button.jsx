import "./Button.css";

const Button = ({ type = "button", click, text = "Button", disabled = false, classes = "" }) => {
  return (
    <>
      {disabled ? (
        <button disabled className="btn">
          {text}
        </button>
      ) : (
        <button onClick={click} type={type} className={`btn ${classes}`}>
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
