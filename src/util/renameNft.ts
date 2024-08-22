import * as fs from 'fs';
import * as path from 'path';

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
