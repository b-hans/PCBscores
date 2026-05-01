function haroldSearch () {
   
    try {

        const masterData = MASTER_SHEET.getDataRange().getValues();
        const haroldData = SpreadsheetApp.getActive().getSheetByName("Harold new")
            .getDataRange().getValues();

        const searchTitle = TITLE_SHEET.getRange(INPUT_TITLE_CELL)
            .getValue().toLowerCase();

        let master_row = null;
        let harold_row = null;

        let master_title;
        let harold_title;

        for (let i=MASTER_NUM_MENU_ROWS; i<masterData.length; i++) {
            let item = masterData[i];
            if (item[MASTER_TITLE_COL].toLowerCase().includes(searchTitle)) {
                master_row = i+1;
                master_title = item[MASTER_TITLE_COL];
                break;
            }
        }

        if (master_row) {

            for (let i=1; i<haroldData.length; i++) {
                let item = haroldData[i];
                if (item[1].toLowerCase().includes(searchTitle)) {
                    harold_row = i+1;
                    harold_title = item[1];
                    break;
                }
            }

            if (harold_row) {

                const ui = SpreadsheetApp.getUi(); // Or SpreadsheetApp.getUi() for Sheets
                let response = ui.alert(
                    'Match:\n' +
                    harold_title + "\n" +
                    master_title + "\n\n" +
                    "Make the change to Harold?",
                    ui.ButtonSet.YES_NO
                );

                let haroldTitle = true;

                if (response === ui.Button.NO) {
                    haroldTitle = false;
                    response = ui.alert(
                        'Match:\n' +
                        harold_title + "\n" +
                        master_title + "\n\n" +
                        "Make the change to Master?",
                        ui.ButtonSet.YES_NO
                    );
                }

                if (response === ui.Button.No) {
                    return false;
                }

                if (haroldTitle) {
                    MASTER_SHEET.getRange(master_row, MASTER_TITLE_COL+1)
                        .setValue(harold_title);
                }
                MASTER_SHEET.getRange(master_row, MASTER_2BY_COL+1)
                    .setValue(haroldData[harold_row-1][0]);

                // construct array
                let updateRow = haroldData[harold_row-1];
                let updateArray = [
                    updateRow[2],
                    updateRow[3],
                    updateRow[4],
                    updateRow[5],
                    updateRow[6],
                    updateRow[7],
                    updateRow[8],
                    updateRow[9],
                    updateRow[10]
                ];


                MASTER_SHEET.getRange(master_row, 7, 1, 9).setValues([updateArray]);

                sendAlert ("Success!");

            }
            else {
                sendAlert("Not found");
            }

        }
        else {
            sendAlert ("Not found");
        }

        return true;

    }
    catch (error) {
        sendAlert ("error in the search: " + error);
        return false;
    }
}