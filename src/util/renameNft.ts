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

const traitTypeMappings: { [key: string]: string } = {
  Snowdrifts: 'snow',
  Radiance: 'northern',
  Linedots: 'arrow',
  Diamonds: 'diamon',
  Stars: 'stars',
  bg: 'bacground',
  spruce: 'spruce', // оставляем как есть, если нет соответствия
};

function transformJsonData(jsonData: NFT): NFT {
  return {
    ...jsonData,
    attributes: jsonData.attributes.map((attribute) => {
      const newTraitType = traitTypeMappings[attribute.trait_type];
      return {
        ...attribute,
        trait_type: newTraitType || attribute.trait_type,
      };
    }),
  };
}
function formatArrowValue(jsonData: NFT): NFT {
  return {
    ...jsonData,
    attributes: jsonData.attributes.map((attribute) => {
      if (attribute.trait_type === 'arrow') {
        const value = attribute.value;
        const match = value.match(/^arrow_(\d+)$/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num === 0) {
            return {
              ...attribute,
              value: `arrow_0`,
            };
          } else if (num < 10) {
            return {
              ...attribute,
              value: `arrow_${num}`,
            };
          } else {
            const formattedNum = (num + 1).toString();
            return {
              ...attribute,
              value: `arrow_${formattedNum}`,
            };
          }
        }
      }
      return attribute;
    }),
  };
}

export function formatingLowerCaseJsons(jsonDir: string) {
  const files = fs.readdirSync(jsonDir);

  files.forEach((file) => {
    const filePath = path.join(jsonDir, file);
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8')) as NFT;
    const formattedJsonData = formatArrowValue(jsonData);
    fs.writeFileSync(filePath, JSON.stringify(formattedJsonData, null, 2));
  });
}
