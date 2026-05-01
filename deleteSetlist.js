function deleteSetlist( e ) {

    const setlistRow = e.range.getRow();

    const setlistId = SETLISTS_SHEET.getRange(setlistRow, SETLISTS_ID_COL+1)
        .getValue();

    const mySetlist = new Setlist(setlistId);

    // Display a dialog box with a message and "Yes" and "No" buttons. 
    const ui = SpreadsheetApp.getUi(); // Or SpreadsheetApp.getUi() for Sheets
    const response = ui.alert(
        'You are about to delete setlist: ' + mySetlist.name + "\n\n" +
        'This cannot be undone, do you wish to continue?',
        ui.ButtonSet.YES_NO
    );

    if (response === ui.Button.NO) {
        SETLISTS_SHEET.getRange(setlistRow, SETLISTS_ACTION_COL+1).setValue('');
        return;
    }

    SETLISTS_SHEET.deleteRow(setlistRow);

}