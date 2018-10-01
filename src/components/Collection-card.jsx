import React from 'react';
import PropTypes from 'prop-types';

const CollectionCard = (props) => {
  const {
    brand, model, subtype, nickname, comment,
  } = props;

  return (
    <div className="collection-item">
      <h3>{brand}</h3>
      <p><span className="collection-item-type">Model:</span> {model}</p>
      <p><span className="collection-item-type">Subtype:</span> {subtype}</p>
      <p><span className="collection-item-type">Nickname:</span> {nickname}</p>
      <p><span className="collection-item-type">Comment:</span> {comment}</p>
    </div>
  );
};

CollectionCard.propTypes = {
  brand: PropTypes.string,
  model: PropTypes.string,
  subtype: PropTypes.string,
  nickname: PropTypes.string,
  comment: PropTypes.string,
};

CollectionCard.defaultProps = {
  brand: '',
  model: '',
  subtype: '',
  nickname: '',
  comment: '',
};

export default CollectionCard;
