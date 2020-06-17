import React from 'react';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';
import PropTypes from 'prop-types';
import Icon from '../../common/Icon/Icon';

const OrderOptionIcons = ({values, required, setOptionValue, currentValue}) => (

  <div>
    {!required ? (
      <div  onClick={() => setOptionValue('')} className={`${styles.icon} ${currentValue == '' ? styles.iconActive: ''}`}>
        <Icon name={'times-circle'}/>
        None
      </div>
    ) : null}
    {values.map(value => (
      <div className={`${styles.icon} ${currentValue == value.id && currentValue !== '' ? styles.iconActive : ''}`}
        key={value.id}
        onClick={() => setOptionValue(value.id)}
      >
        <Icon name={value.icon}/>
        {value.name} ({formatPrice(value.price)})
      </div>
    ))}

  </div>
);

OrderOptionIcons.propTypes = {
  values: PropTypes.array,
  currentValue: PropTypes.any,
  required: PropTypes.bool,
  setOptionValue: PropTypes.func,
};

export default OrderOptionIcons;
