import { addToCart, decreaseQuantity } from "@/Store/Actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CategoryRender.module.css";

type Product = {
  _id: string;
  category: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  stock: "Available" | "Unavailable";
};

type Props = {
  categoryName: string;
  products: Product[];
};

const CategoryRender = ({ categoryName, products }: Props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);

  const handleAddToCart = (product: Product, quantity: number) => {
    if (quantity === -1) {
      dispatch(decreaseQuantity(product._id));
    } else {
      dispatch(addToCart(product, quantity));
    }
  };

  const formatPrice = (price: any) => {
    const hasCents = price % 1 !== 0;

    return (hasCents ? price.toFixed(2) : price.toString())
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className={styles.containerCategory}>
      <h2>{categoryName}</h2>
      <ul className={styles.containerProducts}>
        {products.map((product) => (
          <li key={product._id}>
            <div className={styles.productCard}>
              <div>
                <span>
                  <label>{product.name}</label>
                  <p>{product.description}</p>
                </span>
                <label className={styles.price}>
                  ${formatPrice(product.price)}
                </label>
              </div>

              <span>
                <button
                  className={styles.buttonDecrease}
                  onClick={() => handleAddToCart(product, -1)}
                >
                  -
                </button>

                <input
                  type="number"
                  value={
                    (
                      cart.find(
                        (item: any) => item.product._id === product._id
                      ) || {
                        quantity: 0,
                      }
                    ).quantity
                  }
                  readOnly
                  className={styles.quantity}
                />

                <button
                  className={styles.buttonIncrease}
                  onClick={() => handleAddToCart(product, 1)}
                >
                  +
                </button>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryRender;
