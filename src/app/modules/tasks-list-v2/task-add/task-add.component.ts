import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksListV2Service } from '../tasks-list-v2-service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskAddComponent {
  @Input() public isVisible = false;
  @Output() public onCancel = new EventEmitter<void>();

  public taskForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _taskStateService: TasksListV2Service
  ) {
    this.taskForm = this._fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending', Validators.required]
    });
  }

  public saveTask(): void {
    if (this.taskForm.valid) {
      this._taskStateService.addTask(this.taskForm.value);
      this.taskForm.reset({ status: 'pending' });
      this.onCancel.emit();
    }
  }
}
