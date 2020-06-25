const addZero = (numb) => {
  return numb > 9 ? `${numb}` : `0${numb}`;
};

export const formatTime = (param) => {
  if(!param || isNaN(param) || param < 0) {
    return null;
  } else {
    const hh = addZero(Math.floor(param / 3600));
    const mm = addZero(Math.floor((param - (hh * 3600))/ 60));
    const ss = addZero(param - (hh * 3600 + mm * 60));
    return `${hh} : ${mm} : ${ss}`;
  }
};
