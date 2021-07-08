import { CacheService, ICacheService } from '~/store/CacheService';

export enum ServiceTokens {
  CacheService= 'CacheService'
}

export interface IServices {
  [ServiceTokens.CacheService]: ICacheService
}

export const services: IServices = {
  [ServiceTokens.CacheService]: new CacheService()
};
