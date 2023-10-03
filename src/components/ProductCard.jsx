import React from "react";
import PropTypes from "prop-types";

// Destructure the ProductCard component with props that are passed from App.js
const ProductCard = (props) => {
  const {
    productName,
    src,
    description,
    monthlyCost,
    contractLength,
    keyProp,
    type,
    addToBasket,
    removeFromBasket,
    isInBasket,
  } = props;

  // On button click, run removeFromBasket if item is in basket or addToBasket if item is not in basket, passing in unique keyProp ID
  const buttonClick = () => {
    if (isInBasket) {
      removeFromBasket(keyProp);
    } else {
      addToBasket({
        productName,
        monthlyCost,
        contractLength,
        type,
        keyProp,
      });
    }
  };

  // Return the JSX for each productCard, displaying the product details and updating the button dynamically depending if the product is in the basket
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img
          className="rounded-t-lg mx-auto"
          src={src}
          alt={`${productName} Logo`}
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {productName}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Monthly Cost: £{monthlyCost}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Contract Length: {contractLength} months
          </p>
          <button
            onClick={buttonClick}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isInBasket ? "Remove from Basket" : "Add to Basket"}
          </button>
        </div>
      </div>
    </>
  );
};

// Define propTypes to ensure type safety of props that are passed to ProductCard Component
ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  monthlyCost: PropTypes.number.isRequired,
  contractLength: PropTypes.number.isRequired,
  keyProp: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  addToBasket: PropTypes.func.isRequired,
  removeFromBasket: PropTypes.func.isRequired,
  isInBasket: PropTypes.bool.isRequired,
};

export default ProductCard;
