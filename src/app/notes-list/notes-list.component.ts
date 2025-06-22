// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-notes-list',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './notes-list.component.html',
// //   styleUrl: './notes-list.component.css'
// // })
// // export class NotesListComponent {

// // }
// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';

// @Component({
//   selector: 'app-notes-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule, MatButtonModule,MatFormFieldModule, MatCardModule],
//   templateUrl: './notes-list.component.html',
//   styleUrls: ['./notes-list.component.css']
// })
// export class NotesListComponent {
//   @Input() notes: any[] = [];
//   @Output() onDelete = new EventEmitter<number>();
//   @Output() onEdit = new EventEmitter<any>();
//   @Output() onFilter = new EventEmitter<any>();

//   filterTitle = '';
//   filterTags = '';

//   applyFilter() {
//     const tags = this.filterTags
//       .split(',')
//       .map((t) => t.trim())
//       .filter((t) => t);
//     this.onFilter.emit({ title: this.filterTitle, tags });
//   }

//   clearFilter() {
//     this.filterTitle = '';
//     this.filterTags = '';
//     this.onFilter.emit({ title: '', tags: [] });
//   }
// }

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule,  MatInputModule,FormsModule, MatButtonModule, MatFormFieldModule, MatCardModule],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent {
  @Input() notes: any[] = [];
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onFilter = new EventEmitter<any>();

  filterTitle = '';
  filterTags = '';

  applyFilter() {
    const tags = this.filterTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t);
    this.onFilter.emit({ title: this.filterTitle, tags });
  }

  clearFilter() {
    this.filterTitle = '';
    this.filterTags = '';
    this.onFilter.emit({ title: '', tags: [] });
  }
}
