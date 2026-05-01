function confirmDeleteTitle ( masterRow ) {

    const myStatus = getStatus();

    const myTitleId = MASTER_SHEET.getRange(masterRow, MASTER_ID_COL+1)
        .getValue();
    const myTitle = new Title2by(myTitleId);

    MASTER_SHEET.getRange(masterRow, MASTER_ACTION_COL+1).setValue('');

    if (myStatus != '' && myStatus != 'NONE') {
        sendAlert("Check current status: " + myStatus);
        return;
    }
    
    // Display a dialog box with a message and "Yes" and "No" buttons. 
    const ui = SpreadsheetApp.getUi(); // Or SpreadsheetApp.getUi() for Sheets
    const response = ui.alert(
        'You are about to delete: ' + myTitle.title +
        "\nThis cannot be undone, are you sure?",
        ui.ButtonSet.YES_NO
    );

    if (response === ui.Button.NO) {
        return;
    }

    myTitle.delete();

}