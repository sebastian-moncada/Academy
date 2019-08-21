function unluckyDays($year){
  var $d = new Date();
  $process = true;
  $unluckyDays = 0;

  // Set date to first day of January.
  $d.setFullYear($year, 0, 1);

  // Iterative process.
  while ($process) {

    // Add to unlucky days count.
    if ($d.getDay() == 5 && $d.getDate() == 13) {
      $unluckyDays++;
    }

    // Stop if year is over.
    if ($d.getDate() == 31 && $d.getMonth() == 11) {
      $process = false;
    }

    // Add another day.
    $d.setDate($d.getDate() + 1);

  }
  
  return $unluckyDays;
}
