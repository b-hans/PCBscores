function createDocument ( ) {

    try {
        const currentStatus = getStatus();

        if (currentStatus != 'ADD' && currentStatus != 'EDIT') {
            sendAlert('Load a title before uploading/creating document');
            return false;
        }

        if (currentStatus == 'ADD') {
            TITLE_SHEET.getRange(TITLE_STATUS_CELL).setValue('Enter data');
            const title_id = TITLE_SHEET.getRange(INPUT_ID_CELL).getValue();
            const title_title = TITLE_SHEET.getRange(INPUT_TITLE_CELL).getValue();
            const title_type = TITLE_SHEET.getRange(INPUT_TYPE_CELL).getValue();
            const title_notes = TITLE_SHEET.getRange(INPUT_NOTES_CELL).getValue();
            const title_2bysno = TITLE_SHEET.getRange(INPUT_2BY_NUMBER).getValue();

            if (!title_title || !title_type) {
                sendAlert("Title and type are required");
                return;
            }
            else {
                // create the new entry
                let lastRow = MASTER_SHEET.getLastRow() + 1;

                MASTER_SHEET.getRange(lastRow, MASTER_ID_COL+1)
                    .setValue(title_id);
                MASTER_SHEET.getRange(lastRow, MASTER_TITLE_COL+1)
                    .setValue(title_title);
                MASTER_SHEET.getRange(lastRow, MASTER_TYPE_COL+1)
                    .setValue(title_type);
                MASTER_SHEET.getRange(lastRow, MASTER_NOTES_COL+1)
                    .setValue(title_notes);
                MASTER_SHEET.getRange(lastRow, MASTER_2BY_COL+1)
                    .setValue(title_2bysno);

                TITLE_SHEET.getRange(TITLE_STATUS_CELL)
                    .setValue("Successfully added new title");
                MASTER_SHEET.getRange(MASTER_STATUS_CELL)
                    .setValue("Added " + title_title);

            }
        }

        let titleId = TITLE_SHEET.getRange(INPUT_ID_CELL).getValue();
        let myTitle = new Title2by (titleId);


        setStatus('CREATE_DOCUMENT');

        CDF_SHEET.getRange(CDF_ID_CELL).setValue(myTitle.id);
        CDF_SHEET.getRange(CDF_TITLE_CELL).setValue(myTitle.title);

        // get and or create the folder here
        let documentFolder;
        let documentFolders = CDF_DOCUMENTS.getFoldersByName(
            myTitle.id + "_document"
        );

        if (documentFolders.hasNext()) {
            documentFolder = documentFolders.next();
        }
        else {
            documentFolder = DriveApp.createFolder(myTitle.id + "_document");
            documentFolder.moveTo(CDF_DOCUMENTS);
        }

        myTitle.loadPartsDocuments();

        CDF_SHEET.getRange(CDF_STATUS_RANGE).setValue("Select a part");

        CDF_SHEET.activate();
        
        return true;
    }
    catch (error) {
        sendAlert ("Error creating document: " + error);
        return false;
    }
}