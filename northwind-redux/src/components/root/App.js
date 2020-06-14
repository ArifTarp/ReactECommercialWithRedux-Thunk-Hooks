import React from "react";
import DashBoard from "./DashBoard";
import Navi from "../navi/Navi";
import { Container } from "reactstrap";
import { Route, Switch } from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import NotFound from "../common/NotFound";
import deletedProductList from "../deletedProducts/deletedProductList";

function App() {
  return (
    <Container>
      <Navi />
      <Switch>
        <Route path="/" exact component={DashBoard} />
        <Route path="/cart" component={CartDetail} />
        <Route path="/saveProduct/:productId" component={AddOrUpdateProduct} />
        <Route path="/saveProduct" component={AddOrUpdateProduct} />
        <Route path="/deletedProductList" component={deletedProductList} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
}

export default App;
