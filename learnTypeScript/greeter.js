//function greeter(person:string) {
//    return "Hello," + person;
//}
var Student = (function () {
    function Student(firstName, middleInterial, lastName) {
        this.firstName = firstName;
        this.middleInterial = middleInterial;
        this.lastName = lastName;
        this.fullName = firstName + middleInterial + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
document.body.innerHTML = greeter(user);
//# sourceMappingURL=greeter.js.map