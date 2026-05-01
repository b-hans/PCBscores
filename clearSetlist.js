function clearSetlist () {

        const statusCell = SETLISTS_FORM.getRange(SETLIST_FORM_STATUS_CELL);

        try {
            statusCell.setValue('');
            SETLISTS_FORM.getRange(SETLIST_FORM_ID_CELL).setValue('');
            SETLISTS_FORM.getRange(SETLIST_FORM_NAME_CELL).setValue('');
            SETLISTS_FORM.getRange(SETLIST_FORM_CREATE_PART).setValue('Select a part');
            SETLISTS_FORM.getRange(SETLIST_FORM_ACTIONS_RANGE).setValue('Actions');
            let titlesRange = SETLISTS_FORM.getRange(
                SETLIST_FORM_START_ROW, 
                1, 
                SETLISTS_FORM.getLastRow() - SETLIST_FORM_NUM_MENU_ROWS + 1,
                SETLIST_FORM_NUM_COLS
            );
            titlesRange.clearDataValidations();
            titlesRange.clear();

            let partsRange = SETLISTS_FORM.getRange (
                SETLIST_PARTS_CELL
            );
            partsRange.clearDataValidations();
            partsRange.clearContent();

            let documentsRange = SETLISTS_FORM.getRange (
                SETLIST_PRINT_CELL
            );
            documentsRange.clearDataValidations();
            documentsRange.clearContent();


        } catch (error) {
            sendAlert ("Error clearing setlist form: " + error);
        }

}