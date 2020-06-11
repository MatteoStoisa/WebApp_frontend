import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'PageNotFoundComponent',
  template: `
    <div>
        <h1>* PageNotFound *</h1>
    </div>
    `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}