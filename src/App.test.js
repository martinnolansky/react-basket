// Imports
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./components/ProductCard.jsx";
import Basket from "./components/Basket.jsx";
import ProductCategory from "./components/ProductCategory.jsx";
import App from "./App";
import skyF1Image from "./assets/images/SkySportsF1.png";

// Mock functions for addToBasket and removeFromBasket
const mockAddToBasket = jest.fn();
const mockRemoveFromBasket = jest.fn();

// Mock product for tests
const sampleProduct = {
  productName: "Sample Product",
  description: "This is a sample product.",
  monthlyCost: 19.99,
  contractLength: 12,
  keyProp: "sample_key",
  type: "Sample Type",
  src: skyF1Image,
};

// Mock multiple products in basket for tests
const sampleProducts = [
  {
    productName: "Sample Product 2",
    description: "This is a sample product 2.",
    monthlyCost: 19.99,
    contractLength: 12,
    keyProp: "sample_key_2",
    type: "Sample Type",
    src: skyF1Image,
  },
  {
    productName: "Sample Product 3",
    description: "This is a sample product 3.",
    monthlyCost: 19.99,
    contractLength: 12,
    keyProp: "sample_key_3",
    type: "Sample Type",
    src: skyF1Image,
  },
];

/*
This test checks if the ProductCard renders correctly with the provided sample product data.
It verifies that various elements such as product name, description, monthly cost, contract length, and the "Add to Basket" 
button are present in the rendered component. This helps ensure that the component displays the expected content.
calls addToBasket when Add to Basket button is clicked:
*/
test("renders ProductCard correctly", () => {
  render(
    <ProductCard
      {...sampleProduct}
      addToBasket={mockAddToBasket}
      removeFromBasket={mockRemoveFromBasket}
      isInBasket={false}
    />
  );
  // Check if the component renders correctly
  expect(screen.getByText("Sample Product")).toBeInTheDocument();
  expect(screen.getByText("This is a sample product.")).toBeInTheDocument();
  expect(screen.getByText("Monthly Cost: £19.99")).toBeInTheDocument();
  expect(screen.getByText("Contract Length: 12 months")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});

/*
This test simulates a click on the "Add to Basket" button and checks if the addToBasket function was called with the correct arguments.
It uses fireEvent.click to simulate a button click and then asserts that the mockAddToBasket function was called with the expected product information.
This is a crucial test to verify that the interaction with the "Add to Basket" button works as intended.
*/
test("calls addToBasket when Add to Basket button is clicked", () => {
  render(
    <ProductCard
      {...sampleProduct}
      addToBasket={mockAddToBasket}
      removeFromBasket={mockRemoveFromBasket}
      isInBasket={false}
    />
  );

  // Click the "Add to Basket" button
  fireEvent.click(screen.getByText("Add to Basket"));

  // Check if addToBasket was called with the correct arguments
  expect(mockAddToBasket).toHaveBeenCalledWith({
    productName: "Sample Product",
    monthlyCost: 19.99,
    contractLength: 12,
    type: "Sample Type",
    keyProp: "sample_key",
  });
});

/*
This test simulates a click on the "Remove from Basket" button and checks if the removeFromBasket function was called with the correct arguments.
It uses fireEvent.click to simulate a button click and then asserts that the mockRemoveFromBasket function was called with the expected product information.
This is a crucial test to verify that the interaction with the "Remove from Basket" button works as intended.
*/
test("calls removeFromBasket when Remove from Basket button is clicked", () => {
  render(
    <ProductCard
      {...sampleProduct}
      addToBasket={mockAddToBasket}
      removeFromBasket={mockRemoveFromBasket}
      isInBasket={true} // Set isInBasket to true initially
    />
  );

  // Ensure the "Remove from Basket" button is present
  expect(screen.getByText("Remove from Basket")).toBeInTheDocument();

  // Click the "Remove from Basket" button
  fireEvent.click(screen.getByText("Remove from Basket"));

  // Check if removeFromBasket was called with the correct keyProp
  expect(mockRemoveFromBasket).toHaveBeenCalledWith("sample_key");
});

/*
This test simulates a click on the "Remove" button and checks if the removeFromBasket function was called with the correct arguments.
It uses fireEvent.click to simulate a button click and then asserts that the mockRemoveFromBasket function was called with the expected product information.
This is a crucial test to verify that the interaction with the "Remove" button works as intended.
*/
test("calls removeFromBasket when remove button is clicked inside basket", () => {
  render(
    <Basket items={[sampleProduct]} removeFromBasket={mockRemoveFromBasket} />
  );

  // Ensure the "Remove" button is present
  expect(screen.getByText("Remove")).toBeInTheDocument();

  // Click the "Remove" button
  fireEvent.click(screen.getByText("Remove"));

  // Check if removeFromBasket was called with the correct keyProp
  expect(mockRemoveFromBasket).toHaveBeenCalledWith("sample_key");
});

// Test to check if the correct total amount is displayed for products in the basket
test("displays correct total in the basket", () => {
  render(
    <Basket items={sampleProducts} removeFromBasket={mockRemoveFromBasket} />
  );

  // Calculate the expected total
  const expectedTotal = sampleProducts.reduce(
    (total, item) => total + parseFloat(item.monthlyCost || 0),
    0
  );

  // Ensure each product is displayed with its name, cost, and remove button
  sampleProducts.forEach((item) => {
    expect(
      screen.getByText(`${item.productName} - £${item.monthlyCost} per month`)
    ).toBeInTheDocument();

    const removeButton = screen.getByTestId(`remove-button-${item.keyProp}`);

    // Click the "Remove" button
    fireEvent.click(removeButton);

    // Check if removeFromBasket was called with the correct keyProp
    expect(mockRemoveFromBasket).toHaveBeenCalledWith(item.keyProp);
  });

  // Ensure the total is displayed correctly
  expect(
    screen.getByText(`Total Amount: £${expectedTotal.toFixed(2)}`)
  ).toBeInTheDocument();
});

// Test to make sure the correct product category header is displayed
test("renders ProductCategory with the correct name", () => {
  // Define the category name you want to test
  const categoryName = "Sports";

  // Render the ProductCategory component with the specified name
  render(<ProductCategory name={categoryName} />);

  // Check if the rendered component contains the correct category name
  expect(screen.getByText(categoryName)).toBeInTheDocument();
});

// Test to check if the basket displays correct information for products
test("displays correct content for non-empty basket", () => {
  const sampleItem = {
    keyProp: "sample_key",
    productName: "Sample Product",
    monthlyCost: 19.99,
  };

  render(
    <Basket items={[sampleItem]} removeFromBasket={mockRemoveFromBasket} />
  );

  // Check if the content for a non-empty basket is displayed using data-test-id
  expect(
    screen.getByTestId(`basket-item-${sampleItem.keyProp}`)
  ).toBeInTheDocument();
});

// Test to check if the basket is empty and displays correctly
test("does not display content for empty basket", () => {
  render(<Basket items={[]} removeFromBasket={mockRemoveFromBasket} />);

  // Check if the content for an empty basket is not present using data-test-id
  expect(screen.queryByTestId("empty-basket-message")).not.toBeInTheDocument();
});

// Test the app renders without crashing
test("renders App component without crashing", () => {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);

  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root
  );

  // Check if specific elements are present in the document
  expect(screen.getByText("Sky")).toBeInTheDocument();
  expect(screen.getByText("Sky F1")).toBeInTheDocument();
  expect(screen.getByText("Sky Golf")).toBeInTheDocument();
  expect(screen.getByText("Sky Tennis")).toBeInTheDocument();
  expect(screen.getByText("Sky Football")).toBeInTheDocument();
  expect(screen.getByText("Sky Horror")).toBeInTheDocument();
  expect(screen.getByText("Sky Cinema")).toBeInTheDocument();
  expect(screen.getByText("Basket")).toBeInTheDocument();
});

// Snapshot test to capture the rendered output component and compare it to stored "snapshot" to ensure that it remains consistent over time.
test("ProductCard snapshot", () => {
  // Render the component
  const { asFragment } = render(
    <ProductCard
      productName="Sample Product"
      description="This is a sample product."
      monthlyCost={19.99}
      contractLength={12}
      src="path/to/image.png"
      type="Sample Type"
      keyProp="sample_key"
      addToBasket={() => {}}
      removeFromBasket={() => {}}
      isInBasket={false}
    />
  );

  // Compare the rendered component with the stored snapshot
  expect(asFragment()).toMatchSnapshot();
});
