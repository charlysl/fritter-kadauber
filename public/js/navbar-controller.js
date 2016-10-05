
var NavbarController = function () {
  // Create the object that we will return.
  var that = Object.create(NavbarController.prototype); 

  // Button to use to set username
  var usernameSetButton;

  // Input field to set username
  var usernameSetInput;

  // Function to be called when the username needs to be updated
  var usernameUpdater;

  // Function to be called in order to update the view
  var viewUpdater;

  /**
   * Registers a function that will update the view.
   *
   * @param {Function} listener - The function to be called. Function
   *   must accept no arguments.
   */
  that.registerViewUpdater = function(updater) {
    console.log("registered navbar view updater");
    viewUpdater = updater;
  }

  /**
   * Updates the view by calling the registered updater.
   */
  that.updateNavbarView = function() {
    console.log("called navbar view updater");
    viewUpdater();
  }

  /**
   * Registers a function that will update the username.
   *
   * @param {Function} listener - The function to be called. Function
   *   must accept no arguments.
   */
  that.registerUsernameUpdater = function(updater) {
    console.log("registered username updater");
    usernameUpdater = updater;
  }

  /**
   * Updates the username by calling the registered updater.
   */
  that.updateUsername = function() {
    usernameUpdater();
  }

  /**
   * Since we can't attach button username updater listeners until
   * we finish generating the DOM in index.js, we have to attach
   * them here.
   * 
   * @param {string} element_id - the ID of the element to attach the
   *   listener to
   */
  that.attachUsernameUpdaterListener = function(element_id) {
    console.log("attaching to", element_id);
    var element = $("#" + element_id);
    if (element.is("input")) {
      element.keypress(function (event) {
        if (event.which === 13) {
          // Set the username
          usernameUpdater();
        }
      })
    } else if (element.is("button")) {
      element.click(usernameUpdater);
    }
  }

  // // Grab handles to the HTML nodes when the page loads.
  // var onLoad = function() {
  //   usernameSetButton = $("#set-username-btn");
  //   usernameSetButton.on("click", function () {
  //     usernameUpdater();
  //   });
  //   usernameSetInput = $("#username-input");
  //   usernameSetInput.keypress(function (event) {
  //     // Check if Enter (ID 13) was pressed
  //     if (event.which === 13) {
  //       // Set the username
  //       usernameUpdater();
  //     }
  //   });
  // }

  // if (document.readyState != 'loading'){
  //   onLoad();
  // } else {
  //   document.addEventListener('DOMContentLoaded', onLoad);
  // }
  
  // Freeze object to prevent modification.
  Object.freeze(that);

  return that;
}