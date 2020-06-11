import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'HomeComponent',
    template: `
    <div>
        <h1>* Home *</h1>
    </div>
    `,
    styles: []
})
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}