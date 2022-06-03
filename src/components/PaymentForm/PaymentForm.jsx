import { useCartContext } from "../../context/CartContext";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import Button from "../Button/Button";
import useDocumentTitle from "../../helpers/useDocumentTitle";

const PaymentForm = () => {
  useDocumentTitle("Pago | García's Burgers");
  const { cartList, getTotal, totalPrice, clearCart } = useCartContext();

  function generateOrder() {
    let order = {};

    //TODO: add address, takeaway/delivery

    order.buyer = { name: "John Doe", email: "johndoe123@email.com", phone: "12345678" };
    order.total = getTotal();
    order.date = new Date();
    order.items = cartList.map((item) => {
      const id = item.id;
      const product = item.title;
      const price = totalPrice(item.price, item.quantity, item.extrasPrice);
      const quantity = item.quantity;
      const extras = item.extrasSelected.map((extra) => extra.ref);
      const comment = item.comment;

      if (item.comment && item.extrasSelected.length > 0) {
        return { id, product, price, quantity, extras, comment };
      } else if (item.comment) {
        return { id, product, price, quantity, comment };
      } else if (item.extrasSelected.length > 0) {
        return { id, product, price, quantity, extras };
      } else {
        return { id, product, price, quantity };
      }
    });

    // CREATE ORDER
    const db = getFirestore();
    const queryCollection = collection(db, "orders");
    addDoc(queryCollection, order)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
      .finally(() => clearCart());
  }

  //TODO: create form
  return (
    <div>
      PaymentForm
      <Button click={generateOrder} text="Enviar Pedido" />
    </div>
  );
};

export default PaymentForm;
