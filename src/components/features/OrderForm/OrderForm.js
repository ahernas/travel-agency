import React from 'react';
import PropTypes from 'prop-types';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing';

import {Row, Col} from 'react-flexbox-grid';
import OrderOption from '../OrderOption/OrderOption';

const OrderForm = ({tripCost, options, setOrderOption}) => {

  return (
    <Row>
      {pricing.map(price => {
        return (
          <Col md={4} key={price.id}>
            <OrderOption tripCost={tripCost} {...price} currentValue={options[price.id]} setOrderOption={setOrderOption}/>
          </Col>
        );
      })}
      <Col xs={12}>
        <OrderSummary tripCost={tripCost} options={options}/>
      </Col>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  currentValue: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
