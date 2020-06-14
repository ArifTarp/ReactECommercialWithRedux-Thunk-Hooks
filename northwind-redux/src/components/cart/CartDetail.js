import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Table, Button } from "reactstrap";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";

class CartDetail extends Component {
  removeFromCart = (cartItem) => {
    this.props.actions.removeFromCart(cartItem);
    alertify.error(cartItem.product.productName + " Remove From Cart!");
  };

  deleteCart = () => {
    this.props.actions.deleteCart();
    alertify.error("All Cart Deleted!");
  };

  renderEmptyCartDetail() {
    return (
      <div>
        <h3>Cart Is Empty...</h3>
      </div>
    );
  }

  renderCartDetail() {
    return (
      <div>
        <h3>
          <Badge color="warning">Cart Detail</Badge> -{" "}
          <Button outline color="danger" onClick={() => this.deleteCart()}>
            Delete All Cart Products
          </Button>
        </h3>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity In Cart</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map((cartItem) => (
              <tr key={cartItem.product.id}>
                <th scope="row">{cartItem.product.id}</th>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.product.unitPrice}</td>
                <td>{cartItem.quantity}</td>
                <td>
                  <Button
                    outline
                    color="danger"
                    onClick={() => this.removeFromCart(cartItem)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0
          ? this.renderCartDetail()
          : this.renderEmptyCartDetail()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
      deleteCart: bindActionCreators(cartActions.deleteCart, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
