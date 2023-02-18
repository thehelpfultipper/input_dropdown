// variables
const body = document.querySelector("body"),
  input = document.querySelector("#language"),
  dropdown = document.querySelector(".dropdown"),
  dropdownList = document.querySelector(".dropdown_wrapper"),
  listItems = document.querySelectorAll("#languages span"),
  themeSwitch = document.querySelector(".switch input");

// functions
const addActiveClass = (e) => {
  // Adds active class to dropdown
  dropdown.classList.toggle("active");
  dropdownList.classList.toggle("active");

  // Reset search input value
  e.target.value !== "" ? (e.target.value = "") : null;
};

const rmvActiveClass = () => {
  // Removes active class
  dropdown.classList.remove("active");
  dropdownList.classList.remove("active");
};

const filterList = () => {
  let filter = input.value.toLowerCase().trim();

  for (let i = 0; i < listItems.length; i++) {
    let txtVal = listItems[i].innerText.toLowerCase();
    // console.log(txtVal.includes(filter), filter, txtVal)
    if (txtVal.includes(filter) && filter !== "") {
      listItems[i].style.background = "#E9EFFF";
      listItems[i].style.color = "#5B6278";
      
      // extra functionality on key val
      document.addEventListener('keydown', e => {
        if(e.key === 'Enter') {
          input.value = txtVal;
          rmvActiveClass();
        }
        if( e.key === 'Backspace') {
          // Adds active class (no toggle)
          dropdown.classList.add("active");
          dropdownList.classList.add("active");
        }
      });
    } else {
      listItems[i].style.background = "";
      listItems[i].style.color = "";
    }
  }
};

// actions
themeSwitch.addEventListener("click", () => {
  if (themeSwitch.checked) {
    // console.log(themeSwitch.checked);
    body.classList.remove("dark");
    body.classList.add("light");
  } else {
    // console.log(themeSwitch.checked);
    body.classList.remove("light");
    body.classList.add("dark");
  }
});

// prevent form submission
document.querySelector('form').addEventListener('submit', e => e.preventDefault());

input.addEventListener("click", addActiveClass);
input.addEventListener("input", () => {
  dropdown.classList.add("active");
  dropdownList.classList.add("active");
});
document.addEventListener("click", (e) => {
  console.log(e.target)
  // Check clicked outside of input
  e.target.id !== "language" &&
  e.target.classList.contains("dropdown_wrapper") === false &&
    e.target.classList.contains("languages_wrapper") === false
    ? rmvActiveClass()
    : null;
});
listItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    let val = e.target.innerHTML;
    // Update value of search input to chosen span
    input.value = val;
  });
});
input.addEventListener("keyup", filterList);
