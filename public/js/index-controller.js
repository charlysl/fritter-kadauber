var IndexController = function () {
  // Create the object that we will return.
  var that = Object.create(IndexController.prototype); 

  // Function to be called to render the navbar
  var navbarRenderer;

  // Function to be called to render the starting point
  var startingPointRenderer;

  // Input field to prompt for username
  var usernamePromptInput;

  // Function to be called when the username needs to be updated
  var usernameUpdater;

  // Function to be called when a freet is submitted
  var newFreetListener;

  // Function to be called in order to update the view
  var viewUpdater;

  // Error messages
  var errorMessages = [];
  // Form groups
  var formGroups = [];

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
    if (!errorMessages.includes(element_id)) {
      errorMessages.push(element_id);
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
   * Since we can't attach the username updater listener to the input when the DOM is
   * loaded because it's generated in index.js, we need to attach
   * it with this function.
   * 
   * @param {string} element_id - the ID of the element to attach the
   *   listener to
   */
  that.attachUsernameUpdaterListener = function(element_id) {
    usernamePromptInput = $("#" + element_id);
    usernamePromptInput.keypress(function (event) {
      // Check if Enter (ID 13) was pressed
      if (event.which === 13) {
        // Set the username
        usernameUpdater();
      }
    });
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
