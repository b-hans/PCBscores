function cancelCreateDocument ( ) {
    try {
        const currentStatus = getStatus();

        if ( currentStatus != "CREATE_DOCUMENT" ) {
            return false;
        }

        // Display a dialog box with a message and "Yes" and "No" buttons. 
        const ui = SpreadsheetApp.getUi(); // Or SpreadsheetApp.getUi() for Sheets
        const response = ui.alert(
            'Are you sure you want to cancel?' + ' : ' + currentStatus,
            ui.ButtonSet.YES_NO
        );

        if (response === ui.Button.NO) {
            return false;
        }
        else {
            // clear the sheet
            CDF_SHEET.getRange(CDF_ID_CELL).setValue('');
            CDF_SHEET.getRange(CDF_TITLE_CELL).setValue('');
            CDF_SHEET.getRange(CDF_ACTIONS_CELL).setValue('Choose an action');
            CDF_SHEET.getRange(CDF_PART_CELL).setValue('Select a score type');
            CDF_SHEET.getRange(CDF_STATUS_RANGE).setValue('Create document canceled');
            CDF_SHEET.getRange(CDF_CURRENT_PARTS_RANGE).clearDataValidations();
            CDF_SHEET.getRange(CDF_CURRENT_PARTS_RANGE).setValue('');

            setStatus('EDIT');
            TITLE_SHEET.activate();

        }

        return true;

    }
    catch (error) {
        sendAlert ("Error canceling create document: " + error);
        return false;
    }
}