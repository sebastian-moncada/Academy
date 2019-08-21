function* paperFold() {
  $delta = 0;
  $nums = [1];
  while (true) {
    if (typeof $nums[$delta] == 'undefined') {
      $n = [];
      $nums.forEach(function($v, $i) {
        $n.push(($i % 2) ? 0 : 1);
        $n.push($v);
      });
      $n.push(0);
      $nums = [...$n];
    }
    yield $nums[$delta++];
  }
}
