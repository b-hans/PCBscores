function importNewHarold ( ) {
    
    try {
        const haroldSheet = SpreadsheetApp.getActive().getSheetByName("Harold new");
        const haroldData = haroldSheet.getDataRange().getValues();

        // JUST ONE COLUMN (ID)
        const idRange = MASTER_SHEET.getRange(MASTER_START_ROW, 
            MASTER_ID_COL+1, MASTER_SHEET.getLastRow(), 1);

        const idData = idRange.getValues().flat();

        const largestId = Math.max(...idData);

        let newId = largestId + 1;

        let lastRow = MASTER_SHEET.getLastRow() + 1;

        for (let i=1; i<haroldData.length; i++) {
            let item = haroldData[i];

            let notes = '';
            if (item[9] && item[10]) {
                notes += item[9] + "\n" + item[10];
            }
            else if (item[9]) {
                notes = item[9];
            }
            else if (item[10]) {
                notes = item[10];
            }

            let insertArray = [
                item[1],
                'Working',
                notes,
                newId++,
                item[0],
                '',
                item[2],
                item[3],
                item[4],
                item[5],
                item[6],
                item[7],
                item[8],
                '',
                ''
            ];

            let insertRange = MASTER_SHEET.getRange(
                lastRow++,
                1,
                1,
                15
            ).setValues([insertArray]);

        }

        return true;

    }
    catch (error) {
        sendAlert ("Error in importing the new items harold: " + error);
        return false;
    }
}