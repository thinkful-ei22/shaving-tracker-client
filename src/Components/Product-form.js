import React from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../actions/product';

class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type:['Subtypes','Double Edge', 'Straight Razor', 'Shavette', 'Cartidge', 'Single Edge']
    };
  }
  onSubmit(e) {
    e.preventDefault();
    const data = {
      productType: e.target.productType.value === '' ? null : e.target.productType.value,
      brand: e.target.brand.value,
      model: e.target.model.value,
      nickname: e.target.nickname.value,
      comment: e.target.comment.value,
      subtype: e.target.subtype.value === 'subtypes' ? null : e.target.subtype.value 
    };
    this.props.dispatch(addProduct(data));
  }
  
  handleProductChange(e) {
    if (e.target.value ==='razor') {
      this.setState({type:['Subtypes','Double Edge', 'Straight Razor', 'Shavette', 'Cartidge', 'Single Edge']});
    }
    else if (e.target.value === 'brush') {
      this.setState({type:['Subtypes','Badger', 'Boar', 'Horse', 'Synthetic']});
    }
    else if (e.target.value === 'lather') {
      this.setState({type:['Subtypes','Cream', 'Soap', 'Oil']});
    }
    else {
      this.setState({type:['Subtypes']});
    }
  }

  render() {
    const typeList = this.state.type.map((type,index) => {
      return (
        <option value={type.toLowerCase()} key={index}>{type}</option>
      );
    });

    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <select onChange={e => this.handleProductChange(e)} name='productType' id='productType'>
          <option selected='selected' value='razor'>Razor</option>
          <option value='blade'>Blade</option> 
          <option value='brush'>Brush</option>
          <option value='lather'>Lather</option>
          <option value='aftershave'>Aftershave</option>
          <option value='additonalcare'>Additional Care</option>
        </select>
        <select id='subtype' name='subtype'>{typeList}</select>
        <input name='brand' placeholder='brand'/>
        <input name='model' placeholder='model'/>
        <input name='nickname' placeholder='nickname'/>
        <textarea name='comment' placeholder='Comment/Notes' />
        <button type='submit'>Submit</button>
      </form>
    );
  }
}

export default connect()(ProductForm);