const FormTabs = ({ action, reference }) => {
  return (
    <div className="tabs">
      <button onClick={action} className="delivery active" ref={reference}>
        Envío
      </button>
      <button onClick={action} className="takeaway">
        Para llevar
      </button>
    </div>
  );
};

export default FormTabs;
