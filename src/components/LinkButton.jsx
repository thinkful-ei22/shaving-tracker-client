import React from 'react';
import { withRouter } from 'react-router-dom';

export const LinkButton = (props) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    ...rest
  } = props;

  return (
    <button
      type="button"
      {...rest}
      onClick={(event) => {
        onClick && onClick(event); // eslint-disable-line no-unused-expressions
        history.push(to);
      }}
    />
  );
};

export default withRouter(LinkButton);
