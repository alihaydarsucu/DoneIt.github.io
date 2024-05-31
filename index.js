const firstLine = document.querySelector(".first-line");
const secondLine = document.querySelector(".second-line");
const pushButton = document.getElementById("push");
const inputFieldText = document.getElementById("input-field");
const searchInputText = document.getElementById("search-input");
const categoryDropdown = document.getElementById("category-dropdown");
const allCategories = document.getElementById("allCategories");
const workCategory = document.getElementById("workCategory");
const personalCategory = document.getElementById("personalCategory");
const otherCategory = document.getElementById("otherCategory");
const workCategory1 = document.getElementById("workCategory1");
const personalCategory1 = document.getElementById("personalCategory1");
const otherCategory1 = document.getElementById("otherCategory1");
const tasks = document.getElementById("tasks");
const error = document.getElementById("error");
const buttons = document.querySelectorAll(".language-section a");

const data = {
  english: {
    firstLine: "Done It",
    secondLine: "Get Things Done.",
    pushButton: "Add",
    inputFieldText: "Type something to do.",
    allCategories: "All Categories",
    workCategory: "Work",
    personalCategory: "Personal",
    otherCategory: "Other",
    workCategory1: "Work",
    personalCategory1: "Personal",
    otherCategory1: "Other",
    searchInputText: "Search tasks...",
    error: "Input must not be empty!"
  },
  turkish: {
    firstLine: "Bitir",
    secondLine: "Yapman Gerekenleri Hallet.",
    pushButton: "Ekle",
    inputFieldText: "Yapılacak bir şey yazın.",
    allCategories: "Tüm Kategoriler",
    workCategory: "İş",
    personalCategory: "Kişisel",
    otherCategory: "Diğer",
    workCategory1: "İş",
    personalCategory1: "Kişisel",
    otherCategory1: "Diğer",
    searchInputText: "Yapılacaklarda arayın...",
    error : "Girdi boş olmamalıdır!"
  },
  arabic: {
    firstLine: "تم ذلك",
    secondLine: "إنجاز المهام.",
    pushButton: "إضافة",
    inputFieldText: "اكتب شيئاً للقيام به.",
    allCategories: "جميع الفئات",
    workCategory: "العمل",
    personalCategory: "شخصي",
    otherCategory: "أخرى",
    workCategory1: "العمل",
    personalCategory1: "شخصي",
    otherCategory1: "أخرى",
    searchInputText: "مهام البحث...",
    error : "يجب ألا تكون المدخلات فارغة!"
  },
    russian: {
    firstLine: "Отделка",
    secondLine: "Успевайте делать дела.",
    pushButton: "Добавить",
    inputFieldText: "Напечатайте что-нибудь, чем можно заняться.",
    allCategories: "Все категории",
    workCategory: "Работа",
    personalCategory: "Личный",
    otherCategory: "Другие",
    workCategory1: "Работа",
    personalCategory1: "Личный",
    otherCategory1: "Другие",
    searchInputText: "Поисковые задачи...",
    error: "Входные данные не должны быть пустыми!"
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks.innerHTML = storedTasks;
    DeleteFunction(tasks);
  }

  document.getElementById("push").addEventListener("click", function () {
    const input = document.querySelector("#wrapper input");
    const category = document.querySelector("#category-dropdown").value;
    addTask(input.value, category);
    input.value = "";
    localStorage.setItem("tasks", tasks.innerHTML);
  });

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const activeElement = document.querySelector(".language-section .active");
      if (activeElement) {
        activeElement.classList.remove("active");
      }

      button.classList.add("active");

      const attr = button.getAttribute("language");

      firstLine.textContent = data[attr].firstLine;
      secondLine.textContent = data[attr].secondLine;
      pushButton.textContent = data[attr].pushButton;
      inputFieldText.placeholder = data[attr].inputFieldText;
      searchInputText.placeholder = data[attr].searchInputText;
      error.textContent = data[attr].error;
      otherCategory.textContent = data[attr].otherCategory;
      personalCategory.textContent = data[attr].personalCategory;
      workCategory.textContent = data[attr].workCategory;
      otherCategory1.textContent = data[attr].otherCategory1;
      personalCategory1.textContent = data[attr].personalCategory1;
      workCategory1.textContent = data[attr].workCategory1;
      allCategories.textContent = data[attr].allCategories;
      updateTaskContainer();
    });
  });

  categoryDropdown.addEventListener("change", function () {
    updateTaskContainer();
  });

  searchInputText.addEventListener("input", function () {
    updateTaskContainer();
  });
});

function addTask(task, category) {
  if (!task.trim()) {
    error.style.display = "block";
    setTimeout(function () {
      error.style.display = "none";
    }, 2000);
    return;
  }

  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.setAttribute("data-category", category);
  newTask.innerHTML = `
    <span>${task}</span>
    <button class="edit">
      <i class="fa-solid fa-pen"></i>
    </button>
    <button class="delete">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;
  tasks.appendChild(newTask);
  newTask.querySelector(".edit").addEventListener("click", editTask);
  DeleteFunction(newTask);
  localStorage.setItem("tasks", tasks.innerHTML);
}

function editTask() {
  const taskText = this.previousElementSibling.textContent;
  const newTaskText = prompt("Edit that task", taskText);

  if (newTaskText !== null && newTaskText.trim() !== "") {
    this.previousElementSibling.textContent = newTaskText.trim();
    localStorage.setItem("tasks", tasks.innerHTML);
  }
}

function DeleteFunction(tasksParent) {
    const deleteButtons = tasksParent.querySelectorAll(".delete");
    deleteButtons.forEach(button => {
      button.addEventListener("click", function () {
        const task = this.parentElement;
        task.remove(); // Bu satırda değişiklik yapıldı
        localStorage.setItem("tasks", tasks.innerHTML);
      });
    });
  }
  
function updateTaskContainer() {
  const filterCategory = categoryDropdown.value;
  const filterText = searchInputText.value.toLowerCase().trim();
  const allTasks = document.querySelectorAll(".task");

  allTasks.forEach(task => {
    const taskCategory = task.getAttribute("data-category");
    const taskText = task.textContent.toLowerCase().trim();

    if ((filterCategory === "" || taskCategory === filterCategory) &&
        (filterText === "" || taskText.includes(filterText))) {
      task.style.display = "grid";
    } else {
      task.style.display = "none";
    }
  });
}
