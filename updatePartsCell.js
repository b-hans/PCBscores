function updatePartsCell () {

    try {

        const sheet = SETLIST_FORM_SHEET;
        const statusCell = sheet.getRange(SETLIST_FORM_STATUS_CELL);
        const partType = sheet.getRange(SETLIST_FORM_CREATE_PART).getValue();
        const setlist_id = sheet.getRange(SETLIST_FORM_ID_CELL).getValue();
        const setlistName = sheet.getRange(SETLIST_FORM_NAME_CELL).getValue();

        const partsCell = sheet.getRange(SETLIST_PRINT_CELL);
        const mySetlist = new Setlist(setlist_id);

        partsCell.clearDataValidations();
        partsCell.clearContent();

        if (mySetlist.documentsRich) {
            partsCell.setRichTextValue(mySetlist.documentsRich.build());
        }

        return true;
    }
    catch (error) {
        sendAlert ("Error updating parts cell: " + error);
        return false;
    }
}