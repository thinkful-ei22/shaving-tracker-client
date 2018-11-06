import React from 'react';
import PropTypes from 'prop-types';

import './styles/collection-card.css';
import DEFAULT_IMAGE from '../images/No_image_available.svg';

const CollectionCard = (props) => {
  let {
    brand, model, subtype, nickname, comment, imageUrl, totalUsage,
  } = props;

  const usedImageUrl = imageUrl ? imageUrl : DEFAULT_IMAGE;

  subtype = subtype ? subtype : 'n/a';
  comment = comment ? comment : 'n/a';

  return (
    <div className="collection-item">
      <h3>{nickname}</h3>
      <div className="image-div-normalizer">
        <img src={usedImageUrl} alt="" />
      </div>
      
      <div className="collection-item-info">
        <span className="collection-item-info--label">Brand:</span> 
        <span className="collection-item-info--value">{brand}</span> 
      
        <span className="collection-item-info--label">Model:</span>
        <span className="collection-item-info--value">{model}</span> 

        <span className="collection-item-info--label">Subtype:</span>
        <span className="collection-item-info--value">{subtype}</span>

        <span className="collection-item-info--label">Comment:</span>
        <span className="collection-item-info--value">{comment}</span> 
        
        <span className="collection-item-info--label">Uses:</span>
        <span className="collection-item-info--value">{totalUsage}</span> 
      </div>
    </div>
  );
};

CollectionCard.propTypes = {
  brand: PropTypes.string,
  model: PropTypes.string,
  subtype: PropTypes.string,
  nickname: PropTypes.string,
  comment: PropTypes.string,
  imageUrl: PropTypes.string,
};

CollectionCard.defaultProps = {
  brand: '',
  model: '',
  subtype: '',
  nickname: '',
  comment: '',
  imageUrl: '',
};

export default CollectionCard;
