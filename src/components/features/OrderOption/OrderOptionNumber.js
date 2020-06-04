import React from 'react';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';
import PropTypes from 'prop-types';
import {parseOptionPrice} from '../../../utils/parseOptionPrice';

const OrderOptionNumber = ({limits, currentValue, setOptionValue, price, tripCost}) => {
  const total = parseOptionPrice(price).value * currentValue * parseOptionPrice(tripCost).value;
  return (
    <div className={styles.number}>
      <input type='number'
        className={styles.inputSmall}
        value={currentValue}
        min={limits.min}
        max={limits.max}
        onChange={event => setOptionValue(event.currentTarget.value)}/>

    ({formatPrice(total)})
    </div>
  );
};

OrderOptionNumber.propTypes = {
  value: PropTypes.array,
  currentValue: PropTypes.any,
  tripCost: PropTypes.any,
  price: PropTypes.any,
  limits: PropTypes.object,
  setOptionValue: PropTypes.func,
};

export default OrderOptionNumber;
