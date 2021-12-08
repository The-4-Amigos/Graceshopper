import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    console.log(this.props)
    const {products} = this.props
    return (
      <div>
        <h1>Our Current Liquor Selection:</h1>
        <div>
          {/* o: why are you checking for undefined here */}
          {products.length < 1 || products === undefined ? (
            <h1>We are completely out of stock :(</h1>
          ) : (
            products.map((product) => (
              <div className="single-product-border" key={product.id}>
                <h2>{product.name}</h2>
                <img src={product.image} />
                <h3>${product.price}</h3>
                {/* o: if you are going to do this in more than one place, write a function */}
                <h3>ABV(Alcohol by Volume): {product.ABV * 100}%</h3>
                <p>Description: {product.description}</p>
                <p>Units in Stock: {product.stockAmount}</p>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => {
      dispatch(fetchProducts())
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
