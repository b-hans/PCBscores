function makePartFolder (e) {

    try {
        const part_type = e.range.getValue();
        const score_id = CDF_SHEET.getRange(CDF_ID_CELL).getValue();

        const statusCell = CDF_SHEET.getRange(CDF_STATUS_RANGE);

        if (part_type == "Select a score type") {
            return false;
        }

        statusCell.setValue("Getting folders....");

        // get and or create the folder here
        let documentFolder;
        let documentFolders = CDF_DOCUMENTS.getFoldersByName(
            score_id + "_document"
        );

        if (documentFolders.hasNext()) {
            documentFolder = documentFolders.next();
        }
        else {
            statusCell.setValue("There is no parent folder for this title");
            sendAlert ("There is no parent folder for this title");
            return false;
        }

        let partFolders = documentFolder.getFoldersByName(part_type);
        let partFolder;
        if (!partFolders.hasNext()) {
            partFolder = DriveApp.createFolder(part_type);
            partFolder.moveTo(documentFolder);
        }
        else {
            partFolder = partFolders.next();
        }

        let folderUrl = partFolder.getUrl();
        let cellText = "INSTRUCTIONS: \n\n" +
                "Save each page of the score as a .jpg and number them:\n" +
                "Part 1.jpg, Part 2.jpg, etc.\n\n" +
                "Drag and drop jpg files for this score into this folder: " +
                "Part folder";
        let linkStart = cellText.indexOf("Part folder");
        let linkEnd = linkStart + ("Part folder").length;

        let richText = SpreadsheetApp.newRichTextValue();

        richText.setText(cellText);
        richText.setLinkUrl(linkStart, linkEnd, folderUrl);

        CDF_SHEET.getRange(CDF_STATUS_RANGE)
            .setRichTextValue(richText.build());

        return true;

    }
    catch (error) {
        sendAlert ("Error making folder for part: " + error);
        return false;
    }

}