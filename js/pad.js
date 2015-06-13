var COLS = 5;
var ROWS = 8;

var state = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

// Generate pad

$(function() {
  
  writeCode();
  
  for (var row_i = 0; row_i < ROWS; row_i++) {
    $("#pad").append('<div class="pad-row pad-row-' + row_i + '"></div>');
    var row = $("#pad .pad-row-" + row_i);
    for (var col_i = 0; col_i < COLS; col_i++) {
      $(row).append('<div data-row="' + row_i + '" data-col="' + col_i + '" class="pad-col pad-col-' + col_i + '"></div>');
    }   
  }
  
  // Handle events

  $(".pad-reset").on("click", function() {
    state = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
    
    lcd.write(0, 0, state);
    $(".pad-col").removeClass("active");
    writeCode();
    
    return false;
  });
  
  
  $(".pad-col").on("click", function(e) {
    var new_state;
    
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      new_state = 0;
    } else {
      $(this).addClass("active");
      new_state = 1;
    }
    
    var col_i = $(this).attr("data-col");
    var row_i = $(this).attr("data-row");
    
    state[row_i][col_i] = new_state; // Strings are immutable
    lcd.write(0, 0, state);
    writeCode();
  });
});

function writeCode() {
  var code = "#include <LiquidCrystal.h>\n\n";
  code += "// initialize the library\n";
  code += "LiquidCrystal lcd(12, 11, 5, 4, 3, 2);\n\n";
  code += "byte customChar[8] = {\n    0b";
  
  for (var row_i = 0; row_i < ROWS; row_i++) {
    for (var col_i = 0; col_i < COLS; col_i++) {
      code += state[row_i][col_i];
    }
    if (row_i != ROWS - 1) {
      code += ",\n    0b"
    }
  }
  
  code += "\n};\n\n";
  code += "void setup()\n{";
  code += "    // create a new custom character\n";
  code += "    lcd.createChar(0, customChar);\n\n";
  code += "    // set up number of columns and rows\n";
  code += "    lcd.begin(16, 2);\n\n";
  code += "    // print the custom char to the lcd\n";
  code += "    lcd.write((uint8_t)0);\n";
  code += "    // why typecast? see: http://arduino.cc/forum/index.php?topic=74666.0\n}\n\n";

  code += "void loop()\n{\n}";
  $("textarea").text(code);
}