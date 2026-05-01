function searchTitle () {
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

    const titleToSearch = TITLE_SHEET.getRange(INPUT_TITLE_CELL)
        .getValue().toLowerCase();

    if (!titleToSearch) {
        statusRange.setValue("You must enter something in the title field");
        return;
    }

    statusRange.setValue("Searching....");

    const titleRows = MASTER_SHEET.getRange(MASTER_START_ROW, 
        1, MASTER_SHEET.getLastRow(), MASTER_NUM_COLS);
    const titleData = titleRows.getValues();

    const searchResults = titleData.filter(item => {
        let itemTest = item[MASTER_TITLE_COL].toLowerCase();
    
        if (itemTest.includes(titleToSearch)) {
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

        let currentRow = SEARCH_RESULTS_ROW_START;

        const rule = SpreadsheetApp.newDataValidation()
            .requireValueInList(['Edit this title'])
            .build(); 

        for (let i=0; i<searchResults.length; i++) {
            let item = searchResults[i];

            TITLE_SHEET.getRange(currentRow, SEARCH_TITLE_COL)
                .setValue(item[MASTER_TITLE_COL]);
            TITLE_SHEET.getRange(currentRow, SEARCH_ID_COL)
                .setValue(item[MASTER_ID_COL]);
            TITLE_SHEET.getRange(currentRow, SEARCH_ACTIONS_COL)
                .setDataValidation(rule);
            currentRow++;
        }


    }
    else {
        statusRange.setValue ("Editing....");
        const foundTitle = searchResults[0];

        clearSearch();
        setStatus('EDIT');

        loadTitle(foundTitle[MASTER_ID_COL]);

    }


}