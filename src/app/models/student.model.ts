export class Student {
    id: string;
    name: string;
    firstName: string;
    courseId: string;
    groupId: string;

    constructor(i: string, n: string, fn: string) {
        this.id = i;
        this.name = n;
        this.firstName = fn;
        this.courseId = '0';
        this.groupId = '0';
    }
    
}
