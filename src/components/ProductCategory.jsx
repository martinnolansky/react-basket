import React from "react";

// Display the name of each product category with props passed in from App.js
const ProductCategory = (props) => {
  const { name } = props;
  return (
    <header>
      <h2 className="text-2xl font-semibold mt-12" aria-level="2">
        {name}
      </h2>
    </header>
  );
};

export default ProductCategory;
