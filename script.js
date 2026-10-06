const form = document.getElementById("studentForm");

const message = document.getElementById("message");

const studentList = document.getElementById("studentList");


// When form is submitted
form.addEventListener("submit", async function(event) {

    // Prevent page from refreshing
    event.preventDefault();

    // Get values from input fields
    const roll = document.getElementById("roll").value;
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;


    // Create student object
    const student = {
        roll: roll,
        name: name,
        dob: dob
    };


    try {

        // Send student data to server
        const response = await fetch("/students", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)
        });


        const result = await response.json();


        if (response.ok) {

            message.textContent = "Student added successfully!";

            form.reset();

            loadStudents();

        } else {

            message.textContent = result.message;

        }

    } catch (error) {

        message.textContent = "Server error.";

        console.log(error);

    }

});


// Function to load students
async function loadStudents() {

    try {

        const response = await fetch("/students");

        const students = await response.json();

        studentList.innerHTML = "";


        students.forEach(function(student) {

            const div = document.createElement("div");

            div.classList.add("student");

            div.innerHTML = `
                <p><strong>Roll Number:</strong> ${student.roll}</p>
                <p><strong>Name:</strong> ${student.name}</p>
                <p><strong>DOB:</strong> ${student.dob}</p>
            `;

            studentList.appendChild(div);

        });

    } catch (error) {

        console.log(error);

    }

}


// Load students when page opens
loadStudents();