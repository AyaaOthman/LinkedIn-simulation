//BTNS
const continueBtn = document.getElementById("continueBtn");
const studentBtn = document.getElementById("studentDataBtn");
//Not Student Section
const recentJobInput = document.getElementById("recent-job");
const employmentType = document.getElementById("Employment-type");
const recentCompany = document.getElementById("recent-company");
const jobDataDiv = document.getElementById("job-data");
const notStudentDataDiv = document.getElementById("not-student-data");
const employeeData = document.querySelectorAll(".employee");
//Student
const studentDataDiv = document.getElementById("student-data");
const college = document.getElementById("college");
const studentStartYear = document.getElementById("student-start-year");
const studentEndYear = document.getElementById("student-end-year");
const studentData = document.querySelectorAll(".student");

//show right data section
recentJobInput.addEventListener("keydown", () => {
  jobDataDiv.classList.remove("hidden");
  studentData.forEach((input) => {
    input.required = false;
  });
});

studentBtn.addEventListener("click", () => {
  notStudentDataDiv.classList.toggle("hidden");
  studentDataDiv.classList.toggle("hidden");
  if (studentBtn.textContent === `I'm not Student`) {
    studentBtn.textContent = `I'm Student`;
  } else {
    studentBtn.textContent = `I'm not Student`;
    employeeData.forEach((input) => {
      input.required = false;
    });
  }
});
//check if user loged in
let url = new URL(window.location);
let params = new URLSearchParams(url.search);
let signedInUserEmail = params.get("email");
// check if user signed in
if (localStorage.getItem(`${signedInUserEmail}`)) {
  let userObj = JSON.parse(localStorage.getItem(`${signedInUserEmail}`));
  // let userObj = signedInUser.userObj;
  console.log(JSON.parse(localStorage.getItem(`${signedInUserEmail}`)));
  //store employee data
  continueBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (recentJobInput.value === "") {
      document
        .getElementById("alert-missing-field-job")
        .classList.remove("hidden");
    } else if (recentCompany.value === "") {
      document
        .getElementById("alert-missing-field-company")
        .classList.remove("hidden");
    } else {
      document
        .getElementById("alert-missing-field-job")
        .classList.add("hidden");
      document
        .getElementById("alert-missing-field-company")
        .classList.add("hidden");
      userObj.RecentJob = recentJobInput.value;
      userObj.employmentTyp = employmentType.value;
      userObj.RecentCompany = recentCompany.value;
      localStorage.setItem(`${signedInUserEmail}`, JSON.stringify(userObj));
      open(`/dist/profile/profile.html?email=${signedInUserEmail}`, "_self");
    }
  });
  continueBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (college.value === "") {
      document
        .getElementById("alert-missing-field-collage")
        .classList.remove("hidden");
    } else if (studentStartYear.value === "") {
      document
        .getElementById("alert-missing-field-student-start-year")
        .classList.remove("hidden");
    } else if (studentEndYear.value === "") {
      document
        .getElementById("alert-missing-field-student-end-year")
        .classList.remove("hidden");
    } else {
      document
        .getElementById("alert-missing-field-collage")
        .classList.add("hidden");
      document
        .getElementById("alert-missing-field-student-start-year")
        .classList.add("hidden");
      document
        .getElementById("alert-missing-field-student-end-year")
        .classList.add("hidden");

      userObj.collage = college.value;
      userObj.studentStartYear = studentStartYear.value;

      userObj.studentEndYear = studentEndYear.value;
      localStorage.setItem(`${signedInUserEmail}`, JSON.stringify(userObj));

      open(`./dist/profile/profile.html?email=${signedInUser.email}`, "_self");
    }
  });
}

//store student data
