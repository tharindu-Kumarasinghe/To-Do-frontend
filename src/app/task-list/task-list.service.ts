import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Task} from '../Task.model';
import {HttpClient} from '@angular/common/http';

import { map } from 'rxjs/operators';
import {Router} from '@angular/router';



@Injectable({providedIn: 'root'})
export class TaskListService {

  newtask = new Subject<Task[]>();
  newtdonetask = new Subject<Task[]>();
  onedit = new Subject<any>();


  private upcommingtasks: Task[] = [];
  private successtask: Task[] = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  getupcommingtasks() {
    this.http.get<{ massage: string, tasks: any }>('http://localhost:3000/task-list')
      .pipe(map((taskData) => {
        return taskData.tasks.map(taskx => {
          return {
            task: taskx.task,
            date: taskx.date,
            id: taskx._id,
            creator: taskx.creator
          };
        });
      }))
      .subscribe((TaskData) => {
        console.log(TaskData);
        this.upcommingtasks = TaskData;
        this.newtask.next([...this.upcommingtasks]);
      });
  }


  deleteupcommingtask(taskID: string) {
    this.http.delete('http://localhost:3000/task-list/' + taskID)
      .subscribe(() => {
        const updatedtasks = this.upcommingtasks.filter(task => task.id !== taskID);
        this.upcommingtasks = updatedtasks;
        this.newtask.next([...this.upcommingtasks]);
      });
  }


  setupcommingtasks(task: string, date: string) {

    const addtask: Task = {id: null, task: task, date: date};
    console.log(addtask);
    this.http
      .post<{ massage: string, taskId: string }>('http://localhost:3000/task-list/new', addtask)
      .subscribe((responstdata) => {
        addtask.id = responstdata.taskId;

        console.log(addtask);
        this.upcommingtasks.push(addtask);
        this.newtask.next([...this.upcommingtasks]);
        this.router.navigate(['/']);
      });

  }

  editask(id: string) {
    return {...this.upcommingtasks.find(p => p.id === id)};

  }

  updatetask(id: string, task: string, date: string) {
    const updatetasks: Task = {id: id, task: task, date: date};
    console.log(updatetasks + 'x');
    this.http
      .put('http://localhost:3000/task-list/' + id, updatetasks)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      });
  }

//////////////////////////////////////////////////////////////////////////////////////////
  getsuccesstask() {
    this.http.get<{ massage: string, tasks: any }>('http://localhost:3000/task-list/sucess')
      .pipe(map((taskData) => {
        return taskData.tasks.map(taskx => {
          return {
            task: taskx.task,
            date: taskx.date,
            id: taskx._id,
            creator: taskx.creator
          };
        });
      }))
      .subscribe((TaskData) => {
        this.successtask = TaskData;
        this.newtdonetask.next([...this.successtask]);
      });
  }

  setsucess_task(task: string, date: string, taskID: string) {
    const addtask: Task = {id: null, task: task, date: date};
    this.http
      .post<{ massage: string, taskId: string }>('http://localhost:3000/task-list/sucess', addtask)
      .subscribe((responstdata) => {
        addtask.id = responstdata.taskId;

        this.successtask.push(addtask);
        this.newtdonetask.next(  [...this.successtask]);
      });
    this.deleteupcommingtask(taskID);
  }


  deletesuccestask(successtaskid: string) {
    this.http.delete('http://localhost:3000/task-list/sucess/' + successtaskid)
      .subscribe(() => {
        const updatedtasks = this.successtask.filter(task => task.id !== successtaskid);
        this.successtask = updatedtasks;
        this.newtdonetask.next([...this.successtask]);
      });
  }


  get_taskupdate_upcommingtask(){
    return this.newtask.asObservable();
  }
}



