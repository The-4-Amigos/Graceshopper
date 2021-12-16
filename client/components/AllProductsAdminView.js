
import React from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import { deleteProductAdmin, fetchProductsAdmin } from "../store/productsAdmin";
import AddProductByAdminForm from "./AddProductByAdminForm";

class AllProductsAdminView extends React.Component {
  componentDidMount() {
    this.props.getProductsAdmin();
  }

  render() {
    const { productsAdmin } = this.props;
    return (
      <div>
        <h1>Our Current Liquor Selection:</h1>
        <div>
            <Route path="/adminProducts" component={AddProductByAdminForm} />
        </div>
        <div>
          {productsAdmin.length < 1 ? (
            <h1>We are completely out of stock :(</h1>
          ) : (
            <div className='allProducts'>
            {productsAdmin.map((productAdmin) => (
              <div className="single-productAdmin-border" key={productAdmin.id}>
                  <h2>{productAdmin.name}</h2>
                  <img className="products-image-size" src={productAdmin.image} height='50' width='50'/>
                  <div>
                  <Link to={`/adminProducts/${productAdmin.id}`}> 
                    <button className="view-more-product-info-button">Click for More Info</button>
                  </Link>
                  </div>
                  <h3>${productAdmin.price}</h3>
                  <div className="delete-button-div">
                      <button className="delete-button" type="submit" onClick={() => {this.props.deleteProductAdmin(productAdmin.id)}}>DELETE USER || X</button>
                  </div>
                <div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productsAdmin: state.productsAdmin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsAdmin: () => {
      dispatch(fetchProductsAdmin());
    },
    deleteProductAdmin: (productAdmin) => {
      dispatch(deleteProductAdmin(productAdmin))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllProductsAdminView);
