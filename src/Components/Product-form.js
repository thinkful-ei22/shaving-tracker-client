import React from 'react';


class ProductForm extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    const data = {
      productType: e.target.productType.value,
      brand: e.target.brand.value,
      model: e.target.model.value,
      nickname: e.target.nickname.value,
      comment: e.target.comment.value
    };
    console.log(data);
  }

  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <select name='productType'>
          <option>Type</option>
          <option value='razor'>Razor</option>
          <option value='blade'>Blade</option>
          <option value='brush'>Brush</option>
          <option value='lather'>Lather</option>
          <option value='aftershave'>Aftershave</option>
          <option value='additonalcare'>Additional Care</option>
        </select>
        <input name='brand' placeholder='brand'/>
        <input name='model' placeholder='model'/>
        <input name='nickname' placeholder='nickname'/>
        <textarea name='comment' placeholder='Comment/Notes' />
        <button type='submit'>Submit</button>
      </form>
    );
  }
}

export default ProductForm;