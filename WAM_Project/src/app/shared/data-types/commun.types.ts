
export interface Doc {
  totalDocs: number;
  docs: Plugins[];
}

export interface Plugins {
  id:number;
  name: string;
  dirName: string;
  thumbnail: string;
  description: string;
}

export interface Plugin {
  id:number;
  name: string;
  dirName: string;
  thumbnail: string;
  description: string;
}


