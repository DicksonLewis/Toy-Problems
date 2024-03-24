let marks = prompt("Enter student marks (0-100):");
marks = parseInt(marks);

if (marks > 100 || marks < 0 || isNaN(marks)) {
    console.log("Invalid input. Please enter a number between 0 and 100.");
} else {
    let grade;
    if (marks > 79) {
        grade = "A";
    } else if (marks >= 60) {
        grade = "B";
    } else if (marks >= 50) {
        grade = "C";
    } else if (marks >= 40) {
        grade = "D";
    } else {
        grade = "E";
    }

    console.log(`Student grade: ${grade}`);
}
