/* eslint-disable consistent-return */
export const toSentenceCase = (sentence: string) => sentence[0].toUpperCase() + sentence.slice(1);

export const parseNum = (val: string) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? 0 : parsed;
};

export const copyToClipBoard = (text: string) => navigator.clipboard.writeText(text);

export const getMeetingType = (type: string) => {
  switch (type) {
    case 'Open to All':
      return 0;
    case 'Restricted':
      return 1;
    case 'Organization':
      return 2;
    default:
      break;
  }
};
