const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.querySelector(".btn-clear");
const itemFilter = document.getElementById("filter");

const addItem = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);

  itemList.appendChild(li);

  resetUI();

  itemInput.value = "";
};

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-xmark";

  button.appendChild(icon);

  return button;
}

// const removeItem = (e) => {
//   if (e.target.parentElement.classList.contains("remove-item")) {
//     e.target.parentElement.parentElement.remove();
//   }
// };

const removeItem = (e) => {
  const button = e.target.closest(".remove-item");
  if (!button) return;

  if (confirm("Are you sure?")) {
    button.closest("li").remove();

    resetUI();
  }
};

const clearItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  resetUI();
};

function resetUI() {
  const items = itemList.querySelectorAll("li");

  console.log(items);
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);

resetUI();
