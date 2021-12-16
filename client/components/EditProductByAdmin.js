import React from 'react'
import { connect } from 'react-redux'
import { updateProductAdmin } from '../store/singleProductAdmin'
 
class EditProductByAdmin extends React.Component {
   constructor (props) {
       super(props)
       this.state = {
           name: this.props.product.name || '',
           image: this.props.product.image || '',
           ABV: this.props.product.ABV || '',
           stockAmount: this.props.product.stockAmount || '',
           price: this.props.product.price || '',
           description: this.props.product.description || '',
           alcoholType: this.props.product.alcoholType || '',
       }
       this.handleChange = this.handleChange.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this)
   }
 
   componentDidUpdate (prevProps) {
       if (prevProps.product.id !== this.props.product.id) {
           this.setState({
           name: this.props.product.name || '',
           image: this.props.product.image || '',
           ABV: this.props.product.ABV || '',
           stockAmount: this.props.product.stockAmount || '',
           price: this.props.product.price || '',
           description: this.props.product.description || '',
           alcoholType: this.props.product.alcoholType || ''
           })
       }
   }
 
   handleChange (event) {
       this.setState({
           [event.target.name]: event.target.value
       })
   }
 
   handleSubmit (event) {
       event.preventDefault()
       this.props.updateProductAdmin({...this.props.product, ...this.state})
   }
 
   render () {
       const { name, image, ABV, stockAmount, price, description, alcoholType } = this.state
       const { handleSubmit, handleChange, } = this
       return (
           <div className="single-user-info">
               <h3>Enter Changes Below Then Save Changes</h3>
               <form onSubmit={handleSubmit}>
                   <div>
                       <label htmlFor="name">Edit Name: </label>
                       <input type="text" name= "name" onChange={handleChange} value={name} />
 
                       <label htmlFor="image">Edit Image Link: </label>
                       <input name= "image" onChange={handleChange} value={image} />
                      
                       <label htmlFor="ABV">Edit ABV: </label>
                       <input type="text" name= "ABV" onChange={handleChange} value={ABV} />
 
                       <label htmlFor="stockAmount">Edit Stock Amount: </label>
                       <input name= "stockAmount" onChange={handleChange} value={stockAmount} />
 
                       <label htmlFor="price">Edit Price: </label>
                       <input type="text" name= "price" onChange={handleChange} value={price} />
 
                       <label htmlFor="description">Edit Description: </label>
                       <input name= "description" onChange={handleChange} value={description} />
 
                       <label htmlFor="alcoholType">Edit Category: </label>
                       <input name= "alcoholType" onChange={handleChange} value={alcoholType} />
                       </div>                       
                   <div>
                       <button type="submit">Save Changes</button>
                   </div>
               </form>
           </div>
       )
   }
}
 
const mapDispatchToProps = (dispatch) => {
   return {
       updateProductAdmin: (product) => dispatch(updateProductAdmin(product)),
   }
}
export default connect(null, mapDispatchToProps)(EditProductByAdmin)
 

