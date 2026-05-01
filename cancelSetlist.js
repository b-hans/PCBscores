function cancelSetlist() {

    const statusCell = SETLISTS_FORM.getRange(SETLIST_FORM_STATUS_CELL);

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

        try {
            clearSetlist();
            setStatus('');

            MASTER_SHEET.getRange(MASTER_STATUS_CELL).setValue('New setlist canceled');
            MASTER_SHEET.activate();
            return;

        } catch (error) {
            sendAlert ("Error canceling: " + error);
            statusCell.setValue ("Error canceling: " + error);
            return;
        }


    }

}