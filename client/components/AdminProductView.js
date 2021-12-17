import React from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../store/products';

export class CreateProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image: '',
      ABV: '',
      stockAmount: '',
      price: '',
      description: '',
      alcoholType: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createProduct({ ...this.state });
  }
  render() {
    const { handleSubmit, handleChange } = this;
    console.log(this.state);
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name:</label>
        <input name="name" onChange={handleChange} />

        <label htmlFor="image">Product image:</label>
        <input name="image" onChange={handleChange} />

        <label htmlFor="ABV">ABV%:</label>
        <input name="ABV" onChange={handleChange} />

        <label htmlFor="stockAmount">Stock Amount:</label>
        <input name="stockAmount" onChange={handleChange} />

        <label htmlFor="price">Price:$</label>
        <input name="price" onChange={handleChange} />

        <label htmlFor="description">Description:</label>
        <input name="description" onChange={handleChange} />

        <label htmlFor="alcoholType">Alcohol Type:</label>
        <input name="alcoholType" onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapDispatch = {
  createProduct: createProduct,
};

export default connect(null, mapDispatch)(CreateProduct);
