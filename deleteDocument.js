function deleteDocument (e) {

    try {

        const actionCell = e.range;

        const inputStatus = TITLE_SHEET.getRange(INPUT_STATUS_RANGE);
        const title_id = TITLE_SHEET.getRange(INPUT_ID_CELL).getValue();
        const document_id = TITLE_SHEET.getRange(e.range.getRow(), SEARCH_ID_COL)
            .getValue();


        const myDocument = new TitleDocument ( document_id );

        // Display a dialog box with a message and "Yes" and "No" buttons. 
        const ui = SpreadsheetApp.getUi(); // Or SpreadsheetApp.getUi() for Sheets
        const response = ui.alert(
            'You are about to delete this document. Are you sure?',
            ui.ButtonSet.YES_NO
        );

        if (response === ui.Button.NO) {
            actionCell.setValue('');
            return false;
        }

        inputStatus.setValue("Deleting document....");
        myDocument.delete();

        myTitle = new Title2by ( title_id);

        loadScores(myTitle);
        inputStatus.setValue("Successfully deleted document");

        return true;

    }
    catch (error) {
        sendAlert ("Error deleting the document: " + error);
        return false;
    }


}