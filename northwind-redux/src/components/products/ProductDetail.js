import React from "react";
import TextInput from "../toolbox/TextInput";
import SelectInput from "../toolbox/SelectInput";

const ProductDetail = ({ categories, product, onSave, onChange, errors, onClick }) => {
  return (
    <div>
      <form onSubmit={onSave}>
        <h2>{product.id ? "Update" : "Add"}</h2>
        <TextInput
          name="productName"
          label="Product Name"
          value={product.productName}
          onChange={onChange}
          error={errors.productName}
          placeHolder="Product Name"
        />

        <SelectInput
          name="categoryId"
          label="Category"
          value={product.categoryId || ""}
          defaultOption="Seçiniz"
          options={categories.map((category) => ({
            value: category.id,
            text: category.categoryName,
          }))}
          onChange={onChange}
          error={errors.categoryId}
        />

        <TextInput
          name="unitPrice"
          label="Unit Price"
          value={product.unitPrice}
          onChange={onChange}
          error={errors.unitPrice}
          placeHolder="Product Unit Price"
        />

        <TextInput
          name="quantityPerUnit"
          label="Quantity Per Unit"
          value={product.quantityPerUnit}
          onChange={onChange}
          error={errors.quantityPerUnit}
          placeHolder="Product Quantity Per Unit"
        />

        <TextInput
          name="unitsInStock"
          label="Units In Stock"
          value={product.unitsInStock}
          onChange={onChange}
          error={errors.unitsInStock}
          placeHolder="Product Units In Stock"
        />

        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
      <hr />
        {product.id ? <button className="btn btn-danger" onClick={onClick}>Delete {product.productName}</button> : ""}
    </div>
  );
};

export default ProductDetail;
