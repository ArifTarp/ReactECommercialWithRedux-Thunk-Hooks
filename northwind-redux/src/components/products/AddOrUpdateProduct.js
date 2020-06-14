import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import { deleteProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
import alertify from "alertifyjs";

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  deleteProduct,
  deletedProductList,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }

    setProduct({ ...props.product });
  }, [props.product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));

    validate(name, value);
  }

  function validate(name, value) {
    if (name === "productName" && value === "") {
      setErrors((previousErros) => ({
        ...previousErros,
        productName: "Must Be Product Name",
      }));
    } else if (name === "categoryId" && value === "") {
      setErrors((previousErros) => ({
        ...previousErros,
        categoryId: "You Have To Choose Category",
      }));
    } else if (name === "unitPrice" && value === "") {
      setErrors((previousErros) => ({
        ...previousErros,
        unitPrice: "Must Be Unit Price",
      }));
    } else if (name === "quantityPerUnit" && value === "") {
      setErrors((previousErros) => ({
        ...previousErros,
        quantityPerUnit: "Must Be Quantity Per Unit",
      }));
    } else if (name === "unitsInStock" && value === "") {
      setErrors((previousErros) => ({
        ...previousErros,
        unitsInStock: "Must Be Units In Stock",
      }));
    } else {
      setErrors((previousErros) => ({
        ...previousErros,
        [name]: "",
      }));
    }
  }

  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(() => {
      history.push("/");
    });
    alertify.success(product.productName + " Saved To Products");
  }

  function handleDelete(event) {
    event.preventDefault();
    deleteProduct(product).then(() => {
      history.push("/");
    });
    alertify.error(product.productName + " Deleted From Products");
  }

  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
      onClick={handleDelete}
    />
  );
}

export function getProductById(products, productId) {
  let product = products.find((p) => p.id == productId) || null;
  return product;
}

function mapStateToProps(state, ownProps) {
  const productId = ownProps.match.params.productId;
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};

  return {
    product: product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
    deletedProductList: state.deleteProductReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
  deleteProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
