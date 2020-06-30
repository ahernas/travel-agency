import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should render correct url', () =>{
    const expectedUrl = 'abc';
    const component = shallow(<TripSummary id={expectedUrl} image='image.jpg'/> );

    expect(component.find('Link').prop('to')).toEqual('/trip/' + expectedUrl);
  });

  it('should render correct image', () => {
    const expectedSrc = 'image.jpg';
    const expectedAlt = 'alt image';
    const component = shallow(<TripSummary image={expectedSrc} name={expectedAlt} />);

    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render correct props name, cost and days', () => {
    const expectedName = 'name';
    const expectedCost = 'cost';
    const expectedDays = 12;
    const component = shallow(<TripSummary name={expectedName} cost={expectedCost} days={expectedDays} image='image.jpg'/>);

    expect(component.find('h3').text()).toEqual(expectedName);
    expect(component.find('span:first-child').text()).toEqual(expectedDays + ' days');
    expect(component.find('span:last-child').text()).toEqual('from ' + expectedCost);
  });

  it('should throw error without props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render correct span for tags', () => {
    const expectedTags = ['a', 'b', 'c'];
    const component = shallow(<TripSummary tags={expectedTags}  image='image.jpg' />);

    expect(component.find('.tags span').at(0).text()).toEqual(expectedTags[0]);
    expect(component.find('.tags span').at(1).text()).toEqual(expectedTags[1]);
    expect(component.find('.tags span').at(2).text()).toEqual(expectedTags[2]);
  });
});

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

    const component = shallow(<TripSummary image='image.jpg' cost='$139,398.25'/>);
    const renderedPrice = component.find('.price').text();
    expect(renderedPrice).toEqual(`from ${expectedPrice}`);

    global.Date = trueDate;
  });
};

describe('Component TripSummary with mocked Date', () => {
  checkPriceAtTime('11:57:58', `$139,398.25` );
  checkPriceAtTime('12:57:58', `$111,519` );
  checkPriceAtTime('11:57:58', `$139,398.25` );
});
