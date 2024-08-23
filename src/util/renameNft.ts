import * as fs from 'fs';
import * as path from 'path';
import type { NFT } from '../types/types';

export async function renameJsonFiles(jsonDir: string) {
  const files = await fs.promises.readdir(jsonDir);

  for (const file of files) {
    const filePath = path.join(jsonDir, file);
    const fileName = file.replace('.json', '');
    const newFileName = `${parseInt(fileName) + 7920}.json`;

    await fs.promises.rename(filePath, path.join(jsonDir, newFileName));
  }
}

export async function renameImageFiles(imgDir: string) {
  const files = await fs.promises.readdir(imgDir);

  for (const file of files) {
    const filePath = path.join(imgDir, file);
    const fileName = file.replace('.png', '');
    const newFileName = `${parseInt(fileName) + 7920}.png`;

    await fs.promises.rename(filePath, path.join(imgDir, newFileName));
  }
}

function transformNFT(nft: NFT): NFT {
  const transformedAttributes: NFT['attributes'] = nft.attributes.map((attribute) => {
    switch (attribute.trait_type) {
      case 'bg':
        return { trait_type: 'bacground', value: attribute.value };
      case 'Radiance':
        return { trait_type: 'northern', value: attribute.value.replace('_02', '_5') };
      case 'Snowdrifts':
        return { trait_type: 'snow', value: attribute.value.replace('_01', '_0') };
      case 'Linedots':
        return { trait_type: 'arrow', value: transformArrowValue(attribute.value) };
      case 'Diamonds':
        return { trait_type: 'diamon', value: attribute.value.replace('_09', '_1') };
      case 'Stars':
        return { trait_type: 'stars', value: attribute.value.replace('_08', '_9') };
      default:
        return attribute;
    }
  });

  return { ...nft, attributes: transformedAttributes };
}

function transformArrowValue(value: string): string {
  const match = value.match(/^arrow_(\d+)$/);
  if (match) {
    const num = parseInt(match[1], 10);
    return `arrow_${num > 0 ? num - 1 : 0}`;
  }
  return value;
}

export function transformAllNFTsInFolder(folderPath: string): void {
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const nft: NFT = JSON.parse(fileContent);

    const transformedNFT = transformNFT(nft);

    const transformedFileContent = JSON.stringify(transformedNFT, null, 2);

    fs.writeFileSync(filePath, transformedFileContent);
  });
}
