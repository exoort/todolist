import { IServices, services } from '~/services';

let $services: IServices;

export function initServices (): void {
  $services = services;
}

export { $services };
