const SETLIST_FORM_SHEET = SpreadsheetApp.getActive()
    .getSheetByName("Setlist input");

// Form
const SETLIST_FORM_NAME_CELL = "C3";
const SETLIST_FORM_NAME_TAG_CELL = "B3";

const SETLIST_FORM_ID_CELL = "E3";
const SETLIST_FORM_ID_TAG_CELL = "D3";

const SETLIST_FORM_STATUS_CELL = "B1";
const SETLIST_FORM_STATUS_TAG_CELL = "A1";
const SETLIST_FORM_STATUS_RANGE = "B1:F1";

const SETLIST_FORM_PARTS_TAG_RANGE = "G4:H4";
const SETLIST_FORM_CREATE_PARTS_TAG_CELL = "A5";

const SETLIST_FORM_ACTIONS_RANGE = "G1:H1";

// cell for dropdown
const SETLIST_FORM_CREATE_PART = "B5";

const SETLIST_PARTS_CELL = "G5";

const SETLIST_FORM_UPPER_MENU_RANGE = "A2:F4";

const SETLIST_FORM_PARTS_BUTTON_RANGE = "C5:D5";
const SETLIST_FORM_BUTTON_RANGE = "E5:F5";
const SETLIST_FORM_PARTS_RANGE = "G5:H5";

const SETLIST_FORM_TITLES_HEADER_RANGE = "A6:F6";
const SETLIST_FORM_HEADER_ROW_RANGE = "A7:F7";
const SETLIST_FORM_HEADER_ROW = 7;


const SETLIST_FORM_NUM_MENU_ROWS = 7;
const SETLIST_FORM_START_ROW = 8;
const SETLIST_FORM_NUM_COLS = 4;
const SETLIST_FORM_TITLE_COL = 1;
const SETLIST_FORM_ACTION_COL = 2;
const SETLIST_FORM_ID_COL = 3;
const SETLIST_FORM_PARTS_COL = 4;

// print section
const SETLIST_PRINT_TITLE_RANGE = "I4:J4";
const SETLIST_PRINT_TITLE_CELL = "I4";

const SETLIST_PRINT_RANGE = "I5:J5";
const SETLIST_PRINT_CELL = "I5";

function applyStatusStyles ( range, value = null ) {
    range.setFontFamily('Courier New')
        .setFontSize(15)
        .setFontWeight('bold')
        .setFontStyle('normal')
        .setFontColor('#660001')
        .setHorizontalAlignment('left')
        .setVerticalAlignment('middle')
        .setValue(value);
}


//Document styles

const SETLIST_BODY = {};
SETLIST_BODY[DocumentApp.Attribute.MARGIN_BOTTOM] = inchesToPoints(0.5);
SETLIST_BODY[DocumentApp.Attribute.MARGIN_TOP] = inchesToPoints(0.5);
SETLIST_BODY[DocumentApp.Attribute.MARGIN_LEFT] = inchesToPoints(0.5);
SETLIST_BODY[DocumentApp.Attribute.MARGIN_RIGHT] = inchesToPoints(0.5);

const SETLIST_TITLE = {};
SETLIST_TITLE[DocumentApp.Attribute.FONT_FAMILY] = 'Slackside One';
SETLIST_TITLE[DocumentApp.Attribute.FONT_SIZE] = 24;
SETLIST_TITLE[DocumentApp.Attribute.SPACING_AFTER] = inchesToPoints(0.1);

const SETLIST_PARAGRAPH = {};
// SETLIST_PARAGRAPGH[DocumentApp.Attribute.LINE_SPACING] = 1.5;
SETLIST_PARAGRAPH[DocumentApp.Attribute.FONT_FAMILY] = "Outfit";
SETLIST_PARAGRAPH[DocumentApp.Attribute.FONT_SIZE] = 12;
// SETLIST_PARAGRAPGH[DocumentApp.Attribute.SPACING_AFTER] = 0;

const SETLIST_PAGE = {};
SETLIST_PAGE[DocumentApp.Attribute.FONT_FAMILY] = "Outfit";
SETLIST_PAGE[DocumentApp.Attribute.FONT_SIZE] = 12;
SETLIST_PAGE[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = "right";


const SETLIST_TABLE = {};
SETLIST_TABLE[DocumentApp.Attribute.BORDER_WIDTH] = 0;
SETLIST_TABLE[DocumentApp.Attribute.FONT_FAMILY] = "Outfit";
SETLIST_TABLE[DocumentApp.Attribute.FONT_SIZE] = 12;

const SETLIST_SUBTITLE = {};
SETLIST_SUBTITLE[DocumentApp.Attribute.FONT_FAMILY] = 'Permanent Marker';
SETLIST_SUBTITLE[DocumentApp.Attribute.FONT_SIZE] = 20;

// Setlist documents sheet
const SETLIST_DOCUMENTS_SHEET = SpreadsheetApp.getActive()
    .getSheetByName("Setlist documents");
const SETLIST_DOCUMENTS_SHEET_MENU_ROWS = 1;

// data column indexes
const SDS_ID_COL = 0;
const SDS_SETLIST_ID_COL = 1;
const SDS_GDOC_NAME_COL = 2;
const SDS_PART_NAME_COL = 3;
const SDS_URL_COL = 4;
const SDS_GOOGLE_ID_COL = 5;

const SDS_DATA_COLS_NUM = 6;


