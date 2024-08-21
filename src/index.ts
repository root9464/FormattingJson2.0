import { swapAttributesInJsonFiles } from './util/utils';

const jsonDir = 'D:/Рабочая область/json'; //D:/Рабочая область/json.copy

// Поиск NFT по атрибутам
// const attributes = {
//   northern: 'northern_5', //Radiance == Less comission
//   snow: 'snow_1', //Snowdrifts == DCA
//   diamon: 'diamond_0', //Diamonds == Share or revenue
//   arrow: 'arrow_5', //Line dots == Refferals
//   stars: 'stars_0', //Stars == Priority
// };

const attributes = {
  'Radiance == Less comission': '5',
  'Snowdrifts == DCA': '1',
  'Line dots == Refferals': '5',
  'Stars == Priority': '0',
  'Diamonds == Share or revenue': '0',
};

swapAttributesInJsonFiles(jsonDir);

// processJsonFiles(jsonDir, removeAttributes, renameAttributes, imageUrl);
