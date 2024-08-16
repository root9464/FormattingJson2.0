type NFTAttribute = {
  trait_type: string;
  value: string;
}

export type NFT = {
  name: string;
  description: string;
  image: string;
  dna: string;
  edition: number;
  date: number;
  attributes: NFTAttribute[];
  compiler: string;
}


export interface Data {
  name: string;
  description: string;
  image: string;
  dna?: string;
  edition?: number;
  date?: number;
  attributes: NFTAttribute[];
  compiler?: string;
  numberImage: string;
}