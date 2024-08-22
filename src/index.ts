// import { imageUrl, removeAttributes, renameAttributes } from './config/config';

import { findNFTsByAttributes } from './util/utils';

const jsonDir1 = 'D:/Рабочая область/json'; //D:/Рабочая область/json.copy
const jsonDir = '../json';
// Поиск NFT по атрибутам
// const attributes = {
//   northern: 'northern_0', //Radiance == Less comission
//   snow: 'snow_0', //Snowdrifts == DCA
//   diamon: 'diamond_0', //Diamonds == Share or revenue
//   arrow: 'arrow_0', //Line dots == Refferals
//   stars: 'stars_1', //Stars == Priority
// };

const attributes = {
  'Radiance == Less comission': '0',
  'Snowdrifts == DCA': '1',
  'Line dots == Refferals': '0',
  'Stars == Priority': '1',
  'Diamonds == Share or revenue': '0',
};

// processJsonFiles(jsonDir1, removeAttributes, renameAttributes, imageUrl);

const nft = findNFTsByAttributes(jsonDir, attributes);
console.log(nft);
