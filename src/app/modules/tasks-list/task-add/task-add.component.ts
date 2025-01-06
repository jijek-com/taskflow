import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from "../../../types/tasks.type";

@Component({
    selector: 'app-task-add',
    templateUrl: './task-add.component.html',
    styleUrls: ['./task-add.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TaskAddComponent {
  @Input() public isVisible = false;
  @Output() public onCancel = new EventEmitter<void>();
  @Output() public onSave = new EventEmitter<Task>();

  public taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
      status: ['pending', Validators.required]
    });
  }

  public saveTask(): void {
    if (this.taskForm.valid) {
      this.onSave.emit(this.taskForm.value);
      this.taskForm.reset({ status: 'pending' });
    }
  }
}
