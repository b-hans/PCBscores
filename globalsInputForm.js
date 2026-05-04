const TITLE_SHEET = SpreadsheetApp.getActive().getSheetByName('Input');

const INPUT_STATUS_RANGE = "A1:E1";
const INPUT_STATUS_ROW = 1;

const INPUT_MAIN_FORM_RANGE = "A2:E30";
const INPUT_BUTTON_RANGE = "D7:E23";

// INPUTS
const INPUT_TITLE_TAG_CELL = "A7";
const INPUT_TITLE_CELL = "B7";
const INPUT_TITLE_ROW_NUM = 7;

const ID_MENU_ROW_NUM = 5;
const INPUT_ID_TAG_CELL = "A5";
const INPUT_ID_CELL = "B5";
const MENU_RANGE = "D5:E5";

const TYPE_ROW_NUM = 9;
const INPUT_TYPE_CELL = "B9";
const INPUT_TYPE_TAG_CELL = "A9";

const INPUT_2BY_ROW_NUM = 11;
const INPUT_2BY_NUMBER = "B11"
const INPUT_2BY_NUMBER_TAG = "A11";

// harold inputs
const INPUT_COMPOSER_LAST_TAG = "A13";
const INPUT_COMPOSER_LAST_CELL = "B13";

const INPUT_COMPOSER_FIRST_TAG = "A15";
const INPUT_COMPOSER_FIRST_CELL = "B15";

const INPUT_ARR_LAST_TAG = "A17";
const INPUT_ARR_LAST_CELL = "B17";

const INPUT_ARR_FIRST_TAG = "A19";
const INPUT_ARR_FIRST_CELL = "B19";

const INPUT_LENGTH_TAG = "A21";
const INPUT_LENGTH_CELL = "B21";

const INPUT_TEMPO_TAG = "A23";
const INPUT_TEMPO_CELL = "B23";

const INPUT_DATE_TAG = "A25";
const INPUT_DATE_CELL = "B25";



const INPUT_NOTES_ROW_NUM = 27;
const INPUT_NOTES_CELL = "B27";
const INPUT_NOTES_RANGE = "B27:B29";
const INPUT_NOTES_TAG_CELL = "A27";

const INPUT_SCORE_TYPE_TAG = "A3";
const INPUT_SCORE_TYPE = "B3";

const TITLE_STATUS_CELL = "A1";
const TITLE_MENU_CELL = "D5";

const SEARCH_RESULTS_START = "F6";
const SEARCH_RESULTS_ID_COL = 7;
const SEARCH_NUM_ROWS = 19;

const SCORE_TYPE_ROW = 3;

// start 1
const SEARCH_TITLE_COL = 6;
const SEARCH_ID_COL = 7;
const SEARCH_ACTIONS_COL = 8;
const SEARCH_RESULTS_ROW_START = 6;
const SEARCH_NUM_COLS = 3;

const SEARCH_TITLE_CELL = "F5";
const SEARCH_ID_CELL = "G5";
const SEARCH_ACTIONS_CELL = "H5";

const SCORES_DRIVE_ID = "1EBRH-1oO3W_JfP6Zh8KocUTiRNuekKRV"; //ScoresPCB

const SCORES_ID_COL = 0;
const SCORES_TITLE_ID_COL = 1;
const SCORES_URL_COL = 2;
const SCORES_TYPE_COL = 3;
const SCORE_PAGES_COL = 4;

const SCORES_COL_NUM = 5;
const SCORES_MENU_ROWS = 1;

const SEARCH_SCORES_TITLE_CELL = "F4";
const SEARCH_SCORES_NAME_CELL = "F5";
const SEARCH_FILL_COLOR = "#faf4c6";

const TITLE_SEARCH_DATA = TITLE_SHEET
    .getRange(SEARCH_RESULTS_ROW_START, SEARCH_TITLE_COL, SEARCH_NUM_ROWS, SEARCH_NUM_COLS);

// sheet - ie start 1 not 0
const TYPES_FIRST_ROW = 2;
const TYPES_COL_NUM = 1;

const SEARCH_TITLE_RANGE = "F4:H4";
const SEARCH_HEADING_RANGE = "F5:H5";
const SEARCH_BODY_RANGE = "F6:H30";

const NUM_PAGES_TAG_RANGE = "D3";
const NUM_PAGES_RANGE = "E3";

// function for text styles for tags
function applyTagStyles ( range, value = null ) {
    range.setFontFamily('Caveat');
    range.setFontSize(17);
    range.setFontWeight('normal');
    range.setFontStyle('normal');
    range.setFontColor('#000000');
    range.setHorizontalAlignment('center');
    range.setVerticalAlignment('middle');
    range.setValue(value);
}

function applyNormalStyles ( range, value = null ) {
    range.setFontFamily('Arial');
    range.setFontSize(10)
        .setFontWeight('normal')
        .setFontStyle('normal')
        .setFontColor('#000000')
        .setHorizontalAlignment('left')
        .setVerticalAlignment('top')
        .setValue(value);
}

function applyInputStyles ( range, value = null ) {
    range.setFontFamily('Arial');
    range.setFontSize(10)
        .setFontWeight('normal')
        .setFontStyle('normal')
        .setFontColor('#000000')
        .setHorizontalAlignment('center')
        .setVerticalAlignment('middle')
        .setBackgroundColor('#ffffff')
        .setValue(value);
}



