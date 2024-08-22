import * as fs from 'fs';
import * as path from 'path';
import type { NFT } from '../types/types';

/*
  Переименовывает json-файлы в формате "0.json" в "1.json"
*/

export function checkMultiDuplicates(dirA: string, dirB: string): void {
  console.log(`Сравниваем ${dirA} и ${dirB}`);

  const filesA = fs.readdirSync(dirA);
  const filesB = fs.readdirSync(dirB);

  filesA.forEach((fileA) => {
    const filePathA = path.join(dirA, fileA);
    const fileContentA = fs.readFileSync(filePathA, 'utf8');
    const jsonObjectA: NFT = JSON.parse(fileContentA);
    filesB.forEach((fileB) => {
      const filePathB = path.join(dirB, fileB);
      const fileContentB = fs.readFileSync(filePathB, 'utf8');
      const jsonObjectB: NFT = JSON.parse(fileContentB);

      if (areObjectsEqual(jsonObjectA, jsonObjectB)) {
        console.log(`Файл ${fileA} из ${dirA} совпадает с файлом ${fileB} из ${dirB}`);
      }
    });
  });

  console.log('Сравнение завершено!');
}

function areObjectsEqual(objA: NFT, objB: NFT): boolean {
  return objA.attributes.every((attribute, index) => {
    return attribute.trait_type === objB.attributes[index].trait_type && attribute.value === objB.attributes[index].value;
  });
}

/*
  Проверка на дубликаты в json-файлах
*/

export async function checkDuplicates(jsonDir: string): Promise<number> {
  const files = fs.readdirSync(jsonDir);
  const uniqueObjects: NFT[] = [];

  for (const file of files) {
    const filePath = path.join(jsonDir, file);
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const jsonObject: NFT = JSON.parse(fileContent);

    const isDuplicate = uniqueObjects.some((obj) => {
      return jsonObject.attributes.every((attribute) => {
        return obj.attributes.some((attr) => {
          return attr.trait_type === attribute.trait_type && attr.value === attribute.value;
        });
      });
    });

    if (!isDuplicate) {
      uniqueObjects.push(jsonObject);
    } else {
      console.log(`Дубликат найден в файле ${file}`);
    }
  }

  return uniqueObjects.length;
}
