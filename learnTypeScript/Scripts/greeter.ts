﻿//function greeter(person:string) {
//    return "Hello," + person;
//}

//// var user = "Jane User";
//var user =[1,3,5]

//document.body.innerHTML = greeter(user);

//interface IPerson {
//    firstName: string;
//    lastName: string;
//}

function greeter3(person: IPerson) {
    return "Hello," + person.firstName + " " + person.lastName;
}

//var user = { firstName: "wang", lastName: "Longlong" };

//document.body.innerHTML = greeter(user);

import * as $ from "jquery"


interface IPerson {
    firstName: string;
    lastName: string;
}

class Student {
    fullName: string;
    constructor(public firstName, public middleInterial, public lastName) {
        this.fullName = firstName + middleInterial + lastName;
    }
}

function greeter(person: IPerson) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

var user = new Student("Jame", "M.", "User");
$("body").html(greeter(user));      
    