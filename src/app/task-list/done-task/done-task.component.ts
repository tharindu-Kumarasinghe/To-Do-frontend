import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskListService} from '../task-list.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.css']
})
export class DoneTaskComponent implements OnInit, OnDestroy {
  donetask = [];
  subscription: Subscription;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private authStatusSub: Subscription;

  constructor(private tasklistservice: TaskListService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.tasklistservice.getsuccesstask();
    this.subscription = this.tasklistservice.newtdonetask.subscribe(
      (newtaskary) => {
        this.isLoading = false;
        this.donetask = newtaskary;
      });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }


  ondeletebtn(id: string){
    this.tasklistservice.deletesuccestask(id);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
