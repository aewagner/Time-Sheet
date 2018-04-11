var config = {
    apiKey: "AIzaSyA355Vg03v_8_bO0fNbfYBWrHDKxl3UASk",
    authDomain: "test-581a0.firebaseapp.com",
    databaseURL: "https://test-581a0.firebaseio.com",
    projectId: "test-581a0",
    storageBucket: "test-581a0.appspot.com",
    messagingSenderId: "293120306260"
};

firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();

// --------------------------------------------------------------
// Link to Firebase Database for viewer tracking
var employeesRef = database.ref("/employees");



// let employeeName = "";
// let role = "";
// let startDate = "";
// let monthlyRate = 0;
// let monthsWorked = 0;
// let totalBilled = 0;


$('#submit-button').on('click', function () {

    event.preventDefault();

    let employeeName = $('#employee-name').val().trim();
    let role = $('#role').val().trim();
    let startDate = moment($("#start-date").val().trim(), "DD/MM/YY").format("X");
    let monthlyRate = $('#monthly-rate').val().trim();

    console.log('employeeName', employeeName);
    console.log('role', role);
    console.log('startDate', startDate);
    console.log('monthlyRate', monthlyRate);


    employeesRef.push({
        employeeName: employeeName,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate,
    });



    // $('#employee-table').append(
    //     `<tr>
    //         <td>${employeeName}</td>
    //         <td>${role}</td>
    //         <td>${startDate}</td>
    //         <td>${monthsWorked}</td>
    //         <td>${monthlyRate}</td>
    //         <td>${totalBilled}</td>
    //     </tr>`
    // );

});

employeesRef.on("child_added", function (snapshot, prevChildKey) {
    let newEmployee = snapshot.val();
    console.log("Employee Name: " + newEmployee.employeeName);
    console.log("Role: " + newEmployee.role);
    console.log("Start Date: " + newEmployee.startDate);
    
    console.log("Monthly Rate: " + newEmployee.monthlyRate);
    
    console.log("Previous Post ID: " + prevChildKey);

    let empStart = newEmployee.startDate;

    let startDatePretty = moment.unix(empStart).format("MM/DD/YY");
   
    let monthsWorked = moment().diff(moment.unix(empStart, "X"), "months");
    
    console.log("Months Worked: ", monthsWorked);

    let totalBilled = monthsWorked * newEmployee.monthlyRate;
    
    console.log("Total Billed: ", totalBilled);

    


    $('#employee-table').append(
        `<tr>
            <td>${newEmployee.employeeName}</td>
            <td>${newEmployee.role}</td>
            <td>${startDatePretty}</td>
            <td>${monthsWorked}</td>
            <td>${newEmployee.monthlyRate}</td>
            <td>${totalBilled}</td>
        </tr>`
    );


});