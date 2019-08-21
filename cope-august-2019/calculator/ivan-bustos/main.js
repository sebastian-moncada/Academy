document.addEventListener("DOMContentLoaded", function() {
  
  var expressionTag;
  expressionTag = document.getElementsByClassName('expression')[0];

  var instructionsTag;
  instructionsTag = document.getElementsByClassName('instructions')[0];

  // Avoid line breaks in expression.
  expressionTag.addEventListener('keypress', function (event) {
    if (event.which === 13) {
      event.preventDefault();
    }
  });

  // Do calculations.
  var regex = /^[\s\d\+\-\/\*]*?\d$/g;
  expressionTag.addEventListener('keyup', function (event) {
    if (regex.test(this.innerHTML)) {
      document.getElementsByClassName('result')[0].innerHTML = eval(this.innerHTML);
      instructionsTag.innerHTML = '';
      return;
    }
    instructionsTag.innerHTML = 'Incorrect expression.';
    return;
  });
});
