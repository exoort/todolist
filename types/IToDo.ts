import { IToDoContent } from '~/types/IToDoContent';

export interface IToDo {
  id: number;
  title: string;
  content: IToDoContent[];
  done: boolean;
}
