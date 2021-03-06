import React from 'react';
import PropTypes from 'prop-types';

const OrderOptionText = ({setOptionValue, currentValue}) => {

  return (
    <div >
      <input type='text'
        value={currentValue}
        onChange={event => setOptionValue(event.currentTarget.value)}
      />
    </div>
  );
};

OrderOptionText.propTypes = {
  currentValue: PropTypes.any,
  setOptionValue: PropTypes.func,
};

export default OrderOptionText;
