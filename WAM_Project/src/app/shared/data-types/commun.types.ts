import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

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

export interface PluginItem {
  id:number;
  name: string;
  dirName: string;
  thumbnail: string;
  description: string;
}


export interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<PluginItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<PluginItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}
