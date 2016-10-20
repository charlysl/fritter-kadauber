var IndexController = function () {
  // Create the object that we will return.
  var that = Object.create(IndexController.prototype); 

  // Function to be called to render the navbar
  var navbarRenderer;

  // Function to be called to render the starting point
  var startingPointRenderer;

  // Function to be called to render the freets
  var freetRenderer;

  // Input field to prompt for username
  var usernamePromptInput;

  // Function to be called when input formatting needs to be reset
  var inputFormatResetter;

  // Function to be called when the username needs to be updated
  var usernameUpdater;

  // Function to be called when the user logs in
  var loginListener;

  // Function to be called when the user logs out
  var logoutListener;

  // Function to be called when a freet is submitted
  var newFreetListener;

  // Function to be called in order to update the view
  var viewUpdater;

  // Error messages
  var errorMessages = [];
  // Form groups
  var formGroups = [];

  /**
   * Registers a function that will be called when the user tries to log in
   *
   * @param {Function} listener - The function to be called. Function
   *   must accept no arguments.
   */
  that.registerLogoutListener = function(listener) {
    logoutListener = listener;
  }

  /**
   * Attach a login listener to an element that should trigger a login attempt
   * 
   * @param {string} element_id - the ID of the element to attach the
   *   listener to
   */
  that.attachLogoutListener = function(element_id) {
    var element = $("#" + element_id);
    element.click(logoutListener);
  }

  /**
   * Registers a function that will be called when the user tries to log in
   *
   * @param {Function} listener - The function to be called. Function
   *   must accept no arguments.
   */
  that.registerLoginListener = function(listener) {
    loginListener = listener;
  }

  /**
   * Attach a login listener to an element that should trigger a login attempt
   * 
   * @param {string} element_id - the ID of the element to attach the
   *   listener to
   */
  that.attachLoginListener = function(element_id) {
    var element = $("#" + element_id);
    if (element.is("input")) {
      element.keypress(function (event) {
        // If the user hit enter (id 13)
        if (event.which === 13) {
          // Log the user in
          loginListener();
        }
      });
    } else if (element.is("button")) {
      element.click(loginListener);
    }
  }

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
  that.updateIndexView = function() {
    viewUpdater();
  }



  /**
   * Registers a function that will take care of new freets.
   *
   * @param {Function} listener - The function to be called. Function
   *   must accept a Freet as an argument.
   */
  that.registerNewFreetListener = function(listener) {
    newFreetListener = listener;
  }

  /**
   * Since we can't attach the freet listener to the input when the DOM is
   * loaded because it's generated in index.js, we need to attach
   * it with this function.
   * 
   * @param {string} element_id - the ID of the element to attach the
   *   listener to
   */
  that.attachNewFreetListener = function(element_id) {
    var freetInput = $("#" + element_id);
    freetInput.keypress(function (event) {
      // Check if Enter (ID 13) was pressed
      if (event.which === 13) {
        // Set the username
        newFreetListener(freetInput.val());
      }
    });
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
   * Get all the error messages of the page
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

  /**
   * Saves the freet by calling the registered listener.
   */
  that.saveFreet = function() {
    newFreetListener();
  }

  /**
   * Registers a function that will render the navbar.
   *
   * @param {Function} listener - The function to be called. Function
   *   must accept no arguments.
   */
  that.registerNavbarRenderer = function(renderer) {
    navbarRenderer = renderer;
  }

  /**
   * Renders the navbar by calling the registered renderer.
   */
  that.renderNavbar = function() {
    navbarRenderer();
  }

  /**
   * Registers a function that will render the starting point.
   *
   * @param {Function} listener - The function to be called. Function
   *   must accept no arguments.
   */
  that.registerStartingPointRenderer = function(renderer) {
    startingPointRenderer = renderer;
  }

  /**
   * Renders the starting point by calling the registered renderer.
   */
  that.renderStartingPoint = function() {
    startingPointRenderer();
  }

  /**
   * Registers a function that will render the starting point.
   *
   * @param {Function} listener - The function to be called. Function
   *   must accept no arguments.
   */
  that.registerFreetRenderer = function(renderer) {
    freetRenderer = renderer;
  }

  /**
   * Renders the starting point by calling the registered renderer.
   */
  that.renderFreets = function() {
    freetRenderer();
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
   * Since we can't attach the username updater listener to the input when the DOM is
   * loaded because it's generated in index.js, we need to attach
   * it with this function.
   * 
   * @param {string} element_id - the ID of the element to attach the
   *   listener to
   */
  that.attachUsernameUpdaterListener = function(element_id) {
    element = $("#" + element_id);
    if (element.is("input")) {
      element.keypress(function (event) {
        if (event.which === 13) {
          // Set the username
          usernameUpdater();
        }
      });
    } else if (element.is("button")) {
      element.click(usernameUpdater);
    }
  }

  // Grab handles to the HTML nodes when the page loads and
  // // finish building the page.
  // var onLoad = function() {
    
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
