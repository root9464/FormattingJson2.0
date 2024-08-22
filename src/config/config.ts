export const removeAttributes = ['Background', 'Spruce'];
export const renameAttributes: Record<string, string> = {
  stars: 'Stars == Priority',
  northern: 'Radiance == Less comission',
  snow: 'Snowdrifts == DCA',
  diamon: 'Diamonds == Share or revenue',
  arrow: 'Line dots == Refferals',
};

export const imageUrl: string = `https://gateway.pinata.cloud`;

export const outDir: string = './out';

export const outputFile: string = `${outDir}/output.txt`;

export const attributesF = {
  'Radiance == Less comission': '5',
  'Snowdrifts == DCA': '1',
  'Line dots == Refferals': '5',
  'Stars == Priority': '0',
  'Diamonds == Share or revenue': '0',
};

export const attributesNF = {
  northern: 'northern_0', //Radiance == Less comission
  snow: 'snow_0', //Snowdrifts == DCA
  diamon: 'diamond_0', //Diamonds == Share or revenue
  arrow: 'arrow_1', //Line dots == Refferals
  stars: 'stars_1', //Stars == Priority
};
