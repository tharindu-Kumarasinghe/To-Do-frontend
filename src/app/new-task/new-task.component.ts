import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskListService} from '../task-list/task-list.service';
import {Subscription} from 'rxjs';
import {Task} from '../Task.model';
import {ActivatedRoute, ParamMap} from '@angular/router';



@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
 edit = [];
  subscription: Subscription;
  taskForm: FormGroup;
  private mode = 'create';
  private taskId: string;
  task: Task;
  isLoading = false;
  constructor(private tasklistservice: TaskListService, public route: ActivatedRoute) { }

  ngOnInit(): void {
     this.taskForm = new FormGroup({
       'task': new FormControl(null, Validators.required),
       'date': new FormControl(null, Validators.required)
    });

      this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('taskId')) {
        this.mode = 'edit';
        this.taskId = paramMap.get('taskId');
        this.isLoading = true;
        this.task = this.tasklistservice.editask(this.taskId);
        this.isLoading = false;
        this.taskForm.controls['task'].setValue(this.task.task);
        this.taskForm.controls['date'].setValue(this.task.date);
      } else {
        this.mode = 'create';
        this.taskId = null;
      }
    });



  }

  onSubmit(){

     const task = this.taskForm.get('task').value;
     const date = this.taskForm.get('date').value;

     this.isLoading = true;
     if (this.mode === 'create'){
       this.tasklistservice.setupcommingtasks(task, date);
     }else {
       this.tasklistservice.updatetask(this.taskId, task, date);
      // console.log(task, date, this.taskId);
     }

     this.taskForm.reset();
  }
}
