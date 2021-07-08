export enum TodoType {
  TextTodoType = 'text',
  DrawTodoType = 'draw'
}

export interface IBaseTodoContent {
  type: TodoType;
  id: number;
}

export interface ITextTodoContent extends IBaseTodoContent {
  type: TodoType.TextTodoType;
  content: string;
}

export interface IDrawTodoContent extends IBaseTodoContent {
  type: TodoType.DrawTodoType;
  content: string;
}

export type IToDoContent = ITextTodoContent | IDrawTodoContent;
