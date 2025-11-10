export interface TenderAttachment {
  id: number;
  tenderId: number;
  fileMimeType: string;
  fileFullPath: string;
  originalFileName: string;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  status: string;
}