import React from 'react';
import PropTypes from 'prop-types';
import './styles/collection-card.css';

const CollectionCard = (props) => {
  const {
    brand, model, subtype, nickname, comment,
  } = props;

  return (
    <div>
      <h2>{brand}</h2>
      <h3>{model}</h3>
      <h5>{subtype}</h5>
      <h5>{nickname}</h5>
      <h6>{comment}</h6>
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
