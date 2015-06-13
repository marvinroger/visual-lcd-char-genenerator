var CHAR_COLS = 5;
var CHAR_ROWS = 8;
var SCREEN_COLS = 16;
var SCREEN_ROWS = 2;

// Generate screen

$(function() {
  for (var screen_row_i = 0; screen_row_i < SCREEN_ROWS; screen_row_i++) {
    $("#inner-screen").append('<div class="screen-row screen-row-' + screen_row_i + '"></div>');
    var screen_row = $("#inner-screen .screen-row-" + screen_row_i);
    for (var screen_col_i = 0; screen_col_i < SCREEN_COLS; screen_col_i++) {
      $(screen_row).append('<div class="screen-col screen-col-' + screen_col_i + '"></div>');
      var screen_col = $(screen_row).find(".screen-col-" + screen_col_i);
      
      for (var char_row_i = 0; char_row_i < CHAR_ROWS; char_row_i++) {
        $(screen_col).append('<div class="char-row char-row-' + char_row_i + '"></div>');
        var char_row = $(screen_col).find(".char-row-" + char_row_i);
        for (var char_col_i = 0; char_col_i < CHAR_COLS; char_col_i++) {
          $(char_row).append('<div class="char-col char-col-' + char_col_i + '"></div>');
        }   
      }
    }   
  }
});

// Functions

function write(arg_row, arg_col, arg_char) {
    for (var row_i = 0; row_i < arg_char.length; row_i++) {
      var row = arg_char[row_i];
      for (var bit_i = 0; bit_i < row.length; bit_i++) {
        if (row[bit_i] == 1) {
          $("#inner-screen .screen-row-" + arg_row + " .screen-col-" + arg_col + " .char-row-" + row_i + " .char-col-" + bit_i).addClass('active');
        } else {
          $("#inner-screen .screen-row-" + arg_row + " .screen-col-" + arg_col + " .char-row-" + row_i + " .char-col-" + bit_i).removeClass('active');

        }
      }
    }
  }

// Exports

window.lcd = {
  write: write
};