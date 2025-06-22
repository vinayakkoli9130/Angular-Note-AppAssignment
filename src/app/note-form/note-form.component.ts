
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule,MatCardModule],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnChanges {
  @Input() editingNote: any;
  @Output() onSave = new EventEmitter<any>();
  noteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editingNote'] && this.editingNote) {
      this.noteForm.patchValue({
        ...this.editingNote,
        tags: this.editingNote.tags.join(', ')
      });
    }
  }

  onSubmit() {
    if (this.noteForm.valid) {
      const formVal = this.noteForm.value;
      const tags = formVal.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t);
      this.onSave.emit({ ...formVal, tags });
      this.noteForm.reset();
    }
  }
}
