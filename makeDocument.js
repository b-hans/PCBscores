function makeDocument () {

    try {
        const currentStatus = getStatus();

        if (currentStatus != "CREATE_DOCUMENT") {
            sendAlert ("Check status: " + currentStatus);
            return false;
        }

        const title_id = CDF_SHEET.getRange(CDF_ID_CELL).getValue();
        const part_type = CDF_SHEET.getRange(CDF_PART_CELL).getValue();

        if (part_type == "Select a score type") {
            sendAlert ("Please select a score type");
            return false;
        }

        let myTitle;

        if (title_id) {
            myTitle = new Title2by ( title_id);
        }
        else {
            sendAlert ("There is no title selected for creating a document");
            return false;
        }

        // check to see if part exists
        let partRow = partDocExists({
            title_id: myTitle.id,
            part_type: part_type
        });

        if (partRow) {
            const ui = SpreadsheetApp.getUi(); // Or SpreadsheetApp.getUi() for Sheets
            const response = ui.alert(
                'That document exists. Do you want to re-write?',
                ui.ButtonSet.YES_NO
            );

            if (response === ui.Button.NO) {
                return false;
            }
        }

        // get the folder
        let myFolders = CDF_DOCUMENTS.getFoldersByName(myTitle.id + '_document');
        let myFolder;
        if (!myFolders.hasNext()) {
            sendAlert ("There is no folder for this title");
            return false;
        }
        else {
            myFolder = myFolders.next();
        }

        let partFolders = myFolder.getFoldersByName(part_type);
        let partFolder;
        if (!partFolders.hasNext()) {
            sendAlert ("There is no folder for this part");
            return false;
        }
        else {
            partFolder = partFolders.next();
        }

        let titleJpgs = partFolder.getFilesByType(MimeType.JPEG);

        if (!titleJpgs.hasNext()) {
            sendAlert ("There are no jpgs in the folder");
            return false;
        }

        let docJpgs = [];

        while (titleJpgs.hasNext()) {
            let myJpg = titleJpgs.next();

            // let fTest = Drive.Files.get(myJpg.getId());
            docJpgs.push ({
                title: myJpg.getName(),
                fileId: myJpg.getId(),
                blob: myJpg.getBlob(),
                file: myJpg
            });
            
        }

        docJpgs.sort ((a, b) => {
            const numA = parseInt(a.title.match(/\d+/)[0]); // Extract number from string a
            const numB = parseInt(b.title.match(/\d+/)[0]); // Extract number from string b

            // Compare the numerical parts
            if (numA !== numB) {
                return numA - numB;
            }

            // If numbers are equal, compare the full strings lexicographically
            return a.title.localeCompare(b.title);
        });

        // find the doc
        let newDoc;

        let documents = partFolder.getFilesByName(
            myTitle.id + "_" + part_type + "_" + myTitle.title);

        if (documents.hasNext()) {
            newDoc = DocumentApp.openById(documents.next().getId());

        }
        else {           
            newDoc = DocumentApp.create(
            myTitle.id + "_" + part_type + "_" + myTitle.title);
            const folderDoc = DriveApp.getFileById(newDoc.getId());

            folderDoc.moveTo(partFolder);
            
        }

        const docBody = newDoc.getBody();
        docBody.clear();

        docBody.setAttributes(DOCUMENT_STYLE);

        let curParagraph = null;

        for (let i=0; i<docJpgs.length; i++) {
            if (!curParagraph) {
                curParagraph = docBody.getParagraphs()[0];
            }
            else {
                curParagraph = docBody.appendParagraph('');
            }

            let myImage = docJpgs[i];

            let inlineImage = curParagraph.appendInlineImage (myImage.blob);

            let blobWidth = inlineImage.getWidth() / 670;
            let blobHeight = inlineImage.getHeight() / 894;

            let newDiv;

            if (blobWidth > blobHeight) {
                newDiv = blobWidth;
            }
            else {
                newDiv = blobHeight;
            }

            let newWidth = inlineImage.getWidth() / newDiv;
            let newHeight = inlineImage.getHeight() / newDiv;




            inlineImage.setWidth(newWidth);
            inlineImage.setHeight(newHeight);

        }

        let params = {
            title_id: title_id,
            part_type: part_type,
            doc_url: newDoc.getUrl()
        }

        newDoc.saveAndClose();

        // delete the jpgs
        for (let i=0; i<docJpgs.length; i++) {
            let delFile = docJpgs[i].file;
            delFile.setTrashed(true);
        }

        let statusCell = CDF_SHEET.getRange(CDF_STATUS_RANGE);

        if (updatePartDocs(params)) {
            statusCell.setValue(
                "Successfully created/updated the document\n\n" +
                "Create another part or cancel to return to the title edit form"
            );
            CDF_SHEET.getRange(CDF_PART_CELL).setValue('Select a score type');

            // clear search and load uploads
            clearSearch();
            const myTitle = new Title2by(title_id);
            loadScores(myTitle);
            myTitle.loadPartsDocuments();

        }
        else {
            statusCell.setValue("There was an error531");
        }

        return true;
    }
    catch (error) {
        sendAlert ("Error making document: " + error);
        return false;
    }
}