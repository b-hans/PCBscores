const LISTS_FOLDER_ID = "18M5KV0vMBJ31qS_EvDiv_pOz5jDxxqMq";
const LISTS_FOLDER = DriveApp.getFolderById(LISTS_FOLDER_ID);

const LIST_ALPHA_NAME = "2by2bas Title List";
const LIST_NUM_NAME = "2by2bas List by number";
const LIST_TYPE_NAME = "2by2bas List by type";

const LIST_TABLE_HEADINGS = [
    'Title',
    'Number',
    'Notes',
    'Scores'
];

const STYLE_BODY = {};
STYLE_BODY[DocumentApp.Attribute.MARGIN_BOTTOM] = 36;
STYLE_BODY[DocumentApp.Attribute.MARGIN_TOP] = 36;
STYLE_BODY[DocumentApp.Attribute.MARGIN_LEFT] = 36;
STYLE_BODY[DocumentApp.Attribute.MARGIN_RIGHT] = 36;

const STYLE_TITLE = {};
STYLE_TITLE[DocumentApp.Attribute.FONT_FAMILY] = 'Bagel Fat One';
STYLE_TITLE[DocumentApp.Attribute.FONT_SIZE] = 40;

const STYLE_TABLE = {};
STYLE_TABLE[DocumentApp.Attribute.BORDER_WIDTH] = 0;
STYLE_TABLE[DocumentApp.Attribute.FONT_FAMILY] = "Outfit";
STYLE_TABLE[DocumentApp.Attribute.FONT_SIZE] = 11;


const STYLE_SUBTITLE = {};
STYLE_SUBTITLE[DocumentApp.Attribute.FONT_FAMILY] = 'Permanent Marker';
STYLE_SUBTITLE[DocumentApp.Attribute.FONT_SIZE] = 20;

