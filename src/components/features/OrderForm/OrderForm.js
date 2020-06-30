import React from 'react';
import PropTypes from 'prop-types';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing';
import settings from '../../../data/settings';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
import Button from '../../common/Button/Button';
import styles from './OrderForm.scss';

import {Row, Col} from 'react-flexbox-grid';
import OrderOption from '../OrderOption/OrderOption';

const sendOrder = (options, tripCost, tripId, tripName, tripCode) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripId,
    tripCode,
    tripName,

  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = ({tripCost, tripId, tripName, tripCode, options, setOrderOption}) => {

  return (
    <Row>
      {pricing.map(price => {
        return (
          <Col md={4} key={price.id}>
            <OrderOption tripCost={tripCost} {...price} currentValue={options[price.id]} setOrderOption={setOrderOption}/>
          </Col>
        );
      })}

      <Col xs={12} className={styles.total}>
        <OrderSummary tripCost={tripCost} options={options}/>
        <Button disabled={!options.name || !options.contact} onClick={() => sendOrder(options, tripCost, tripId, tripName, tripCode)}>Order now!</Button>
      </Col>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  currentValue: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripId: PropTypes.string,
  tripCode: PropTypes.string,
  tripName: PropTypes.string,
};

export default OrderForm;
