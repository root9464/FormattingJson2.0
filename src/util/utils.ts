import * as fs from 'fs';
import * as path from 'path';
import { outDir } from '../config/config';
import type { Data, NFT } from '../types/types';

/*
  Обрабатывает файлы json в папке jsonDir
  Считает количество файлов с атрибутом "arrow"
  Выводит количество файлов в консоль
  Записывает имена файлов в output.txt
*/

export function countFilesWithArrowAttribute(jsonDir: string): Promise<number> {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir);
    }

    fs.readdir(jsonDir, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      let count = 0;

      files.forEach((file) => {
        const filePath = path.join(jsonDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const jsonObject: NFT = JSON.parse(fileContent);

        const hasArrowAttribute = jsonObject.attributes.some((attribute) => attribute.trait_type === 'arrow' && attribute.value === 'arrow_0');

        if (hasArrowAttribute) {
          count++;
          // fs.unlinkSync(filePath);
          fs.appendFileSync(`${outDir}/output.txt`, `${file}\n`);
          console.log(`Атрибут в файле ${file}`);
        }
      });

      resolve(count);
    });
  });
}

/*
  Обрабатывает файлы json в папке jsonDir
  Удаляет атрибуты "Background" и "Spruce"
  Добавляет numberImage в каждый файл
*/

export function processJsonFiles(jsonDir: string, removeAttributes: string[], renameAttributes: Record<string, string>, imageUrl: string): void {
  fs.readdirSync(jsonDir)
    .filter((filename) => filename.endsWith('.json'))
    .forEach((filename) => {
      const filePath = path.join(jsonDir, filename);
      const data: Data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      data.attributes = data.attributes
        .filter(({ trait_type }) => !removeAttributes.includes(trait_type) && trait_type !== 'bacground' && trait_type !== 'spruce')
        .map((attr) => ({
          trait_type: renameAttributes[attr.trait_type] || attr.trait_type,
          value: attr.value.replace(/^.*_/, ''),
        }));

      data.image = `${imageUrl}/${path.basename(filename, '.json')}.png`;
      delete data.dna;
      delete data.edition;
      delete data.date;
      delete data.compiler;
      data.numberImage = path.basename(filename, '.json');

      fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    });

  console.log('Обработка файлов завершена!');
}

export function updateArrowAttribute(jsonDir: string) {
  fs.readdir(jsonDir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(jsonDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const jsonObject: NFT = JSON.parse(fileContent);

      const arrowAttribute = jsonObject.attributes.find((attribute) => attribute.trait_type === 'arrow');

      if (arrowAttribute) {
        const currentValue = arrowAttribute.value;
        const newValue = `arrow_${parseInt(currentValue.split('_')[1], 10) - 1}`;
        arrowAttribute.value = newValue;
        console.log(`Updated arrow attribute in file ${file} to ${newValue}`);
      }

      const updatedFileContent = JSON.stringify(jsonObject, null, 2);
      fs.writeFileSync(filePath, updatedFileContent);
    });
  });
}

/* 
  меняет атрибуты местами
*/

export function swapAttributesInJsonFiles(jsonDir: string) {
  fs.readdir(jsonDir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(jsonDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const jsonObject: NFT = JSON.parse(fileContent);

      const attributes = jsonObject.attributes;
      const diamondsIndex = attributes.findIndex((attr) => attr.trait_type === 'Line dots == Refferals'); // что меняет
      const lineDotsIndex = attributes.findIndex((attr) => attr.trait_type === 'Diamonds == Share or revenue'); // с чем меняет

      if (diamondsIndex !== -1 && lineDotsIndex !== -1) {
        [attributes[diamondsIndex], attributes[lineDotsIndex]] = [attributes[lineDotsIndex], attributes[diamondsIndex]];
      }

      const updatedFileContent = JSON.stringify(jsonObject, null, 2);
      fs.writeFileSync(filePath, updatedFileContent);
      console.log(`Изменены атрибуты в файле ${file}`);
    });
  });
}
