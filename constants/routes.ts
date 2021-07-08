import { Location } from 'vue-router';

export type RouteKey =
  'INDEX'
  | 'NEW'
  | 'EDIT';

export type IRoutes = {
  [key in RouteKey]: Location;
};

export const ROUTES: IRoutes = {
  INDEX: { name: 'index' },
  NEW: { name: 'new' },
  EDIT: { name: 'edit-id' }
};
