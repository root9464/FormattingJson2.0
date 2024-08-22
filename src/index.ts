// import { imageUrl, removeAttributes, renameAttributes } from './config/config';

import { generateRandomAttributes } from './util/findNft';
import { findNFTsByAttributes } from './util/utils';

// import { processJsonFiles } from './util/utils';

const jsonDir = '../json';
// Поиск NFT по атрибутам
// const attributes = {
//   northern: 'northern_0', //Radiance == Less comission
//   snow: 'snow_0', //Snowdrifts == DCA
//   diamon: 'diamond_0', //Diamonds == Share or revenue
//   arrow: 'arrow_1', //Line dots == Refferals
//   stars: 'stars_1', //Stars == Priority
// };

// const attributes = {
//   'Radiance == Less comission': '5',
//   'Snowdrifts == DCA': '1',
//   'Line dots == Refferals': '5',
//   'Stars == Priority': '0',
//   'Diamonds == Share or revenue': '0',
// };

// processJsonFiles(jsonDir, removeAttributes, renameAttributes, imageUrl);

let failedAttributes: { [key: string]: string }[] = [];

function main() {
  const randomAttributes = generateRandomAttributes();
  const [nfts, fileNames] = findNFTsByAttributes(jsonDir, randomAttributes);

  // console.log(`Поиск по атрибутам: ${JSON.stringify(randomAttributes)}`);
  // console.log(`Найдено ${nfts.length} NFT в ${fileNames.length} файлах:`);
  // fileNames.forEach((fileName) => {
  //   console.log(`Номер nft -- ${fileName}`);
  // });

  if (nfts.length === 0) {
    failedAttributes.push(randomAttributes);
    console.log(`Атрибуты не найдены, добавлены в список неудачных атрибутов`);
  }

  // console.log(`------------------------`);
}

for (let i = 0; i < 1000; i++) {
  main();
}

console.log(`Неудачные атрибуты:`);
console.log(
  failedAttributes
    .map((attributes, index) => {
      return `#${index + 1} ${JSON.stringify(attributes, null, 2)}`;
    })
    .join('\n'),
);
