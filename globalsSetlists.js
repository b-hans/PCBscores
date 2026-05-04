const SETLISTS_SHEET = SpreadsheetApp.getActive().getSheetByName("Setlists");
const SETLISTS_FORM =  SpreadsheetApp.getActive().getSheetByName("Setlist input");
const SETLISTS_DOCUMENTS = SpreadsheetApp.getActive().getSheetByName("Setlist pdfs");

const SETLISTS_FOLDER_ID = "1NodfjzNQgq_1gdvadYuV73zdeI27Pqk3"; // Setlists folder
const SETLISTS_FOLDER = DriveApp.getFolderById(SETLISTS_FOLDER_ID);

// start 1
const SETLISTS_MENU_ROWS = 1;
const SETLISTS_NUM_COLS = 4;
const SETLISTS_FIRST_ROW = 2;

// start 0
const SETLISTS_NAME_COL = 0;
const SETLISTS_ID_COL = 1;
const SETLISTS_PART_COL = 3;
const SETLISTS_TITLES_COL = 2;
const SETLISTS_ACTION_COL = 4;

// documents
const SETLIST_DOCS_MENU_ROWS = 1;
