import React from 'react';
import PropTypes from 'prop-types';

import './styles/collection-card.css';

const CollectionCard = (props) => {
  const {
    brand, model, subtype, nickname, comment, imageUrl, totalUsage,
  } = props;

  const usedImageUrl = imageUrl ? imageUrl : 'https://i.imgur.com/QvDFh9r.png';

  return (
    <div className="collection-item">
      <h3>{nickname}</h3>
      <div className="image-div-normalizer">
        <img src={usedImageUrl} alt="" />
      </div>
      
      <div className="collection-item-info">
        <span className="collection-item-info--label">Brand:</span> 
        <span className="collection-item-type--value">{brand}</span> 
      
        <span className="collection-item-type--label">Model:</span>
        <span className="collection-item-type--value">{model}</span> 

        <span className="collection-item-type--label">Subtype:</span>
        <span className="collection-item-type--value">{subtype}</span>

        <span className="collection-item-type--label">Comment:</span>
        <span className="collection-item-type--value">{comment}</span> 
        
        <span className="collection-item-type--label">Uses:</span>
        <span className="collection-item-type--value">{totalUsage}</span> 
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
