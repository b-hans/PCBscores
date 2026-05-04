/**
 * Globals for the score document form
 */

const CDF_SHEET = SpreadsheetApp.getActive().getSheetByName('Score document form');
const CDF_DOCUMENTS = DriveApp.getFolderById('100mv4GUBNwLnRuGpxoK5x9IA1eeSVvV1'); // Documents

// GLOBALS FOR THE Part documents sheet
const CDF_PARTS_SHEET = SpreadsheetApp.getActive().getSheetByName("Part documents");
const CDF_PARTS_SHEET_NUM_MENU_ROWS = 1;

// DATA COLUMNS 
const CDF_PARTS_DOC_ID_COL = 0;
const CDF_PARTS_TITLE_ID_COL = 1;
const CDF_PARTS_PART_COL = 2;
const CDF_PARTS_URL_COL = 3;

const BLANK_IMAGE = DocumentApp.openById("1NLy2nz_BBGoCODldkg8bPaF2djgTM_NCZtEaWFFBsLY"); // Blanks Blank document

const CDF_ROW_HEIGHTS = [ 97, 21, 32, 21, 41, 21, 47, 21, 21, 21, 
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21 ];
const CDF_COLUMN_WIDTHS = [ 100, 100, 173, 32, 52, 100, 100, 166 ];

const CDF_FORM_TITLE_RANGE = "A1:H1";
const CDF_FORM_BODY_RANGE = "A2:H20";

const CDF_CURRENT_PARTS_TAG = "H3";
const CDF_CURRENT_PARTS_RANGE = "H4:H13";
const CDF_PARTS_FIRST_ROW = 4;
const CDF_PARTS_COLUMN = 8;

const CDF_ACTIONS_TAG = "B3";
const CDF_ACTIONS_CELL = "C3";
const CDF_ACTIONS_OPTIONS = [
    'Choose an action',
    'Make document',
    'Cancel'
];

const CDF_ACTIONS_RULE = SpreadsheetApp.newDataValidation()
    .requireValueInList(CDF_ACTIONS_OPTIONS)
    .setAllowInvalid(false)
    .build();

const CDF_TITLE_TAG = "B5";
const CDF_TITLE_CELL = "C5";

const CDF_ID_TAG = "E5";
const CDF_ID_CELL = "F5";

const CDF_PART_TAG = "B7";
const CDF_PART_CELL = "C7";

const CDF_SCORE_TYPES = getScoreTypes();
CDF_SCORE_TYPES.unshift('Select a score type');
const CDF_SCORES_RULE = SpreadsheetApp.newDataValidation()
    .requireValueInList(CDF_SCORE_TYPES)
    .setAllowInvalid(false)
    .build();

const CDF_STATUS_TAG_RANGE = "A9:A10";
const CDF_STATUS_RANGE = "B9:C19";
const CDF_BUTTON_RANGE = "E7:F13";

function inchesToPoints(inches) {
  if (typeof inches !== 'number') {
    throw new Error("Input must be a number.");
  }
  return inches * 72;
}

const HALF_INCH_IN_POINTS = inchesToPoints(0.5);

// DOCUMENT STYLES
const DOCUMENT_STYLE = {};
DOCUMENT_STYLE[DocumentApp.Attribute.MARGIN_TOP] = HALF_INCH_IN_POINTS;
DOCUMENT_STYLE[DocumentApp.Attribute.MARGIN_LEFT] = HALF_INCH_IN_POINTS;
DOCUMENT_STYLE[DocumentApp.Attribute.MARGIN_RIGHT] = HALF_INCH_IN_POINTS;
DOCUMENT_STYLE[DocumentApp.Attribute.MARGIN_BOTTOM] = HALF_INCH_IN_POINTS;

function applyCdfStyles ( range, type, value = null ) {

    switch ( type ) {

        case 'FORM_TITLE':
            range.setFontFamily('Caveat')
                .setFontSize(24)
                .setFontWeight('normal')
                .setFontStyle('normal')
                .setHorizontalAlignment('left')
                .setVerticalAlignment('middle')
                .setFontColor('#000000')
                .setValue(value);
            return true;

        case 'TAG':
            range.setFontFamily('Comic Sans MS')
                .setFontSize(12)
                .setFontWeight('bold')
                .setFontStyle('normal')
                .setHorizontalAlignment('right')
                .setVerticalAlignment('middle')
                .setFontColor('#000000')
                .setValue(value);
            return true;

        case 'DROPDOWN':
            range.setFontFamily('Arial')
                .setFontSize(10)
                .setFontWeight('normal')
                .setFontStyle('normal')
                .setHorizontalAlignment('center')
                .setVerticalAlignment('middle')
                .setFontColor('#000000')
                .setBackgroundColor('#ffffff')
                .setValue(value);
            return true;

        case 'INPUT':
            range.setFontFamily('Comic Sans MS')
                .setFontSize(12)
                .setFontWeight('bold')
                .setFontStyle('normal')
                .setHorizontalAlignment('center')
                .setVerticalAlignment('middle')
                .setFontColor('#000000')
                .setBackgroundColor('#ffffff')
                .setValue(value);
            return true;

        case 'TAG_STATUS':
            range.setFontFamily('Caveat')
                .setFontSize(14)
                .setFontWeight('bold')
                .setFontStyle('normal')
                .setFontColor('#000000')
                .setHorizontalAlignment('center')
                .setVerticalAlignment('middle')
                .setValue(value);
            return true;

        case 'STATUS':
            range.setFontFamily('Courier New')
                .setFontSize(12)
                .setFontWeight('bold')
                .setFontStyle('normal')
                .setFontColor('#660000')
                .setHorizontalAlignment('left')
                .setVerticalAlignment('top')
                .setValue(value);
            return true;

        default:
            break;
    }
}