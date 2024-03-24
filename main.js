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

const formData = {};
const financeData = JSON.parse(localStorage.getItem("testStorageJS"));

const financeTag = document.querySelector("#financeData");
const noData = document.createElement("div");
let noDataText = document.createElement("p");
noDataText.innerText = "No Financial Record found";
noData.appendChild(noDataText);
console.log(financeData);
financeData === null
  ? financeTag.appendChild(noData)
  : financeData?.forEach((finance) => {
      const div = document.createElement("div");
      const container = document.createElement("div");
      const name = document.createElement("p");
      const cashAmount = document.createElement("p");
      const managerName = document.createElement("p");
      const item = document.createElement("p");
      const edit = document.createElement("a");
      name.innerHTML = finance.NameofInitiator;
      cashAmount.innerHTML = finance.CashAmount;
      managerName.innerHTML = finance.ManagerName;
      item.innerHTML = finance.Itemcount;
      edit.innerText = "Edit";
      edit.href = "edit.html?id=" + finance.id;
      container.appendChild(name);
      container.appendChild(cashAmount);
      container.appendChild(managerName);
      container.appendChild(item);
      div.appendChild(container);
      div.appendChild(edit);
      financeTag.appendChild(div);
    });

//creating the form values and appending accordingly
const form = document.getElementById("dynamicForm");

const button = document.createElement("button");
button.className = "btn";
button.innerText = "Submit";
button.type = "submit";
function handleChange() {
  const inputClass = document.querySelectorAll("#dynamicForm input");
  formData.id = uniqueId;
  inputClass.forEach((input) => {
    formData[input.id] = input.value;
  });
}

inputValues.forEach((input) => {
  const inputField = document.createElement("input");
  const label = document.createElement("label");
  const inputCont = document.createElement("div");
  inputField.setAttribute("type", input.type);
  inputField.setAttribute("class", `input_class_${input.id}`);
  inputField.setAttribute("id", `${input.label.split(" ").join("")}`);
  inputField.setAttribute("name", `input_${input.id}`);
  label.innerHTML = `${input.label}:`;
  inputCont.appendChild(label);
  inputCont.appendChild(inputField);
  inputCont.className = "inputCon";
  form.appendChild(inputCont);

  inputField.addEventListener("input", () => {
    handleChange();
  });
});
form.appendChild(button);

//generating a unique Id
function generateUniqueId() {
  // Generate a timestamp to ensure uniqueness
  const timestamp = new Date().getTime();

  // Generate a random number (to handle multiple IDs generated in the same millisecond)
  const random = Math.random().toString(36).substring(2, 15);

  // Concatenate timestamp and random number to create the unique ID
  const uniqueId = timestamp + "-" + random;

  return uniqueId;
}
const uniqueId = generateUniqueId();

//   formValue.id = uniqueId;

const storedData = JSON.parse(localStorage.getItem("testStorageJS")) || [];

button.addEventListener("click", async (e) => {
  e.preventDefault();
  const { isValid } = await validateForm();
  console.log(isValid);

  if (isValid) {
    const updateData = [...storedData, formData];
    localStorage.setItem("testStorageJS", JSON.stringify(updateData));
    window.location.reload();
  } else {
    console.log("no");
  }
});

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

// validateform
const validateForm = async () => {
  const form = document.getElementById("dynamicForm");
  let isValid = true;
  // Iterate over each input field
  inputValues.forEach((input) => {
    const inputElement = document.querySelector(`.input_class_${input.id}`);
    // Validate based on input type
    switch (input.type) {
      case "text":
        if (inputElement.value.trim() === "") {
          isValid = false;
          alert(input.label + " cannot be empty!");
        }
        break;
      case "number":
        if (
          inputElement.value.trim() === "" ||
          isNaN(inputElement.value.trim())
        ) {
          isValid = false;
          alert(input.label + " must be a valid number!");
        }
        break;
      case "date":
        if (inputElement.value.trim() === "") {
          isValid = false;
          alert(input.label + " cannot be empty!");
        }
        break;
    }
  });

  return { isValid };
};
