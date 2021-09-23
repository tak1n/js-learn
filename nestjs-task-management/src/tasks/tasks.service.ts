import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { randomUUID } from 'node:crypto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: randomUUID(),
      status: TaskStatus.OPEN,
      ...createTaskDto,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): void {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      throw new NotFoundException('Task not found');
    }

    this.tasks.splice(index, 1)[0];
  }
}
