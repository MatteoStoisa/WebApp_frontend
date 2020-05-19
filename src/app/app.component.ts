import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

import { Student } from './models/student.model'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ai20-lab04';
    students: Student[] = [
        new Student("123456", "studentLastName2", "studentFirstName2"),
        new Student("234567", "studentLastName2", "studentFirstName2"),
        new Student("345678", "studentLastName3", "studentFirstName3"),
        new Student("456789", "studentLastName4", "studentFirstName4"),
        new Student("567890", "studentLastName5", "studentFirstName5"),
    ];
    displayedColumnsStudents: string[] = ["select", "delete", "id", "name", "firstName"];

    dataSource = new MatTableDataSource<Student>(this.students);
    selection = new SelectionModel<Student>(true, []);

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    checkboxLabel(row?: Student): string {
        if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }
    
    deleteSelected() {
      let unselected: Student[] = [];
      for(let student of this.students) {
        if(!this.selection.isSelected(student)) {
          unselected.push(student);
        }
      }
      this.students = unselected;
    }

}
