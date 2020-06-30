import React from 'react';
import styles from './HappyHourAd.scss';
import PropTypes from 'prop-types';
import {formatTime} from '../../../utils/formatTime';
import {getCountdownTime} from '../../../utils/getCountdownTime';
import {isPromoNotAvailable} from '../../../utils/promoPrice';

class HappyHourAd extends React.Component {

  constructor() {
    super();
    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  render() {
    const {title, promoDescription} = this.props;
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        {isPromoNotAvailable() ?
          <div className={styles.promoDescription}>{formatTime(getCountdownTime())}</div>
          : <div className={styles.promoDescription}>{promoDescription}</div>}
      </div>
    );
  }
}

HappyHourAd.propTypes = {
  title: PropTypes.string,
  promoDescription: PropTypes.string,
};

export default HappyHourAd;
