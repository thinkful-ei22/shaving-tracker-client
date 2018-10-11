import React from 'react';
import PropTypes from 'prop-types';

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

  if (!/(.*razor.*)|(.*blade.*)|(.*brush.*)|(.*lather.*)|(.*aftershave.*)|(.*additionalcare.*)/i.test(productType)) {
    productTypeStyle = 'red';
    subtypeError = true;
    falseOption = <option value={null}>{`${productType} not a valid Product Type`}</option>
  } 
  
  return (
    <div className="collection-item">
      <button onClick={handleRemove} type="button" name={`remove-item ${index}`}>- remove product</button>
      <h3>{`Product ${index+1}`}</h3>
      <p>
        <span className={`collection-item-type ${productTypeStyle}`}>
          Product Type:
          <select 
            defaultValue={productTypeStyle ? '': productType.toLowerCase()} 
            name={`productType ${index}`}
            onChange={handleChange}
          >
            {falseOption}
            <option value="razor">Razor</option>
            <option value="blade">Blade</option>
            <option value="brush">Brush</option>
            <option value="lather">Lather</option>
            <option value="aftershave">Aftershave</option>
            <option value="additionalcare">Additional Care</option>
          </select>
        </span>
      </p>
      <p>
        <span className={`collection-item-type ${subtypeError ? 'red' : ''}`}>
          Subtype:
          <select 
            defaultValue={subtype.toLowerCase() || 'none'} 
            name={`subtype ${index}`}
            onChange={handleChange}
          >
            {typeList}
          </select>
        </span>
        
      </p>
      <p>
        <span className="collection-item-type">
          Brand:
        </span>
        <input 
          type="text" 
          value={brand} 
          name={`brand ${index}`} 
          onChange={handleChange}
        />
      </p>
      <p>
        <span className="collection-item-type">
          Model:
        </span>
        <input 
          type="text" 
          value={model} 
          name={`model ${index}`} 
          onChange={handleChange}
        />
      </p>
      <p>
        <span className="collection-item-type">
          Nickname:
        </span>
        <input 
          type="text" 
          value={nickname} 
          name={`nickname ${index}`} 
          onChange={handleChange}
        />
        </p>
      <p>
        <span className="collection-item-type">
          Comment:
        </span>
        <input 
          type="text" 
          value={comment} 
          name={`comment ${index}`} 
          onChange={handleChange}
        />
      </p>
    </div>
  );
};

CSVProductsCard.propTypes = {
  brand: PropTypes.string,
  model: PropTypes.string,
  subtype: PropTypes.string,
  nickname: PropTypes.string,
  comment: PropTypes.string,
};

CSVProductsCard.defaultProps = {
  brand: '',
  model: '',
  subtype: '',
  nickname: '',
  comment: '',
};

export default CSVProductsCard;
