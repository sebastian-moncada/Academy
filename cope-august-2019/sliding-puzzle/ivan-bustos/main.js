var settings = {
  box_border: 2,
  box_border_color: "#7fAC8C",
  box_color: "#679e76",
  box_void_color: "#313b33",
  box_padding: 10,
  box_width: 100,
  canvas_id: "puzzle",
  canvas_bg_color: "#5e8a6a",
  label_color: "#9edbaf",
  label_font: "12px Arial",
  game_size: 3,
  randomized: true
};

/**
 * Yields a box setting so it can be drawn.
 */
function *calculateBoxSettings($randomized = false) {
  let $box_qty = Math.pow(settings.game_size, 2);
  let $x = settings.box_border;
  let $y = settings.box_border;
  let $labels = [];

  // Create the labels.
  for ($i = 1; $i < $box_qty; $i++) {
    $labels.push($i);
  }

  // Add the void.
  $labels.push("v");

  // Randomized if requested.
  if ($randomized) {
    $labels.sort(() => Math.random() - 0.5);
  }

  $printed_count = 0;

  // Yield a box setting.
  for ($i = 0; $i < $box_qty; $i++) {
    $config = {
      "l": $labels[$i],
      "x": $x,
      "y": $y,
      "is_void": $labels[$i] === "v"
    }
    yield $config;

    $printed_count++;
    if ($printed_count % settings.game_size === 0) {
      // The coordinates must reset.
      $x = settings.box_border;
      let $vertical_boxes = parseInt(($printed_count + 1) / settings.game_size);
      let $vertical_border = ($vertical_boxes * 2 + 1) * settings.box_border;
      let $vertical_padding = $vertical_boxes * settings.box_padding;
      $y = $vertical_boxes * settings.box_width + $vertical_border + $vertical_padding;
      continue;
    }

    // Only the X coordinate changes.
    let $horizontal_boxes = parseInt($printed_count % settings.game_size);
    if ($horizontal_boxes === 0) {
      $horizontal_boxes = settings.game_size;
    }
    let $horizontal_border = ($horizontal_boxes * 2 + 1) * settings.box_border;
    let $horizontal_padding = $horizontal_boxes * settings.box_padding;
    $x = $horizontal_boxes * settings.box_width + $horizontal_border + $horizontal_padding;
  }
}

/**
 * Draws boxes.
 */
function drawBoxes() {
  let $canvas = document.getElementById(settings.canvas_id);
  let $ctx = $canvas.getContext("2d");
  let $generator = calculateBoxSettings(settings.randomized);
  while ($config = $generator.next().value) {
    // Create the box.
    $ctx.beginPath();
    $ctx.lineWidth = settings.box_border;
    $ctx.strokeStyle = $config.is_void ? settings.box_void_color : settings.box_border_color;
    $ctx.fillStyle = $config.is_void ? settings.box_void_color : settings.box_color;
    $ctx.rect($config.x, $config.y, settings.box_width, settings.box_width);
    $ctx.fill();
    $ctx.stroke();

    if (!$config.is_void) {
      // Add the text.
      $ctx.font = "12px Arial"; 
      $ctx.textAlign = "center";
      $ctx.fillStyle = settings.label_color;
      //console.log(parseInt($config.x + (settings.box_width / 2)));
      //console.log(parseInt($config.y + (settings.box_width / 2)));
      $ctx.fillText($config.l, parseInt($config.x + (settings.box_width / 2)), parseInt($config.y + (settings.box_width / 2)));
    }
  }
}

/**
 * Initializes canvas.
 */
function initCanvas() {
  let $canvas = document.getElementById(settings.canvas_id);
  let $base = settings.box_width * settings.game_size;
  let $border = settings.game_size * 2 * settings.box_border;
  let $padding = (settings.game_size - 1) * settings.box_padding;
  let $ctx = $canvas.getContext("2d");

  // Set canvas width.
  $canvas.style.width = ($base  + $border + $padding) + "px";
  $canvas.width = $base  + $border + $padding;
  // Set canvas height.
  $canvas.style.height = $canvas.style.width;
  $canvas.height = $canvas.width;
  // Set canvas background.
  $ctx.fillStyle = settings.canvas_bg_color;
  $ctx.fillRect(0, 0, $canvas.width, $canvas.height);
}

/**
 * Will run on ready.
 */
document.addEventListener("DOMContentLoaded", function() {
  initCanvas();
  drawBoxes();
});
