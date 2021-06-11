import User from './User';

export default interface UserQuota {
  uuid: string;
  quota: number;
  yersterdayUsedSpace: number,
  usedSpace: number,
  realTimeUsedSpace: number,
  maintenance: false,
  creationDate: number,
  modificationDate: number,
  maxFileSize: number,
  account: Partial<User>
}