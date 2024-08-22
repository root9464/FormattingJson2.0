import * as fs from 'fs';
import * as path from 'path';
import type { NFT } from '../types/types';

/* 
  Генерирует случайные атрибуты
*/
export function generateRandomAttributes(): { [traitType: string]: string } {
  const attributes: { [traitType: string]: string } = {};

  // Звезды: 11 вариантов (0-10)
  attributes['stars'] = `stars_${Math.floor(Math.random() * 11)}`;

  // Сияния: 6 вариантов (0-5)
  attributes['northern'] = `northern_${Math.floor(Math.random() * 6)}`;

  // Сугробы: 2 варианта (есть или нет)
  attributes['snow'] = Math.random() < 0.5 ? 'snow_0' : 'snow_1';

  // Бриллианты: 10 вариантов (0-9)
  attributes['diamon'] = `diamond_${Math.floor(Math.random() * 10)}`;

  // Точки на графике: 6 вариантов (0-5)
  attributes['arrow'] = `arrow_${Math.floor(Math.random() * 6)}`;

  return attributes;
}

/* 
  Ищет NFT по атрибутам
*/

export function findNFTsByAttributes(directory: string, attributes: { [traitType: string]: string }): [NFT[], string[]] {
  const nftFiles = fs.readdirSync(directory);
  const matchingNFTs: NFT[] = [];
  const fileNames: string[] = [];

  for (const file of nftFiles) {
    const filePath = path.join(directory, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const nft: NFT = JSON.parse(fileContent);

    let matchesAllAttributes = true;
    for (const traitType in attributes) {
      const value = attributes[traitType];
      const attribute = nft.attributes.find((attr) => attr.trait_type === traitType && attr.value === value);
      if (!attribute) {
        matchesAllAttributes = false;
        break;
      }
    }

    if (matchesAllAttributes) {
      matchingNFTs.push(nft);
      fileNames.push(file);
    }
  }

  return [matchingNFTs, fileNames];
}

/*
  Гнерирует рандомные комбинации атрибутов и ищет их в общем колличестве
*/
export function findMissingAttributes(attempts: number, jsonDir: string = '../json') {
  let failedAttributes: { [key: string]: string }[] = [];

  for (let i = 0; i < attempts; i++) {
    const randomAttributes = generateRandomAttributes();
    const [nfts, fileNames] = findNFTsByAttributes(jsonDir, randomAttributes);

    if (nfts.length === 0) {
      failedAttributes.push(randomAttributes);
      console.log(`Атрибуты не найдены, добавлены в список неудачных атрибутов`);
    }
  }

  console.log(`Неудачные атрибуты:`);
  console.log(
    failedAttributes
      .map((attributes, index) => {
        return `#${index + 1} ${JSON.stringify(attributes, null, 2)}`;
      })
      .join('\n'),
  );
}
