var settings = {
  box_border: 2,
  box_border_color: "#7fAC8C",
  box_border_error_color: "#ff425f",
  box_border_success_color: "#b8e3c4",
  box_color: "#679e76",
  box_hover_color: "#78AF87",
  box_void_color: "#313b33",
  box_padding: 10,
  box_width: 100,
  canvas_id: "puzzle",
  canvas_bg_color: "#5e8a6a",
  label_color: "#9edbaf",
  label_font: "12px Arial",
  game_size: 3,
  randomized: true,
};

var map_labels = [];

/**
 * Determines if void is adjacent to void box.
 */
let isAdjacentToVoid = function($pos) {
  let $void_delta, $voidx, $voidy, $x, $y;

  let findX = function($i) {
    let $x = parseInt(($i + 1) % settings.game_size);
    if ($x === 0) {
      $x = settings.game_size;
    }
    return $x;
  }

  let findY = function($i) {
    return (Math.ceil(($i + 1) / settings.game_size ) * settings.game_size) / settings.game_size;
  }

  // Let's find the void coordinates.
  $void_delta = map_labels.indexOf('v');
  $voidx = findX($void_delta);
  $voidy = findY($void_delta);

  // Let's determine if $pos is adjacent to void.
  $x = findX($pos);
  $y = findY($pos);

  if ($x == $voidx) {
    if (($y + 1 == $voidy) || ($y - 1 == $voidy)) {
      return true;
    }
  }
  if ($y == $voidy) {
    if (($x + 1 == $voidx) || ($x - 1 == $voidx)) {
      return true;
    }
  }
  return false;
}

/**
 * Determines if point is within box boundaries.
 */
let isPointWithinABox = function($x, $y, $box_x, $box_y) {
  if ($x >= $box_x && $x <= ($box_x + settings.box_width)) {
    if ($y >= $box_y && $y <= ($box_y + settings.box_width)) {
      return true;
    }
  }
  return false;
}

/**
 * Yields a single box data so it can be drawn.
 */
function *calculateBoxSettings($event = null) {
  let $box_qty = Math.pow(settings.game_size, 2);
  let $x = settings.box_border;
  let $y = settings.box_border;
  let $redraw = false;

  // Create the labels if not yet created.
  if (map_labels.length != $box_qty) {
    for (let $i = 1; $i < $box_qty; $i++) {
      map_labels.push($i);
    }

    // Add the void.
    map_labels.push("v");

    // Randomized if requested.
    if (settings.randomized) {
      map_labels.sort(() => Math.random() - 0.5);
    }
    map_labels = map_labels;
  }

  let $printed_count = 0;

  // Yield a box setting.
  for (let $i = 0; $i < $box_qty; $i++) {
    let $box_color = settings.box_color;
    let $box_border = settings.box_border_color;

    if ($event) {
      let $is_over_box = isPointWithinABox($event.layerX, $event.layerY, $x, $y);
      switch ($event.type) {
        case 'mousemove':
          if ($is_over_box) {
            $box_color = settings.box_hover_color;
          }
          break;

        case 'mousedown':       
          if ($is_over_box) {
            $box_color = settings.box_hover_color;
            $box_border = settings.box_border_error_color;
            if (isAdjacentToVoid($i)) {
              $box_border = settings.box_border_success_color;
            }
          }
          break;

        case 'mouseup':
          if ($is_over_box && isAdjacentToVoid($i)) {
            let $void_delta = map_labels.indexOf('v');
            map_labels[$void_delta] = map_labels[$i];
            map_labels[$i] = 'v';
            if ($void_delta < $i) {
              $i = -1;
              $redraw = true;
            }
          }
          break;
      }
    }
      
    let $config = {
      "l": map_labels[$i],
      "x": $x,
      "y": $y,
      "is_void" : map_labels[$i] === 'v',
      "c" : $box_color,
      "b" : $box_border,
      "r": $redraw
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
 * Draws all boxes.
 */
let draw = function ($event = null) {
  let $canvas = document.getElementById(settings.canvas_id);
  let $ctx = $canvas.getContext("2d");
  let $generator = calculateBoxSettings($event);
  while ($config = $generator.next().value) {
    // A box has requested to redraw.
    if ($config.r) {
      draw($event);
      break;
    }
    // Create the box.
    $ctx.beginPath();
    $ctx.lineWidth = settings.box_border;
    $ctx.strokeStyle = $config.is_void ? settings.box_void_color : $config.b;
    $ctx.fillStyle = $config.is_void ? settings.box_void_color : $config.c;
    $ctx.rect($config.x, $config.y, settings.box_width, settings.box_width);
    $ctx.fill();
    $ctx.stroke();

    if (!$config.is_void) {
      // Add the text.
      $ctx.font = settings.label_font; 
      $ctx.textAlign = "center";
      $ctx.fillStyle = settings.label_color;
      $ctx.fillText($config.l, parseInt($config.x + (settings.box_width / 2)), parseInt($config.y + (settings.box_width / 2)));
    }
  }
}

/**
 * Initializes canvas.
 */
let initCanvas = function () {
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
  draw();
  let $canvas = document.getElementById(settings.canvas_id);
  $canvas.addEventListener('mousemove', draw);
  $canvas.addEventListener('mouseout', draw);
  $canvas.addEventListener('mousedown', draw);
  $canvas.addEventListener('mouseup', draw);

  document.getElementById('restart').addEventListener('submit', function(event) {
    event.preventDefault();
    settings.game_size = parseInt(document.getElementById('mapsize').value);
    map_labels = [];
    initCanvas();
    draw();
  });
});
