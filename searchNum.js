function searchNum () {
    const statusRange = TITLE_SHEET.getRange(TITLE_STATUS_CELL);
    const currentStatus = getStatus();

    if (currentStatus == 'ADD' || currentStatus == 'EDIT') {
        sendAlert("You must cancel current record to search");
        return;
    }

    if (!inActiveData()){
        statusRange.setValue("You must enter the current cell value");
        sendAlert("You must enter the current cell value");
        return;
    }

    setStatus('SEARCH');

    const numToSearch = TITLE_SHEET.getRange(INPUT_2BY_NUMBER)
        .getValue();

    if (!numToSearch) {
        sendAlert("You haven't entered a number to search");
        setStatus('');
        return;
    }

    if (typeof numToSearch !== 'number' || numToSearch % 1 !== 0) {
        sendAlert(numToSearch + " is not a valid number")
        setStatus('');
        return;
    }

    if (numToSearch < 1) {
        statusRange.setValue("You must enter an integer greater than 0 in the 2by2bas No. field");
        setStatus('');
        return;
    }

    statusRange.setValue("Searching...." + ' : ' + numToSearch);

    const titleRows = MASTER_SHEET.getRange(
        3, 1, MASTER_SHEET.getLastRow(), MASTER_NUM_COLS);
    const titleData = titleRows.getValues();

    const searchResults = titleData.filter(item => {
        let itemTest = item[MASTER_2BY_COL];
    
        if (itemTest == numToSearch) {
            return true;
        }
        else {
            return false;
        }
    });

    if (searchResults.length < 1) {
        statusRange.setValue ("Nothing found");
        setStatus('');
    }
    else if (searchResults.length > 1) {
        statusRange.setValue("Found multiple");
        TITLE_SHEET.getRange(INPUT_ID_CELL).setValue('');
        TITLE_SHEET.getRange(INPUT_TYPE_CELL).setValue('');
        TITLE_SHEET.getRange(INPUT_2BY_NUMBER).setValue('');
        TITLE_SHEET.getRange(INPUT_NOTES_CELL).setValue('');

        let currentRow = 4;

        const rule = SpreadsheetApp.newDataValidation()
            .requireValueInList(['Edit this title'])
            .build(); 

        for (let i=0; i<searchResults.length; i++) {
            let item = searchResults[i];

            TITLE_SHEET.getRange(currentRow, 6).setValue(item[MASTER_TITLE_COL]);
            TITLE_SHEET.getRange(currentRow, 7).setValue(item[MASTER_ID_COL]);
            TITLE_SHEET.getRange(currentRow, 8).setDataValidation(rule);
            currentRow++;
        }

    }
    else {
        statusRange.setValue ("Editing....");
        let foundTitle = searchResults[0];

        clearSearch();
        setStatus('EDIT');

        loadTitle(foundTitle[MASTER_ID_COL]);

    }


}