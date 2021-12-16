return (
  <table className= 'shopping-cart'>
    <thead>
      <tr>
        <th>Product Name</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Subtotal</th>
        <th>Delete</th>
      </tr>
    </thead>

    <tbody>
      {cartItems.map((item) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.price}</td>

          <td>
            <input
              type="number"
              min="1"
              max={item.stockAmount}
              value={item.qty}
              onChange={(event) => this.handleQtyChange(event, item)}
            />
          </td>
          <td>${totalAmount} {(item === 1 ? 'item' : 'items')}</td>
        </tr>
      ))}
    </tbody>

    <tfoot>
      <tr>
        <td colspan={5}>
          
        </td>
      </tr>
    </tfoot>
  </table>
);
