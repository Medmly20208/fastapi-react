import { FormEvent, useState } from "react";

import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    customerCareCalls: "",
    customerRating: "",
    costOfProduct: "",
    priorPurchases: "",
    discountOffered: "",
    weightInGms: "",
    warehouseBlock: "",
    modeOfShipment: "",
    productImportance: "",
    gender: "",
  });
  const [result, setResult] = useState("");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const features = {
      features: [
        Number(formData.customerCareCalls) || 0,
        Number(formData.customerRating) || 0,
        Number(formData.costOfProduct) || 0,
        Number(formData.priorPurchases) || 0,
        Number(formData.discountOffered) || 0,
        Number(formData.weightInGms) || 0,
        formData.warehouseBlock === "A",
        formData.warehouseBlock === "B",
        formData.warehouseBlock === "C",
        formData.warehouseBlock === "D",
        formData.warehouseBlock === "F",
        formData.modeOfShipment === "Flight",
        formData.modeOfShipment === "Road",
        formData.modeOfShipment === "Ship",
        formData.productImportance === "high",
        formData.productImportance === "low",
        formData.productImportance === "medium",
        formData.gender === "F",
        formData.gender === "M",
        false, // Static placeholder for the final item
      ],
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(features),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Prediction result:", result);
      setResult(result.prediction);
      // Handle result, e.g., display it to the user
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, e.g., show error message to the user
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Customer Details Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Customer Care Calls</label>
          <input
            type="number"
            name="customerCareCalls"
            value={formData.customerCareCalls}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Customer Rating</label>
          <input
            type="number"
            name="customerRating"
            value={formData.customerRating}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Cost of the Product</label>
          <input
            type="number"
            name="costOfProduct"
            value={formData.costOfProduct}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Prior Purchases</label>
          <input
            type="number"
            name="priorPurchases"
            value={formData.priorPurchases}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Discount Offered</label>
          <input
            type="number"
            name="discountOffered"
            value={formData.discountOffered}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Weight in grams</label>
          <input
            type="number"
            name="weightInGms"
            value={formData.weightInGms}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Warehouse Block</label>
          <div className="flex space-x-4 mt-1">
            {["A", "B", "C", "D", "F"].map((block) => (
              <label key={block} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="warehouseBlock"
                  value={block}
                  checked={formData.warehouseBlock === block}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Block {block}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Mode of Shipment</label>
          <div className="flex space-x-4 mt-1">
            {["Flight", "Road", "Ship"].map((mode) => (
              <label key={mode} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="modeOfShipment"
                  value={mode}
                  checked={formData.modeOfShipment === mode}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>{mode}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Product Importance</label>
          <div className="flex space-x-4 mt-1">
            {["high", "low", "medium"].map((level) => (
              <label key={level} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="productImportance"
                  value={level}
                  checked={formData.productImportance === level}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Gender</label>
          <div className="flex space-x-4 mt-1">
            {["F", "M"].map((gender) => (
              <label key={gender} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>{gender === "F" ? "Female" : "Male"}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <h2 className="">result is {result}</h2>
    </div>
  );
}

export default App;
