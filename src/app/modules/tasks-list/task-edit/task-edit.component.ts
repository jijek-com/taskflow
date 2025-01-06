import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Statuses_Translations } from '../tasks-list-translations';
import { Task } from 'src/app/types/tasks.type';

@Component({
    selector: 'app-task-edit',
    templateUrl: './task-edit.component.html',
    styleUrls: ['./task-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TaskEditComponent implements OnChanges {
  @Input() public isVisible = false;
  @Input() public task: Task | null = null;
  @Output() public onSave = new EventEmitter<Task>();
  @Output() public onCancel = new EventEmitter<void>();

  public statuses = ['completed', 'in-progress', 'pending'];
  public statusesTranslations = Statuses_Translations;

  public form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required]
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.form = this.fb.group({
        title: [this.task.title, Validators.required],
        description: [this.task.description || ''],
        status: [this.task.status, Validators.required]
      });
    }
  }

  public saveTask(): void {
    if (this.task && this.form.valid) {
      this.onSave.emit({ ...this.task, ...this.form.value });
    }
  }
}
