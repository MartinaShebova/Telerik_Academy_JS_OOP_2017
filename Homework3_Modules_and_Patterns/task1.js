function solve() {

    let IDGenerator = function () {

        let generate = 0;

        function generator() {
            return generate += 1;
        }

        return {
            generator: generator
        };
    };

    var Course = {

        init: function (title, presentations) {

            this.students = [];
            this.presentationsArray = [];

            for (let i = 0; i < title.length; i += 1) {
                if (title[0] === ' ' || title[title.length - 1] === ' ') {
                    throw Error('expect to throw when there are consecutive spaces in a title');
                }
            }

            if (title.length < 1) {
                throw Error('expect to throw when a title is an empty string');
            }

            for (let i = 0; i < presentations.length; i += 1) {
                if (presentations[i].length < 1) {
                    throw Error('Title length invalid');
                }
            }

            if (presentations.length < 1) {
                throw Error('expect to throw when there are no presentations in the course');
            }

            for (let i = 0; i < presentations.length; i += 1) {
                for (let j = 0; j < presentations[i].length - 1; j += 1) {
                    if (presentations[i][j] === ' ' && presentations[i][j + 1] === ' ') {
                        throw Error('expect to throw when there are consecutive spaces in a title');
                    }
                }
            }

            this.title = title;
            this.presentationsArray = presentations;
            this.studentGenerateID = IDGenerator();

            return this;

        },
        addStudent: function (name) {

            if (typeof name !== 'string') {
                throw Error('expect to throw when a student name is not a string');
            }

            let splitName = name.split(' ');

            if (splitName.length !== 2) {
                throw Error('expect to throw when a student name is invalid');
            }

            let firstCheck = splitName[0].charAt(0) !== splitName[0].charAt(0).toUpperCase();
            let secondCheck = splitName[1].charAt(0) !== splitName[1].charAt(0).toUpperCase();

            if (firstCheck || secondCheck) {
                throw Error('expect to throw when a student name is invalid');
            }

            let student = {
                firstname: splitName[0],
                lastname: splitName[1],
                id: this.studentGenerateID.generator()
            };

            this.students.push(student);
            return student.id;

        },
        getAllStudents: function () {

            let deepCopyStudentsArray = [];

            for (let i = 0; i < this.students.length; i += 1) {
                let currentStudent = {
                    firstname: this.students[i].firstname,
                    lastname: this.students[i].lastname,
                    id: this.students[i].id
                };

                deepCopyStudentsArray.push(currentStudent);
            }

            return deepCopyStudentsArray;
        },
        submitHomework: function (studentID, homeworkID) {

            if (studentID < 1 || studentID % 1 !== 0 || studentID > this.students.length) {
                throw Error('invalid student id');
            }

            if (homeworkID < 1 || homeworkID % 1 !== 0 || homeworkID > this.presentationsArray.length) {
                throw Error('invalid presentation');
            }

        },
        pushExamResults: function (results) {

            if (!Array.isArray(results)) {
                throw Error('expect pushExamResults to throw if given invalid scores (given object, not array)');
            }

            if (results.length < 1 || typeof results === 'string') {
                throw Error(' expect pushExamResults to throw if given invalid scores (no arguments given)');
            }

            for (let i = 0; i < results.length; i += 1) {
                if (!(results[i].hasOwnProperty('score'))) {
                    throw Error('expect pushExamResults to throw if given invalid scores (no score given for a student');
                }
            }

            for (let i = 0; i < results.length - 1; i += 1) {
                if (results[i].StudentID === results[i + 1].StudentID) {
                    throw Error('expect pushExamResults to throw if given invalid scores no score given for a student');
                }
            }

            for (let i = 0; i < results.length; i += 1) {
                if (typeof results[i].StudentID !== 'number' || typeof results[i].score !== 'number') {
                    throw Error('expect pushExamResults to throw if given invalid scores (score is not a Number)');
                }
            }

            for (let i = 0; i < results.length; i += 1) {
                if (results[i].StudentID < 1 || results[i].StudentID > this.students[this.students.length - 1].id) {
                    throw Error('invalid scores');
                }
            }
        }
    };

    return Course;
}