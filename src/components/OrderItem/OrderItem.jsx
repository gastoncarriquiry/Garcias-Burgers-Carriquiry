const OrderItem = ({ item }) => {
  return (
    <article key={Math.random()}>
      <div>
        <h3>{item.title}</h3>
        {item.extrasSelected !== undefined ? (
          item.extrasSelected.length > 0 ? (
            <p className="hasExtras">+ Extras</p>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
      <div>
        <p>
          <b>x{item.quantity}</b>
        </p>
      </div>
    </article>
  );
};

export default OrderItem;
