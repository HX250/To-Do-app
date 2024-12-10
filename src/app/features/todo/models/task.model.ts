export interface task {
  id?: number;
  title: string;
  description: string;
  state: boolean;
  date: string;
}
export class Task {
  static clone(task: Task): Task {
    return new Task(
      task.id,
      task.title,
      task.description,
      task.state,
      task.date,
    );
  }
  constructor(
    public id: number = 1,
    public title: string = '',
    public description: string = '',
    public state: boolean = false,
    public date: string = '',
  ) {}
}
