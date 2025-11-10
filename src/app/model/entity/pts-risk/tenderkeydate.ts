import {KeyDateType} from './KeyDateType';

export interface TenderKeyDate {
  id: number;
  tenderId: number;
  type: KeyDateType;
  keyDate: string;
  remark: string;
}