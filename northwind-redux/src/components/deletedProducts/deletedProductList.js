import React from "react";
import { connect } from "react-redux";
import { Badge, Table } from "reactstrap";

function DeletedProductList({ deletedProductList, ...props }) {
  return (
    <div>
      <h3>
        <Badge color="warning">Deleted Products</Badge>
      </h3>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Quantity Per Unit</th>
            <th>Units In Stock</th>
          </tr>
        </thead>
        <tbody>
          {deletedProductList.map((deletedProduct) => (
            <tr key={deletedProduct.id}>
              <th scope="row">{deletedProduct.id}</th>
              <td>{deletedProduct.productName}</td>
              <td>{deletedProduct.unitPrice}</td>
              <td>{deletedProduct.quantityPerUnit}</td>
              <td>{deletedProduct.unitsInStock}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    deletedProductList: state.deleteProductReducer,
  };
}

export default connect(mapStateToProps)(DeletedProductList);
