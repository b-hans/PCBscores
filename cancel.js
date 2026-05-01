function cancel () {

    const currentStatus = getStatus(); 

    if (currentStatus != 'NONE' && currentStatus != '') {
        
        // Display a dialog box with a message and "Yes" and "No" buttons. 
        const ui = SpreadsheetApp.getUi(); // Or SpreadsheetApp.getUi() for Sheets
        const response = ui.alert(
            'Are you sure you want to cancel?' + ' : ' + currentStatus,
            ui.ButtonSet.YES_NO
        );

        if (response === ui.Button.NO) {
            return;
        }

    }


    setStatus('');

    clearSearch();
    clearTitleSheet();

    TITLE_SHEET.hideRows(SCORE_TYPE_ROW);

}