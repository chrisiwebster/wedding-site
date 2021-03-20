import weddingList from "./weddingList.js";
window.addEventListener("load", () => {
  const guestNameInput = document.querySelector("#name");
  const nameWrapper = document.querySelector("#name-wrapper");
  const checkButton = document.querySelector("#nameButton");
  const weddingOptions = document.querySelector("#weddingOptions");
  const noInvite = document.querySelector("#no-invite");
  const submitButton = document.querySelector("#submit");
  const rsvp = document.querySelectorAll('input[name="rsvp"]');
  const form = document.querySelector("form");
  const restOfForm = document.querySelector("#continue-form");
  const mealSelector = document.querySelector("#meals");
  const songChoice = document.querySelector("#song");
  const errorMessage = document.querySelector("#error");
  const guestDisplay = document.querySelector("#guest");

  const handleClearInput = () => {
    //Deletes the error message if there is one and removes the variable so it isn't stored
    noInvite.style.display = "none";
    guestName = undefined;
  };

  const handleCheckingName = () => {
    //Gets the value of what is inputted in the text field
    let guestName = guestNameInput.value.toLowerCase();
    //Makes the input empty
    guestNameInput.value = "";
    for (let i = 0; i < weddingList.length; i++) {
      if (guestName === weddingList[i]) {
        weddingOptions.style.display = "block";
        guestName.toUpperCase();
        guestDisplay.innerHTML = guestName;
        noInvite.style.display = "none";
        nameWrapper.style.display = "none";
        break;
      } else {
        noInvite.style.display = "block";
      }
    }
    //Deletes the variable stored in guestName
    guestNameInput.addEventListener("focus", handleClearInput);
  };

  //When you click the checkButton it will save what's been put in the input and run through the wedding list to check the names
  checkButton.addEventListener("click", handleCheckingName);

  const handleRSVP = () => {
    //Checks to see if they've said no because they don't need to fill out the form otherwise
    let selectedValue;
    for (const response of rsvp) {
      if (response.checked) {
        selectedValue = response.value;
        break;
      }
    }
    if (selectedValue === "yes") {
      restOfForm.style.display = "block";
    } else {
      restOfForm.style.display = "none";
    }
  };

  form.addEventListener("click", handleRSVP);

  const handleSubmit = (ev) => {
    if ((rsvp.value = "no")) {
      weddingOptions.innerHTML =
        '<p id="thanks">Thanks for letting us know!</p>';
    } else if (rsvp.value != "no" || !mealSelector.value || !songChoice.value) {
      errorMessage.style.display = "block";
      //Prevents the page from refreshing
      ev.preventDefault();
    } else {
      weddingOptions.innerHTML =
        '<p id="thanks">Thanks for letting us know!</p>';
    }
  };

  submitButton.addEventListener("click", handleSubmit);
});
