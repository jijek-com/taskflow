import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Task } from "../../../types/tasks.type";
import { Statuses_Translations } from "../../tasks-list/tasks-list-translations";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Input() task: Task | null = null;
  @Output() public onCancel = new EventEmitter<void>();
  @Output() public onSave = new EventEmitter<Task>();

  public statuses = ['completed', 'in-progress', 'pending'];
  public statusesTranslations = Statuses_Translations;

  public form!: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required]
    });
  }

  public ngOnChanges(): void {
    if (this.task) {
      this.form.patchValue(this.task);
    }
  }

  public saveTask(): void {
    if (this.form.valid && this.task) {
      const updatedTask: Task = { ...this.task, ...this.form.value };

      this.onSave.emit(updatedTask);
      this.onCancel.emit();
    }
  }
}
