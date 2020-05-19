import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';


import { Student } from './models/student.model'
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ai20-lab04';
    myControl = new FormControl();
    studentsDB: Student[] = [
        new Student("123456", "studentLastName1", "studentFirstName1"),
        new Student("234567", "studentLastName2", "studentFirstName2"),
        new Student("345678", "studentLastName3", "studentFirstName3"),
        new Student("456789", "studentLastName4", "studentFirstName4"),
        new Student("567890", "studentLastName5", "studentFirstName5"),
    ];
    students: Student[] = [
        new Student("123456", "studentLastName1", "studentFirstName1"),
        new Student("234567", "studentLastName2", "studentFirstName2"),
    ];
    displayedColumnsStudents: string[] = ["select", "id", "name", "firstName"];

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
      if(this.selection.selected.length != 0) {
        let unselected: Student[] = [];
        for(let student of this.students) {
          if(!this.selection.isSelected(student)) {
            unselected.push(student);
          }
        }
        this.students = unselected;
        this.selection.clear();
      }
    }

    displayFn(student: Student): string {
      return student.name+" "+student.firstName+" ("+student.id+")";
    }

    filteredOptions: Observable<Student[]>;

    ngOnInit() {
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }

    private _filter(value: string): Student[] {
      const filterValue: string = value.toLowerCase();
      let filteredStudentDB: Student[] = [];
      for(let student of this.studentsDB) {
        if(student.id.toLowerCase().includes(filterValue) || 
          student.name.toLowerCase().includes(filterValue) ||
          student.firstName.toLowerCase().includes(filterValue))
            filteredStudentDB.push(student);
      }
      return filteredStudentDB;
    }

}
