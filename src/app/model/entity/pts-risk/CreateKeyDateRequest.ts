import {KeyDateType} from './KeyDateType';

export interface CreateKeyDateRequest {
  id: number; 
  type: KeyDateType;
  keyDate: string;
  remark: string;
}