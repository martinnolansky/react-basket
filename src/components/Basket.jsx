import React from "react";

const Basket = ({ items, removeFromBasket }) => {
  // Run removeFromBasket in App.js if remove button clicked
  const handleRemoveClick = (productKey) => {
    removeFromBasket(productKey);
  };

  // Calculate total amount of items in basket
  const totalAmount = items.reduce(
    (total, item) => total + parseFloat(item.monthlyCost || 0),
    0
  );

  // Render the basket items, updating new mapped array when items are added or removed from
  return (
    <aside aria-live="polite">
      <div className="border-8 border-black inline-block p-4">
        <h2 className="mb-4" aria-level="2">
          Basket
        </h2>
        <ul>
          {items.map((item, index) => (
            <li key={index} data-testid={`basket-item-${item.keyProp}`}>
              {item.productName} - £{item.monthlyCost} per month
              <button
                onClick={() => handleRemoveClick(item.keyProp)}
                data-testid={`remove-button-${item.keyProp}`}
                className="ml-2 text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        {items.length === 0 && (
          <p data-test-id="empty-basket-message" role="status">
            Your basket is empty.
          </p>
        )}
        <p className="mt-4 font-bold" role="status">
          Total Amount: £{totalAmount.toFixed(2)}
        </p>
      </div>
    </aside>
  );
};

export default Basket;
