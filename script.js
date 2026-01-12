// CRUD
// Create - Создание
// Read - Чтение
// Update - Изменение
// Delete - Удаление

// Read
const addFormEl = document.getElementById("add-form");
const fnameInputEl = document.getElementById("firstname");
const lnameInputEl = document.getElementById("lastname");
const viewbtnEl = document.getElementById("view-btn");
const addBtnEl = document.getElementById("add-btn");
const saveBtnEl = document.getElementById("save-btn");

const studentsListEl = document.getElementById("student-list");

addFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
});

let studentsList = JSON.parse(localStorage.getItem("studentsList")) || [];
let updateId = null;

for (const student of studentsList) {
  const liEl = document.createElement("li");
  liEl.classList.add("list-item");
  liEl.id = student.id;

  const nameTextEl = document.createElement("span");
  const updateBtnEl = document.createElement("button");
  const deleteBtnEl = document.createElement("button");

  nameTextEl.textContent = `${student.lastName} ${student.firstName}`;
  updateBtnEl.textContent = "✏️";
  deleteBtnEl.textContent = "❌";

  updateBtnEl.addEventListener("click", () => getForUpdate(student.id));
  deleteBtnEl.addEventListener("click", () => deleteStudent(student.id));

  liEl.appendChild(nameTextEl);
  liEl.appendChild(updateBtnEl);
  liEl.appendChild(deleteBtnEl);

  studentsListEl.appendChild(liEl);
}

addBtnEl.addEventListener("click", addStudent);
saveBtnEl.addEventListener("click", () => saveUpdatedStudent(updateId));

function validate(fname, lname) {
  const validated = { fname: null, lname: null };

  if (typeof fname === "string" && typeof lname === "string") {
    firstName = fname.trim();
    lastName = lname.trim();

    if (firstName && lastName) {
      validated.fname =
        firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
      validated.lname =
        lastName[0].toUpperCase() + lastName.slice(1).toLowerCase();
    }
  }

  return validated;
}

function deleteStudent(id) {
  studentsList = studentsList.filter((item) => item.id !== id);
  localStorage.setItem("studentsList", JSON.stringify(studentsList));

  const currentLiEl = document.getElementById(id);
  if (currentLiEl) currentLiEl.remove();
}

function getForUpdate(id) {
  const currentStudent = studentsList.find((item) => item.id === id);

  if (currentStudent) {
    updateId = id;

    fnameInputEl.value = currentStudent.firstName;
    lnameInputEl.value = currentStudent.lastName;

    saveBtnEl.style.display = "inline";
    addBtnEl.style.display = "none";
  }
}

function addStudent() {
  let validatedNames = validate(fnameInputEl.value, lnameInputEl.value);

  if (validatedNames.fname && validatedNames.lname) {
    const id = Date.now();

    studentsList.push({
      id,
      lastName: validatedNames.lname,
      firstName: validatedNames.fname,
    });
    localStorage.setItem("studentsList", JSON.stringify(studentsList));

    const liEl = document.createElement("li");
    liEl.classList.add("list-item");
    liEl.id = id;

    const nameTextEl = document.createElement("span");
    const updateBtnEl = document.createElement("button");
    const deleteBtnEl = document.createElement("button");

    nameTextEl.textContent = `${validatedNames.lname} ${validatedNames.fname}`;
    updateBtnEl.textContent = "✏️";
    deleteBtnEl.textContent = "❌";

    updateBtnEl.addEventListener("click", () => getForUpdate(id));
    deleteBtnEl.addEventListener("click", () => deleteStudent(id));

    liEl.appendChild(nameTextEl);
    liEl.appendChild(updateBtnEl);
    liEl.appendChild(deleteBtnEl);

    studentsListEl.appendChild(liEl);

    fnameInputEl.value = "";
    lnameInputEl.value = "";
  }
}

function saveUpdatedStudent(id) {
  let validatedNames = validate(fnameInputEl.value, lnameInputEl.value);
  if (id && validatedNames.fname && validatedNames.lname) {
    const currentStudent = studentsList.find((item) => item.id === id);

    if (currentStudent) {
      currentStudent.firstName = validatedNames.fname;
      currentStudent.lastName = validatedNames.lname;
    }
    localStorage.setItem("studentsList", JSON.stringify(studentsList));

    const currentLiEl = document.getElementById(id);
    if (currentLiEl) {
      const currentTextEl = currentLiEl.querySelector("span");

      if (currentTextEl) {
        currentTextEl.textContent = `${validatedNames.lname} ${validatedNames.fname}`;
      }

      saveBtnEl.style.display = "none";
      addBtnEl.style.display = "inline";
    }

    fnameInputEl.value = "";
    lnameInputEl.value = "";
    updateId = null;
  }
}

viewbtnEl.addEventListener("click", () => {
  if (lnameInputEl.type === "text") {
    lnameInputEl.type = "password";
  } else {
    lnameInputEl.type = "text";
  }
});
