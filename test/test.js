var assert = require("assert");

/////////////////////////
// Note from Meghana: Use supertest agent
// Agent connects to the server and makes requests for you
/////////////////////////

// Array is the module under test.
describe('Array', function() {
  // indexOf is the method under test.
  describe('#indexOf()', function () {
    
    // This is a test, we indicate what we're testing for.
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });


    // Another test.
    it('should find values that exist', function() {
      assert.equal(0, [1, 2, 3].indexOf(1));
      assert.equal(2, [1, 2, 3].indexOf(3));
    });

  }); // End describe indexOf.

  // map is the method under test.
  describe('#map', function() {
    
    // This is a test.
    it('should map values given a function', function() {
      assert.deepEqual([2, 4, 6], [1, 2, 3].map(function(x) { return 2 * x; }));
    });


    // Another test.
    it('should work on empty arrays', function() {
      assert.deepEqual([], [].map(function(x) { return 2 * x; }));
    });

  }); // End describe map.

}); // End describe Array.
