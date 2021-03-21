import weddingList from "./weddingList.js";
window.addEventListener("load", () => {
  //Check name input
  const guestNameInput = document.querySelector("#name");
  const nameWrapper = document.querySelector("#name-wrapper");
  const checkButton = document.querySelector("#nameButton");
  //Form display
  const weddingOptions = document.querySelector("#weddingOptions");
  const noInvite = document.querySelector("#no-invite");
  const submitButton = document.querySelector("#submit");
  //Yes/No RSVP to handle form dropping
  const rsvpOptions = document.querySelectorAll('input[name="rsvp"]');
  const rsvpWrapper = document.querySelector("#rsvp");
  //Form options
  const restOfForm = document.querySelector("#continue-form");
  const mealSelector = document.querySelector("#meals");
  const songChoice = document.querySelector("#song");
  const comments = document.querySelector("#comments");
  //thanks and error display
  const errorMessage = document.querySelector("#error");
  const guestDisplay = document.querySelector("#guest");
  //Initialising array so we can run through the form to add error style
  let formArray = [];
  //Creating object to save form responses
  const responseObject = {};

  formArray.push(songChoice, mealSelector, comments);

  const handleClearInput = () => {
    //Deletes the error message if there is one and removes the variable so it isn't stored
    noInvite.style.display = "none";
    guestName = undefined;
  };

  const handleCheckingName = () => {
    //Gets the value of what is inputted in the text field
    let guestName = guestNameInput.value.toLowerCase().trim();
    //Makes the input empty
    guestNameInput.value = "";
    for (let i = 0; i < weddingList.length; i++) {
      if (guestName === weddingList[i]) {
        weddingOptions.style.display = "block";
        responseObject.name = guestName;
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

  const handleRSVP = () => {
    //Checks to see if they've said no because they don't need to fill out the form otherwise
    let selectedValue;
    for (const response of rsvpOptions) {
      if (response.checked) {
        selectedValue = response.value;
        responseObject.rsvp = selectedValue;
        break;
      }
    }
    if (selectedValue === "yes") {
      restOfForm.style.display = "block";
    } else {
      restOfForm.style.display = "none";
    }
  };

  const handleSubmit = (ev) => {
    if (!mealSelector.value || !comments.value || !songChoice.value) {
      errorMessage.style.display = "block";
      for (let i = 0; i < formArray.length; i++) {
        if (!formArray[i].value) {
          formArray[i].classList.toggle("missing");
        }
      }
      ev.preventDefault();
    } else {
      ev.preventDefault();
      responseObject.meal = mealSelector.value;
      responseObject.song = songChoice.value;
      responseObject.comments = comments.value;
      //Logs the object with all of the information, simulating data being sent to the server
      console.log(responseObject);
      weddingOptions.innerHTML = weddingOptions.innerHTML =
        '<p id="thanks">Thanks for letting us know!</p>';
    }
  };
  //When you click the checkButton it will save what's been put in the input and run through the wedding list to check the names
  checkButton.addEventListener("click", handleCheckingName);
  rsvpWrapper.addEventListener("click", handleRSVP);
  submitButton.addEventListener("click", handleSubmit);
});
