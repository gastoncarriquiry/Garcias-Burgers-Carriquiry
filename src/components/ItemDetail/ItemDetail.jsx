import "./ItemDetail.css";
import ItemCount from ".././ItemCount/ItemCount";
import { useState } from "react";
import { useCartContext } from "../../context/CartContext";

const ItemDetail = ({ item }) => {
  const {
    id,
    title,
    category,
    description,
    additionals,
    extras = [],
    picURL,
    price,
    available,
    initial,
  } = item;
  const { addToCart, cartList } = useCartContext();
  const [count, setCount] = useState(undefined);
  const [extrasSelected, setExtrasSelected] = useState([]);
  const [checkedState, setCheckedState] = useState(new Array(extras.length).fill(false));
  const [totalExtras, setTotalExtras] = useState(0);
  const [deployed, setDeployed] = useState(false);
  let comment = null;

  const AddComment = () => {
    const handleOnClick = () => {
      setDeployed(!deployed);
    };

    const handleOnChange = (evt) => {
      comment = evt.target.value;
    };

    return (
      <div>
        {deployed ? (
          <div className="comment">
            <label htmlFor="comment">Comentario:</label>
            <textarea
              onChange={handleOnChange}
              placeholder="Comentarios, pedidos, aclaraciones..."
              name="comment"
              id="comment"
            ></textarea>
          </div>
        ) : (
          <button className="btnComment" onClick={handleOnClick}>
            Agregar Comentario
          </button>
        )}
      </div>
    );
  };

  const onAdd = (qty) => {
    //TODO: fix separar cuando son el mismo item y tiene extra
    setCount(qty);
    // console.log(extrasSelected);
    let itemInCart = cartList.find((item) => item.id === id);
    if (itemInCart !== undefined) {
      for (const item in cartList) {
        // console.log(extrasSelected);
        // console.log(cartList[item].extrasSelected);
        //TODO: pensar que otro criterio tengo que usar
        if (cartList[item].id === id && cartList[item].extrasSelected === extrasSelected) {
          if (cartList[item].quantity + qty > 50) {
            cartList[item].quantity = 50;
            alert(
              "Solo puedes agregar hasta 50 unidades de un mismo producto. Si de verdad deseas más, contáctate con García's Burgers por teléfono."
            );
          } else {
            cartList[item].quantity += qty;
          }
        }
      }
    } else {
      if (comment !== null) {
        addToCart({
          ...item,
          quantity: qty,
          extrasPrice: totalExtras,
          extrasSelected: extrasSelected,
          comment: comment,
        });
      } else {
        addToCart({
          ...item,
          quantity: qty,
          extrasPrice: totalExtras,
          extrasSelected: extrasSelected,
        });
      }
    }
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((bool, index) =>
      index === position ? !bool : bool
    );
    setCheckedState(updatedCheckedState);

    const totalPriceExtras = updatedCheckedState.reduce((sum, currentState, index) => {
      if (currentState) {
        return sum + extras[index].price;
      }
      return sum;
    }, 0);

    let filterExtras = updatedCheckedState.map((bool, index) => {
      if (bool === true) {
        return extras[index];
      }
    });

    setExtrasSelected(filterExtras.filter((extra) => extra !== undefined));
    setTotalExtras(totalPriceExtras);
  };

  return (
    <article className="item-detail" key={id}>
      <img src={picURL} alt={`Imagen de ${category} ${title}`} />
      <div className="detail-container">
        <div className="item-detail-text">
          <p className="category">{category}</p>
          <h1>{title}</h1>
          <p className="description">{description}</p>
          <p className="extras">{additionals}</p>
          <p className="price">
            <b>$ {price}</b>
          </p>
        </div>
        <div className="chk-extras">
          {/* {extras === undefined ? (
            <></>
          ) : (
            extras.map(({ ref, text, price }, index) => (
              <div className="chk-div" key={index}>
                <input
                  type="checkbox"
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                  value={ref}
                  id={ref}
                  className="chk"
                />
                <label htmlFor={ref}>
                  {text} +${price}
                </label>
              </div>
            ))
          )} */}
        </div>
        <AddComment />
        {count === undefined ? (
          <ItemCount available={available} initial={initial} onAdd={onAdd} />
        ) : (
          <ItemCount available={available} initial={initial} onAdd={onAdd} />
        )}
      </div>
    </article>
  );
};

export default ItemDetail;
