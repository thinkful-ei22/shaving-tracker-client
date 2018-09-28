import React from 'react';
import './styles/collection-card.css';

const CollectionCard = (props) => {
  console.log(props);
  return (
    <div>
      <h2>{props.brand}</h2>
      <h3>{props.model}</h3>
      <h5>{props.subtype}</h5>
      <h5>{props.nickname}</h5>
      <h6>{props.comment}</h6>
    </div>
  )
}

export default CollectionCard;