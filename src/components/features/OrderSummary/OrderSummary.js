import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderSummary.scss';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import {promoPrice, isPromoNotAvailable} from '../../../utils/promoPrice';

const OrderSummary = ({tripCost, options}) => {

  if(!isPromoNotAvailable()) {
    return (
      <div>
        <h2 className={styles.component}>Price from
          <strong className='price'>{formatPrice(promoPrice(calculateTotal(tripCost, options)))}</strong>
        </h2>
        <h2 className={styles.standard}>Standard price
          <strong>{formatPrice(calculateTotal(tripCost, options))}</strong>
        </h2>
      </div>
    );
  }
  return (
    <div>
      <h2 className={styles.component}>Price
        <strong className='price'>{formatPrice(calculateTotal(tripCost, options))}</strong>
      </h2>
    </div>
  );
};

OrderSummary.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderSummary;
