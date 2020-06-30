import React from 'react';
import {shallow} from 'enzyme';
import Trip from './Trip';

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

    const component = shallow(<Trip
      name="Marvelous travel in fantastic Timor-Leste"
      country={{
        'name': 'Timor-Leste',
        'code': 'TLS',
        'flag': 'https://restcountries.eu/data/afg.svg',
        'currencies': [{}],
      }}
      image="image.jpg"
      source="source"
      cost="$139,398.25"
    />);
    const renderedPrice = component.find('.price').html();
    expect(renderedPrice).toEqual(expect.stringContaining(`<strong>Price:</strong> from ${expectedPrice}`));

    global.Date = trueDate;
  });
};

describe('Component TripSummary with mocked Date', () => {
  checkPriceAtTime('11:57:58', `$139,398.25` );
  checkPriceAtTime('12:57:58', `$111,519` );
  checkPriceAtTime('11:57:58', `$139,398.25` );
});

