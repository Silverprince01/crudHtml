const inputValues = [
  {
    id: 1,
    label: "Name of Initiator",
    type: "text",
  },
  {
    id: 2,
    label: "Cash Amount",
    type: "number",
  },
  {
    id: 3,
    label: "Item of Expenses",
    type: "text",
  },
  {
    id: 4,
    label: "Manager Name",
    type: "text",
  },
  {
    id: 5,
    label: "Item count",
    type: "number",
  },
  {
    id: 6,
    label: "Purchase Date",
    type: "date",
  },
  {
    id: 7,
    label: "Employee ID",
    type: "text",
  },
  {
    id: 8,
    label: "Description",
    type: "text",
  },
];
const search = window.location.search.split("?id=");

const id = search[1];

const existingData = JSON.parse(localStorage.getItem("testStorageJS"));
const singleData = existingData.find((item) => item.id === id);
const button = document.createElement("button");
button.innerText = "Edit";

const delButton = document.createElement("button");
delButton.innerText = "Delete";
const form = document.getElementById("dynamicForm");
form.appendChild(delButton);
const getSingleToEdit = () => {
  function handleChange() {
    const inputClass = document.querySelectorAll("#dynamicForm input");
    inputClass.forEach((input) => {
      singleData[input.id] = input.value;
    });
    console.log(singleData);
  }

  inputValues.forEach((input) => {
    const inputField = document.createElement("input");
    const label = document.createElement("label");
    const inputCont = document.createElement("div");
    inputField.setAttribute("type", input.type);
    inputField.setAttribute("placeholder", input.label);
    inputField.setAttribute("class", `input_class`);
    inputField.setAttribute("id", `${input.label.split(" ").join("")}`);
    inputField.setAttribute("name", `input_${input.id}`);
    inputField.setAttribute(
      "value",
      singleData?.[input.label.split(" ").join("")]
    );
    label.innerHTML = `${input.label}:`;

    inputCont.appendChild(label);
    inputCont.appendChild(inputField);
    inputCont.className = "inputCon";
    form.appendChild(inputCont);

    inputField.addEventListener("input", () => {
      handleChange();
    });
  });

  const btmContainer = document.createElement("div");
  btmContainer.className = "btmContainer"
  btmContainer.appendChild(button);
  btmContainer.appendChild(delButton);
  form.appendChild(btmContainer);

  console.log(singleData);
};

getSingleToEdit();

button.addEventListener("click", async (e) => {
  e.preventDefault();
  await handleEdit(singleData);
  window.location.href = "index.html";
});

delButton.addEventListener("click", async (e) => {
  e.preventDefault();
  await deleteItem(singleData);
  window.location.href = "index.html";
});

console.log(window.location.href);
const handleEdit = async (singleData) => {
  try {
    const updatedData = await JSON.parse(
      localStorage.getItem("testStorageJS")
    ).map((item) => {
      if (item.id === singleData.id) {
        return singleData;
      }
      return item;
    });
    localStorage.setItem("testStorageJS", JSON.stringify(updatedData));
    alert("Successfully updated");
  } catch (error) {
    alert(error);
  }
};

const deleteItem = async (singleData) => {
  try {
    const updatedData = await JSON.parse(
      localStorage.getItem("testStorageJS")
    ).filter((item) => item.id !== singleData.id);
    localStorage.setItem("testStorageJS", JSON.stringify(updatedData));
    alert("Item has been deleted");
  } catch (error) {
    console.log(error);
  }
};
