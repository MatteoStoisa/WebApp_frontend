import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'ai20-lab04';

    ngOnInit() { }

    constructor() { }

    navLinks = [
        {label: 'Students', path: 'teacher/course/applicazioni-internet/students'}, 
        {label: "VMs", path: 'teacher/course/applicazioni-internet/vms'}
    ];
    activeLink = this.navLinks[0];
    
}
