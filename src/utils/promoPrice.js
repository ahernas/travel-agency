import {getCountdownTime} from './getCountdownTime';

export const promoPrice = (amount) => {
  const percent = 0.2;
  return amount - (amount * percent);
};

export function isPromoNotAvailable() {
  return getCountdownTime() <= 82800;
}
