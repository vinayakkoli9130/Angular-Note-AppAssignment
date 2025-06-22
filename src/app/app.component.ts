
import { Component } from '@angular/core';//  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteFormComponent } from './note-form/note-form.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    NoteFormComponent,
    NotesListComponent
  ],
  template: `
    <div class="container">
      <mat-card class="note-form-card">
        <app-note-form
          [editingNote]="editingNote"
          (onSave)="handleSave($event)"
        ></app-note-form>
      </mat-card>
      <app-notes-list
        [notes]="notes"
        (onDelete)="handleDelete($event)"
        (onEdit)="handleEdit($event)"
        (onFilter)="handleFilter($event)"
      ></app-notes-list>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  notes: any[] = [];
  editingNote: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.notes = JSON.parse(localStorage.getItem('notes') || '[]');
    }
  }

  saveNotesToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    }
  }

  handleSave(note: any) {
    if (note.id != null) {
      const index = this.notes.findIndex((n) => n.id === note.id);
      this.notes[index] = note;
    } else {
      note.id = Date.now();
      this.notes.push(note);
    }
    this.saveNotesToStorage();
    this.editingNote = null;
  }

  handleDelete(id: number) {
    this.notes = this.notes.filter((n) => n.id !== id);
    this.saveNotesToStorage();
  }

  handleEdit(note: any) {
    this.editingNote = { ...note };
  }

  handleFilter(filters: any) {
    const allNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const { title, tags } = filters;
    this.notes = allNotes.filter((note: any) => {
      const matchTitle = title
        ? note.title.toLowerCase().includes(title.toLowerCase())
        : true;
      const matchTags = tags.length
        ? tags.some((tag: string) => note.tags.includes(tag))
        : true;
      return matchTitle && matchTags;
    });
  }
}
