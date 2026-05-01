function removePart () {

    try {

        const status = getStatus();

        if (status != "EDIT_SETLIST") {
            sendAlert ("Check status: " + status);
            return false;
        }

        const sheet = SETLIST_FORM_SHEET;
        const statusCell = sheet.getRange(SETLIST_FORM_STATUS_CELL);
        const partType = sheet.getRange(SETLIST_FORM_CREATE_PART).getValue();
        const setlist_id = sheet.getRange(SETLIST_FORM_ID_CELL).getValue();
        const setlistName = sheet.getRange(SETLIST_FORM_NAME_CELL).getValue();

        const partsData = SETLIST_DOCUMENTS_SHEET.getDataRange().getValues();
        const partsHeader = partsData.splice(0, SETLIST_DOCUMENTS_SHEET_MENU_ROWS)[0];
        const setlistIdIndex = partsHeader.indexOf("setlist id");
        const partNameIndex = partsHeader.indexOf("part name");
        const partGoogleIndex = partsHeader.indexOf('google id');

        statusCell.setValue ("Remove part: " + partType);


        // checks

        // does part exist
        let partsArray = [];
        for (let i=0; i<partsData.length; i++) {
            let item = partsData[i];

            if (item[setlistIdIndex] == setlist_id && 
                item[partNameIndex] == partType
            ) {

                partsArray.push(item);

            }
        }

        if (partsArray.length < 1) {
            const alertText = "Part " + partType + " does not exist";
            sendAlert (alertText);
            statusCell.setValue (alertText);
            return false;
        }

        // Display a dialog box with a message and "Yes" and "No" buttons. 
        const ui = SpreadsheetApp.getUi(); // Or SpreadsheetApp.getUi() for Sheets
        const response = ui.alert(
            "You are about to remove all the parts for setlist: " + setlistName + "\n" +
            "Part: " + partType + "\n" +
            "This action cannot be undone.\n" +
            "Are you sure",
            ui.ButtonSet.YES_NO
        );

        if (response === ui.Button.NO) {
            statusCell.setValue("Editing....");
            return;
        }

        // remove the google doc
        for (let i=0; i<partsArray.length; i++) {

            // remove file first
            let fileToTrash = DriveApp.getFileById(partsArray[i][partGoogleIndex]);
            fileToTrash.setTrashed(true);

        }

        let numCols = partsData[0].length;

        let originalLength = partsData.length;

        // redo the data
        for (let i=(partsData.length-1); i>=0; i--) {
            let item = partsData[i];

            if (item[setlistIdIndex] == setlist_id && 
                item[partNameIndex] == partType
            ) {
                // delete that row
                partsData.splice(i, 1);
            }

        }

        let newLength = partsData.length;

        let numBlankRows = originalLength - newLength;

        let blankRow = []
        for (let i=0; i<numCols; i++) {
            blankRow.push('');
        }

        for (let i=0; i<numBlankRows; i++) {
            partsData.push(blankRow);
        }

        let newRange = SETLIST_DOCUMENTS_SHEET.getRange(
            (SETLIST_DOCUMENTS_SHEET_MENU_ROWS+1),
            1,
            partsData.length,
            partsData[0].length
        );

        newRange.setValues(partsData);

        updatePartsCell();

        statusCell.setValue("Part " + partType + " removed successfully");

        // sendAlert ("Test:\n\n" +
        //     partType + "\n" +
        //     sheet.getName() + "\n" + 
        //     setlist_id + "\n\n" +
        //     "Setlist id: " + partsHeader.indexOf("setlist id") + "\n" +
        //     "Part name: " + partsHeader.indexOf("part name") + "\n" +
        //     "check console"
        // );

        return true;

    }
    catch (error) {
        sendAlert ("Error removing part: " + error);
        return false;
    }
}