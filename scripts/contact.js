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
  //Pushing form inputs into an array to handle later
  formArray.push(songChoice, mealSelector, comments);

  //Event handlers
  const handleClearInput = () => {
    //Deletes the error message if there is one and removes the variable so it isn't stored
    noInvite.style.display = "none";
    guestName = null;
    checkButton.classList.remove("button-toggled");
  };

  //Checks to see if the guest is on the wedding list
  const handleCheckingName = () => {
    //Gets the value of what is inputted in the text field
    let guestName = guestNameInput.value.toLowerCase().trim();
    //Makes the input empty
    guestNameInput.value = "";
    //Goes through wedding list
    for (let i = 0; i < weddingList.length; i++) {
      if (guestName === weddingList[i].name) {
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

  //Check to see if any fields are missing
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const editErrorStyle = (item) => {
      //adds a red border around the input field that is missing
      if (!item.value) {
        item.classList.add("missing");
      } else {
        //removes the border if it was missing, but now it isn't, but now another field is still missing
        item.classList.remove("missing");
      }
    };
    if (!responseObject.rsvp) {
      //so the form doesn't submit if they haven't pressed yes or no
      errorMessage.style.display = "block";
    } else if (responseObject.rsvp === "yes") {
      //So it doesn't provide an error if someone is saying no
      if (!mealSelector.value || !comments.value || !songChoice.value) {
        errorMessage.style.display = "block";
        for (let i = 0; i < formArray.length; i++) {
          editErrorStyle(formArray[i]);
        }
      } else {
        responseObject.meal = mealSelector.value;
        responseObject.song = songChoice.value;
        responseObject.comments = comments.value;
        //Logs the object with all of the information, simulating data being sent to the server
        console.log(responseObject);
        weddingOptions.innerHTML = weddingOptions.innerHTML =
          '<p id="thanks">Thanks for letting us know!</p>';
      }
    } else {
      console.log(responseObject);
      weddingOptions.innerHTML = weddingOptions.innerHTML =
        '<p id="thanks">Thanks for letting us know!</p>';
    }
  };

  //Handlers for the class change
  const handleEnterPress = (button) => {
    button.classList.add("active");
  };

  const handleEnterUp = (button) => {
    button.classList.remove("active");
  };

  //When you click the checkButton it will save what's been put in the input and run through the wedding list to check the names
  checkButton.addEventListener("click", handleCheckingName);
  //Checks name when someone hits enter instead of clicking the button
  nameWrapper.addEventListener("keydown", (ev) => {
    if (ev.keyCode === 13) {
      handleEnterPress(checkButton);
      handleCheckingName();
    }
  });
  nameWrapper.addEventListener("keyup", (ev) => {
    if (ev.keyCode === 13) {
      handleEnterUp(checkButton);
    }
  });

  rsvpWrapper.addEventListener("click", handleRSVP);
  submitButton.addEventListener("click", handleSubmit);
  //Submit button
  submitButton.addEventListener("keydown", (ev) => {
    if (ev.keyCode === 13) {
      handleEnterPress(submitButton);
      handleSubmit();
    }
  });
  submitButton.addEventListener("keyup", (ev) => {
    if (ev.keyCode === 13) {
      handleEnterUp(submitButton);
    }
  });
});
