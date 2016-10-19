var NavbarController = function () {
  // Create the object that we will return.
  var that = Object.create(NavbarController.prototype); 

  // // Button to use to set username
  // var usernameSetButton;

  // // Input field to set username
  // var usernameSetInput;

  // Function to be called when an account needs to be registered
  var usernameUpdater;

  // Function to be called when input formatting needs to be reset
  var inputFormatResetter;

  // Function to be called in order to update the view
  var viewUpdater;

  // Error messages
  var errorMessages = [];
  // Form groups
  var formGroups = [];

  /**
   * Registers a function that will reset the input boxes' format
   *
   * @param {Function} listener - The function to be called. Function
   *   must accept no arguments.
   */
  that.registerInputFormatResetter = function(resetter) {
    inputFormatResetter = resetter;
  }

  /**
   * Resets the input boxes' format by calling the registered resetter.
   */
  that.resetInputFormat = function() {
    inputFormatResetter();
  }

  /**
   * Attach input formatter to when some input or button element is typed in
   * or clicked on.
   * 
   * @param {string} element_id - the ID of the element to attach the
   *   listener to
   */
  that.attachInputFormatResetterListener = function(element_id) {
    var element = $("#" + element_id);
    if (element.is("input")) {
      element.click(inputFormatResetter);
      element.keypress(inputFormatResetter);
    } else if (element.is("button")) {
      element.click(inputFormatResetter);
    }
  }

  /**
   * Registers a function that will update the view.
   *
   * @param {Function} listener - The function to be called. Function
   *   must accept no arguments.
   */
  that.registerViewUpdater = function(updater) {
    viewUpdater = updater;
  }

  /**
   * Updates the view by calling the registered updater.
   */
  that.updateNavbarView = function() {
    viewUpdater();
  }

  /**
   * Registers a function that will update the username.
   *
   * @param {Function} listener - The function to be called. Function
   *   must accept no arguments.
   */
  that.registerUsernameUpdater = function(updater) {
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

  /**
   * Identify an element as an error message and remember it if we don't
   * already remember it
   * 
   * @param {string} element_id - the ID of the element to attach the
   *   listener to
   */
  that.identifyErrorMessage = function(element_id) {
    if (!errorMessages.includes(element_id)) {
      errorMessages.push(element_id);
    }
  }

  /**
   * Identify an element as a form group
   * 
   * @param {string} element_id - the ID of the element to attach the
   *   listener to
   */
  that.identifyFormGroup = function(element_id) {
    if (!formGroups.includes(element_id)) {
      formGroups.push(element_id);
    }
  }

  /**
   * Get all the error messages of the page as jQuery objects
   */
  that.getErrorMessages = function() {
    return errorMessages.map(function (element_id) { return $('#' + element_id); });
  }

  /**
   * Get all the form groups of the page
   */
  that.getFormGroups = function() {
    return formGroups.map(function (element_id) { return $('#' + element_id); });
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
