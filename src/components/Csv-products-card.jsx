import React from 'react';
import PropTypes from 'prop-types';

const CSVProductsCard = (props) => {
  const {
    brand, model, subtype, nickname, comment, productType, index, handleChange,
  } = props;
  let productTypeStyle = '';
  let falseOption;
  if (!/(.*razor.*)|(.*blade.*)|(.*brush.*)|(.*lather.*)|(.*aftershave.*)|(.*additionalcare.*)/i.test(productType)) {
    console.log(productType);
    productTypeStyle = 'red';
    falseOption = <option value={null}>{`${productType} not a valid Product Type`}</option>
  } 
  return (
    <div className="collection-item">
      <button type="button">- remove product</button>
      <h3>{`Product ${index+1}`}</h3>
      <p>
        <span className={`collection-item-type ${productTypeStyle}`}>
          Product Type:
        </span>
        <select 
          defaultValue={productTypeStyle ? '': productType} 
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
          Subtype:
        </span>
        <input 
          type="text" 
          value={subtype} 
          name={`subtype ${index}`} 
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
