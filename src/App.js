import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProductCard from "./components/ProductCard";
import ProductCategory from "./components/ProductCategory";
import Basket from "./components/Basket";
import productData from "./data/products.json";
import skyF1Image from "./assets/images/SkySportsF1.png";
import SkySportsGolf from "./assets/images/SkySportsGolf.png";
import SkySportsTennis from "./assets/images/SkySportsTennis.png";
import SkySportsFootball from "./assets/images/SkySportsFootball.png";
import SkyHorror from "./assets/images/SkyHorror.png";
import SkyCinema from "./assets/images/SkyCinema.png";

function App() {
  // Group products by type
  const productsByType = {};
  productData.forEach((product) => {
    if (!productsByType[product.type]) {
      productsByType[product.type] = [];
    }
    productsByType[product.type].push(product);
  });

  // Initialize basket to empty array
  const [basketItems, setBasketItems] = useState([]);

  // Add product to basket
  const addToBasket = (productInfo) => {
    const productKey = `${productInfo.type}_${productInfo.keyProp}`;
    const existingProductIndex = basketItems.findIndex(
      (item) => item.productKey === productKey
    );
    if (existingProductIndex === -1) {
      setBasketItems([...basketItems, { ...productInfo, productKey }]);
    } else {
      // Show error toast if product is already in the basket
      toast.error(`${productInfo.productName} is already in the basket`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Remove product from basket
  const removeFromBasket = (productKey) => {
    const updatedBasket = basketItems.filter(
      (item) => item.keyProp !== productKey
    );
    setBasketItems(updatedBasket);
  };

  // Object to associate product image names with image sources
  const productImages = {
    "Sky F1": skyF1Image,
    "Sky Golf": SkySportsGolf,
    "Sky Tennis": SkySportsTennis,
    "Sky Football": SkySportsFootball,
    "Sky Horror": SkyHorror,
    "Sky Cinema": SkyCinema,
  };

  // Render the app from other components and pass props to them
  return (
    <>
      <h1 className="text-center font-bold mt-4">Sky</h1>
      <div className="flex flex-col md:flex-row h-screen ml-4">
        <div className="flex-grow">
          {Object.entries(productsByType).map(([type, products], index) => (
            <React.Fragment key={type}>
              <ProductCategory name={type} />
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                role="grid"
              >
                {products.map((product, productIndex) => (
                  <ProductCard
                    key={productIndex}
                    productName={product.name}
                    description={product.description}
                    monthlyCost={parseFloat(product.monthlyCost)}
                    contractLength={parseFloat(product.contractLength)}
                    src={productImages[product.name]}
                    type={product.type}
                    keyProp={`${product.type}_${productIndex}`}
                    addToBasket={addToBasket}
                    removeFromBasket={removeFromBasket}
                    isInBasket={basketItems.some(
                      (item) =>
                        item.keyProp === `${product.type}_${productIndex}`
                    )}
                    role="gridcell"
                  />
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="md:h-screen md:w-1/3 p-4 mt-16" role="complementary">
          <Basket items={basketItems} removeFromBasket={removeFromBasket} />
        </div>
      </div>

      <ToastContainer aria-live="polite" role="status" />
    </>
  );
}

export default App;
