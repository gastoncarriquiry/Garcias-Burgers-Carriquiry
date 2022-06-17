import "./FormInput.css";

const FormInput = ({ type, onAction, placeholder, id, value, errorText, labelText }) => {
  return (
    <div className="form-inputs">
      {type === "textarea" ? (
        <>
          <label htmlFor={id}>{labelText}</label>
          <textarea
            id={id}
            placeholder={placeholder}
            defaultValue={value}
            onKeyUp={onAction}
          ></textarea>
          <p className="error">{errorText}</p>
        </>
      ) : (
        <>
          <label htmlFor={id}>{labelText}</label>
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            defaultValue={value}
            onKeyUp={onAction}
          />
          <p className="error">{errorText}</p>
        </>
      )}
    </div>
  );
};

export default FormInput;
