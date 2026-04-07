const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.querySelector(".btn-clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
  const itemsStored = getItemsFromStorage();
  itemsStored.forEach((item) => addItemToDOM(item));
  resetUI();
}

const onAddItemSubmit = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert("That item already exists!");
      return;
    }
  }

  addItemToDOM(newItem);
  addItemToStorage(newItem);

  resetUI();

  itemInput.value = "";
};

function addItemToDOM(newItem) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-xmark";

  button.appendChild(icon);

  return button;
}

function addItemToStorage(item) {
  const itemsStored = getItemsFromStorage();
  itemsStored.push(item);

  localStorage.setItem("items", JSON.stringify(itemsStored));
}

function getItemsFromStorage() {
  const itemsStored = JSON.parse(localStorage.getItem("items")) ?? [];
  return itemsStored;
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

// function onClickItem(e) {
//   if (e.target.parentElement.classList.contains("remove-item")) {
//     removeItem(e.target.parentElement.parentElement);
//   }
// }

function onClickItem(e) {
  const li = e.target.closest("li");
  if (!li) return;

  if (e.target.closest(".remove-item")) {
    removeItem(li);
  } else {
    setItemToEdit(li);
  }
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  formBtn.innerHTML = "<i class='fa-solid fa-pen'></i>  Update item";
  formBtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm("Are you sure?")) {
    item.remove();

    removeItemFromStorage(item.textContent);

    resetUI();
  }
}

function removeItemFromStorage(item) {
  let itemsStored = getItemsFromStorage();

  itemsStored = itemsStored.filter((i) => i !== item);

  localStorage.setItem("items", JSON.stringify(itemsStored));
}

const clearItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  localStorage.removeItem("items");

  resetUI();
};

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const searchText = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.textContent.toLowerCase();

    if (itemName.includes(searchText)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function resetUI() {
  itemInput.value = "";

  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";

  isEditMode = false;
}

function init() {
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
  resetUI();
}

init();
