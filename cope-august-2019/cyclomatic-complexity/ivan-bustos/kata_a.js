function predictAge() {
  var $ages = Array.prototype.slice.call(arguments);

  // Multiply each by self.
  $ages = $ages.map(function($value) {
    return Math.pow($value, 2);
  });

  // Add them together.
  $ages = $ages.reduce(function(a, b) {
    return a + b;
  }, 0);

  return parseInt(Math.sqrt($ages) / 2);
}
