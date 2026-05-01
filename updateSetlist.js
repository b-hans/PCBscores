function updateSetlist ( setlist ) {

    // first check to see if we are updating
    const lastRow = SETLISTS_SHEET.getLastRow();
    const setlistFormStatus = SETLISTS_FORM.getRange(SETLIST_FORM_STATUS_CELL);
    const currentStatus = getStatus();

    const sheetRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(['Edit this setlist','Delete this setlist'])
        .setAllowInvalid(false)
        .build();

    if (currentStatus == "NEW_SETLIST") {
        try {
            let newRow = lastRow + 1;

            SETLISTS_SHEET.getRange(newRow, SETLISTS_NAME_COL+1)
                .setValue(setlist.name);
            SETLISTS_SHEET.getRange(newRow, SETLISTS_ID_COL+1)
                .setValue(setlist.id);
            SETLISTS_SHEET.getRange(newRow, SETLISTS_TITLES_COL+1)
                .setValue(
                    JSON.stringify(setlist.titles)
                );
            SETLISTS_SHEET.getRange(newRow, SETLISTS_ACTION_COL+1)
                .setDataValidation(sheetRule);

            return true;

        } catch (error) {
            sendAlert ("Error updating setlist: " + error);
            setlistFormStatus.setValue("Error updating setlist: " + error);
            return false;
        }
    }
    else if (currentStatus == "EDIT_SETLIST") {

        try {
            // find the row
            let editRow;

            for (let i=SETLISTS_FIRST_ROW; i<SETLISTS_SHEET.getLastRow()+1; i++) {
                if (SETLISTS_SHEET
                        .getRange(i, SETLISTS_ID_COL+1)
                        .getValue() == setlist.id) {
                            editRow = i;
                            break;
                        }
            }

            SETLISTS_SHEET.getRange(editRow, SETLISTS_NAME_COL+1)
                .setValue(setlist.name);
            SETLISTS_SHEET.getRange(editRow, SETLISTS_ID_COL+1)
                .setValue(setlist.id);
            SETLISTS_SHEET.getRange(editRow, SETLISTS_TITLES_COL+1)
                .setValue(
                    JSON.stringify(setlist.titles)
                );
            SETLISTS_SHEET.getRange(editRow, SETLISTS_ACTION_COL+1)
                .setDataValidation(sheetRule);
            return true;

        } catch (error) {
            sendAlert("Error in making edits: " + error);
            setlistFormStatus.setValue("Error in making edits: " + error);
            return false;
        }

    }
    else {
        return false;
    }

}