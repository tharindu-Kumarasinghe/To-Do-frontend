import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskListService} from '../task-list.service';
import {Subscription} from 'rxjs';
import {Task} from '../../Task.model';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-upcoomming-task',
  templateUrl: './upcoomming-task.component.html',
  styleUrls: ['./upcoomming-task.component.css']
})
export class UpcoommingTaskComponent implements OnInit, OnDestroy {
  upcomminglist: Task[] = [];
  subscription: Subscription;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private authStatusSub: Subscription;

  constructor(private tasklistservice: TaskListService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.tasklistservice.getupcommingtasks();
    this.subscription = this.tasklistservice.get_taskupdate_upcommingtask().subscribe(
      (newtaskary: Task[]) => {
        this.isLoading = false;
        this.upcomminglist = newtaskary;
      });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onsuccessbtn(index: number, id: string){
   // this.tasklistservice.succesupcommingTask(index);
    const task = this.upcomminglist[index].task;
    const date = this.upcomminglist[index].date;
    this.tasklistservice.setsucess_task(task, date, id);
  }

  ondeletebtn(taskID: string){
    this.tasklistservice.deleteupcommingtask(taskID);
    console.log(taskID);
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
