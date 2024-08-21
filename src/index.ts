import { findNFTsByAttributes } from './util/utils';

const jsonDir = 'D:/Рабочая область/json';

// Поиск NFT по атрибутам
const attributes = {
  northern: 'northern_0', //Radiance == Less comission
  snow: 'snow_0', //Snowdrifts == DCA
  diamon: 'diamond_0', //Diamonds == Share or revenue
  arrow: 'arrow_5', //Line dots == Refferals
  stars: 'stars_0', //Stars == Priority
};

const jsonObjects = findNFTsByAttributes(jsonDir, attributes);
console.log(jsonObjects, '');
