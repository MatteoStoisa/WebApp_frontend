import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

import { Student } from '../models/student.model'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

    studentsDB: Student[];
    @Input() set _studentsDB(studentsDBcont: Student[]) {
        this.studentsDB = studentsDBcont;
    }
    students: Student[];
    @Input() set _students(studentsCont: Student[]) {
        this.students = studentsCont;
        this.dataSource = new MatTableDataSource<Student>(studentsCont);
        this.dataSource.paginator = this.paginator;
    }
    @Output() deleteStudentsEmitter = new EventEmitter<Student[]>();
    @Output() addStudentEmitter = new EventEmitter<Student>();

    myControl = new FormControl();
    displayedColumnsStudents: string[] = ["select", "id", "name", "firstName"];
    dataSource = new MatTableDataSource<Student>(this.students);
    selection = new SelectionModel<Student>(true, []);
    filteredOptions: Observable<Student[]>;
    selectedStudent: Student = null;
    sortedData: Student[];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


    constructor() { }

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;

        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
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
        if (this.selection.selected.length != 0) {
            this.deleteStudentsEmitter.emit(this.selection.selected);
            this.selection.clear();
        }
        this.dataSource = new MatTableDataSource<Student>(this.students);
        this.dataSource.paginator = this.paginator;
    }

    displayFn(student: Student): string {
        if (student != null)
            return student.name + " " + student.firstName + " (" + student.id + ")";
        return "";
    }

    private _filter(value: string): Student[] {
        const filterValue: string = value.toString().toLowerCase();
        let filteredStudentDB: Student[] = [];
        for (let student of this.studentsDB) {
            if (student.id.toString().toLowerCase().includes(filterValue) ||
                student.name.toString().toLowerCase().includes(filterValue) ||
                student.firstName.toString().toLowerCase().includes(filterValue))
                filteredStudentDB.push(student);
        }
        return filteredStudentDB;
    }

    optionSelected(student: MatAutocompleteSelectedEvent) {
        this.selectedStudent = student.option.value;
    }

    addOption() {
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value)),
            );
        if (this.selectedStudent != null) {
            this.addStudentEmitter.emit(this.selectedStudent);
            this.selectedStudent = null;
            this.dataSource = new MatTableDataSource<Student>(this.students);
            this.dataSource.paginator = this.paginator;
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