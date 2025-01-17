import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/types/tasks.type';

@Component({
    selector: 'app-task-add',
    templateUrl: './task-add.component.html',
    styleUrls: ['./task-add.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TaskAddComponent {
  @Input() public isVisible = false;
  @Input() public nameChannel = '';
  @Output() public onCancel = new EventEmitter<void>();
  @Output() public onSave = new EventEmitter<Task>();

  public taskForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.taskForm = this._fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending', Validators.required]
    });
  }

  public saveTask(): void {
    this.onSave.emit(this.taskForm.value);
    this.taskForm.reset({ status: 'pending' });
    this.onCancel.emit();
  }
}
