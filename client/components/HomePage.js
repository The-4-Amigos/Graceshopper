import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import { addProduct } from "../store/CheckoutStore";
import swal from "sweetalert";


const sweetAlert = () => {
  swal({
    title: 'Must be 21 or over to enter the page',
    icon: 'warning',
  })
}
export const HomePage = ()=>{
    return (
      <section className="home">
        <div className="content">
          <h3>should be our logo</h3>
          <p>
            Cincoro Tequilas are uniquely made with Weber blue agave from both
            the highland and lowland regions that have been cooked and distilled
            separately then artfully blended together into a single exceptional
            tequila.
          </p>
          <img onClick={sweetAlert()}
            className="products-image-size"
            src="https://image.shutterstock.com/image-photo/vavrisovo-slovakia-september-14-2019-600w-1573639624.jpg"
            height="50"
            width="50"
          />
          </div>
      </section>
    );
}

// const mapStateToProps = (state) => {
//   return {
//     products: state.products,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getProducts: () => {
//       dispatch(fetchProducts());
//     },
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
