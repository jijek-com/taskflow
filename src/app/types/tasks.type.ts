export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'in-progress';
}

export interface BroadcastMessage<T> {
  channel: string;
  data: T;
}

export type TaskOperationType = 'ADD' | 'REMOVE' | 'UPDATE';

export interface TaskOperation {
  type: TaskOperationType;
  task?: Task;
  tasks?: Task[];
}
