import React from 'react';
import PropTypes from 'prop-types';
import './styles/csv-products.css';

const CSVProductsCard = props => {
  const {
    brand, model, subtype, nickname, comment, productType, index, handleChange, handleRemove,
  } = props;
  let types = [];
  const razorTypes = ['Double Edge', 'Straight Razor', 'Shavette', 'Cartidge', 'Single Edge'];
  const brushTypes = ['Badger', 'Boar', 'Horse', 'Synthetic'];
  const latherTypes = ['Cream', 'Soap', 'Oil'];
  let productTypeStyle = '';
  let falseOption;
  let subtypeError = false;

  if (productType.toLowerCase() === 'razor') {
    types = razorTypes;
    if (!new RegExp(razorTypes.join('|'), 'i').test(subtype)) {
      subtypeError = true;
      types.unshift(subtype);
    }
  } else if (productType.toLowerCase() === 'brush') {
    types = brushTypes
    if (!new RegExp(brushTypes.join('|'), 'i').test(subtype)) {
      subtypeError = true;
      types.unshift(subtype);
    }
  } else if (productType.toLowerCase() === 'lather') {
    types = latherTypes;
    if (!new RegExp(latherTypes.join('|'), 'i').test(subtype)) {
      subtypeError = true;
      types.unshift(subtype);
    }
  } else {
    types = ['none'];
    //eslint-disable-next-line
    /none/i.test(subtype) ? null : types.unshift(subtype);

  }

  const typeList = types.map(type => (
    <option value={type.toLowerCase()} key={type}>{type}</option>
  ));

  if (!/(.*razor.*)|(.*blade.*)|(.*brush.*)|(.*lather.*)|(.*aftershave.*)|(.*additional\s?care.*)/i.test(productType)) {
    productTypeStyle = 'red';
    subtypeError = true;
    falseOption = <option value={null}>{`${productType} not a valid Product Type`}</option>
  } 
  
  return (
    <section className="collection-item relative csv-item">
      <button className="close-item" onClick={handleRemove} type="button" name={`remove-item ${index}`}/>
      <h3>{`Product ${index+1}`}</h3>
      <span className="collection-item-type">
        Product Type:
      </span>
      <div className={productTypeStyle}>
        <select 
          defaultValue={productTypeStyle ? '': productType.toLowerCase()} 
          name={`productType ${index}`}
          onChange={handleChange}
          className="col-6"
        >
          {falseOption}
          <option value="razor">Razor</option>
          <option value="blade">Blade</option>
          <option value="brush">Brush</option>
          <option value="lather">Lather</option>
          <option value="aftershave">Aftershave</option>
          <option value="additionalcare">Additional Care</option>
        </select>
      </div>
      <span className="collection-item-type">
        Subtype:
      </span>
      <div className={subtypeError ? 'red' : ''}>
        <select 
          defaultValue={subtype.toLowerCase() || 'none'} 
          name={`subtype ${index}`}
          onChange={handleChange}
          className={subtypeError ? 'red' : ''}
        >
          {typeList}
        </select>
      </div>
      <span className="collection-item-type">
        Brand:
      </span>
      <input 
        type="text" 
        value={brand} 
        name={`brand ${index}`} 
        onChange={handleChange}
      />
      <span className="collection-item-type">
        Model:
      </span>
      <input 
        type="text" 
        value={model} 
        name={`model ${index}`} 
        onChange={handleChange}
      />
      <span className="collection-item-type">
        Nickname:
      </span>
      <input 
        type="text" 
        value={nickname} 
        name={`nickname ${index}`} 
        onChange={handleChange}
      />
      <span className="collection-item-type">
        Comment:
      </span>
      <input 
        type="text" 
        value={comment} 
        name={`comment ${index}`} 
        onChange={handleChange}
      />
    </section>
  );
};

CSVProductsCard.propTypes = {
  brand: PropTypes.string,
  model: PropTypes.string,
  subtype: PropTypes.string,
  nickname: PropTypes.string,
  comment: PropTypes.string,
  productType: PropTypes.string,
  index: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

CSVProductsCard.defaultProps = {
  brand: '',
  model: '',
  subtype: '',
  nickname: '',
  comment: '',
  productType: '',
};

export default CSVProductsCard;
