import { checkDuplicates } from './util/checkNft';

const jsonDir = '../jsons';

const jsonDirA = 'D:/Рабочая область/мусарня/jsons/json001';

const jsonDirU = 'D:/Рабочая область/мусарня/jsons';

checkDuplicates(jsonDirU).then((count) => {
  console.log(`Количество оригинальных NFT: ${count}`);
});
