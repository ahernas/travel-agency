import React from 'react';
import {shallow} from 'enzyme';
import OrderSummary from './OrderSummary';

const trueDate = Date;
const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length){
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now(){
    return (new Date(customDate)).getTime();
  }
};

const checkPriceAtTime = (time, expectedPrice) => {
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const component = shallow(<OrderSummary tripCost='$139,398.25' options={{
      'car-rental': '',
      accommodation: '',
      features: [],
      adults: 1,
      children: 0,
      'start-date': '',
      name: '',
      contact: '',
    }}/>);
    const renderedPrice = component.find('.price').text();
    expect(renderedPrice).toEqual(`${expectedPrice}`);

    global.Date = trueDate;
  });
};

describe('Component TripSummary with mocked Date', () => {
  checkPriceAtTime('11:57:58', `$139,399` );
  checkPriceAtTime('12:57:58', `$111,519` );
  checkPriceAtTime('11:57:58', `$139,399` );
});
