import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/product';
import './styles/shave-form.css';
import { addShave } from '../actions/shave';

class ShaveForm extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      razorId : e.target.razor.value,
      bladeId: e.target.blade.value,
      brushId: e.target.brush.value,
      latherId: e.target.lather.value,
      aftershaveId: e.target.aftershave.value,
      additionalCareId: e.target.additionalcare.value,
      rating: e.target.rating.value,
      date: e.target.date.value
    };
    this.props.dispatch(addShave(data));
  }
  
  render() {
    let productsObj = {};
    
    if (this.props.userProducts) {
      // initializes productsObj
      this.props.userProducts.forEach(product => {
        productsObj[product.productType] = [];
      });
      // pushes correct products into each array in the object
      this.props.userProducts.forEach(product => {
        productsObj[product.productType].push(product);
      });
    }
    
    for (let key in productsObj) {
      productsObj[key] = productsObj[key].map(product => {
        return (
          <option value={product.id} key={product.id}>{product.nickname}</option>
        )
      })
    }

    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <h3>Add Shave</h3>
        <label htmlFor='date'>Date</label>
        <input type='date' id='date' name='date'/>
        <label htmlFor='razor'>Razor</label>
        <select id='razor' className='field-divided' name='razor'>
          {productsObj ? productsObj.razor:null}
        </select>
        <label htmlFor='blade'>Blade</label>
        <select id='blade' className='field-divided' name='blade'>
          {productsObj ? productsObj.blade:null}
        </select>
        <label htmlFor='brush'>Brush</label>
        <select id='brush' name='brush'>
          {productsObj ? productsObj.brush:null}
        </select>
        <label htmlFor='lather'>Lather</label>
        <select id='lather' name='lather'>
          {productsObj ? productsObj.lather:null}
        </select>
        <label htmlFor='aftershave'>Aftershave</label>
        <select id='aftershave' name='aftershave'>
          {productsObj ? productsObj.aftershave:null}
        </select>
        <label htmlFor='additonalcare'>Additional Care</label>
        <select id='additionalcare' name='additionalcare'>
          {productsObj ? productsObj.additionalcare:null}
        </select>
        <input type="radio" id="star5" name="rating" value='5'/>
        <input type="radio" id="star4" name="rating" value='4'/>
        <input type="radio" id="star3" name="rating" value='3'/>
        <input type="radio" id="star2" name="rating" value='2'/>
        <input type="radio" id="star1" name="rating" value='1'/>
        <input type='submit' value='Submit'/>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.productReducer.loading,
  error: state.productReducer.error,
  userProducts: state.productReducer.userProducts,
});

export default connect(mapStateToProps)(ShaveForm);