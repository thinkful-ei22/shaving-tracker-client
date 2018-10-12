import React from 'react';
import PropTypes from 'prop-types';

const CollectionCard = (props) => {
  const {
    brand, model, subtype, nickname, comment, imageUrl, totalUsage,
  } = props;

  const usedImageUrl = imageUrl ? imageUrl : 'https://i.imgur.com/QvDFh9r.png';

  return (
    <div className="collection-item">
      <div className="image-div-normalizer">
        <img src={usedImageUrl} alt="" />
      </div>
      <h3>{nickname}</h3>
      <p>
        <span className="collection-item-type">Brand:</span> {brand}
      </p>
      <p>
        <span className="collection-item-type">Model:</span> {model}
      </p>
      <p>
        <span className="collection-item-type">Subtype:</span> {subtype}
      </p>
      <p>
        <span className="collection-item-type">Comment:</span> {comment}
      </p>
      <p>
        <span className="collection-item-type">Uses:</span> {totalUsage}
      </p>
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
