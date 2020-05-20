import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Sort} from '@angular/material/sort';
import { FormControl } from '@angular/forms';

import { Student } from './models/student.model'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
 
    studentsDB: Student[] = [
        new Student("123456", "Storti", "Matteo"),
        new Student("234567", "Poretti", "Matilde"),
        new Student("345678", "Baglio", "Giacomo"),
        new Student("456789", "Rossi", "Cosimo"),
        new Student("567890", "Bianchi", "Alberto"),
    ];
    students: Student[] = [
        new Student("456789", "Rossi", "Cosimo"),
        new Student("567890", "Bianchi", "Alberto"),
    ];

    title = 'ai20-lab04';
    myControl = new FormControl();
    displayedColumnsStudents: string[] = ["select", "id", "name", "firstName"];
    dataSource = new MatTableDataSource<Student>(this.students);
    selection = new SelectionModel<Student>(true, []);
    filteredOptions: Observable<Student[]>;
    selectedStudent: Student = null;
    sortedData: Student[];

    ngOnInit() {
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }

    constructor() {
      this.sortedData = this.students.slice();
    }

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
        this.dataSource = new MatTableDataSource<Student>(this.students);
      }
    }

    displayFn(student: Student): string {
      if( student != null)
        return student.name+" "+student.firstName+" ("+student.id+")";
      return "";
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
    
    optionSelected(student: Student) {
        this.selectedStudent = student;
    }
    
    addOption() {
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      if(this.selectedStudent != null) {
        for(let student of this.students) {
          if(student.id === this.selectedStudent.id) {
            return;
          }
        }
        this.students.push(this.selectedStudent);
        this.selectedStudent = null;
        this.dataSource = new MatTableDataSource<Student>(this.students);
      }
    }

    sortData(sort: Sort) {
      const data = this.students.slice();
      if (!sort.active || sort.direction === '') {
        this.sortedData = data;
        this.dataSource = new MatTableDataSource<Student>(this.sortedData);
        return;
      }
  
      this.sortedData = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'id': return this.compareStudents(a.id, b.id, isAsc);
          case 'name': return this.compareStudents(a.name, b.name, isAsc);
          case 'firstName': return this.compareStudents(a.firstName, b.firstName, isAsc);
          default: return 0;
        }
      });
      this.dataSource = new MatTableDataSource<Student>(this.sortedData);
    }

    compareStudents(a: Student | string, b: Student | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
