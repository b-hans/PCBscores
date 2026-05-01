class Setlist {
    constructor( id ) {

        this.id = id;

        const setlistData = SETLISTS_SHEET.getDataRange().getValues();
        const setlistDocs = SETLIST_DOCUMENTS.getDataRange().getValues();

        try {
            for (let i=SETLISTS_MENU_ROWS; i<setlistData.length; i++) {
                if (setlistData[i][SETLISTS_ID_COL] == id) {
                    this.name = setlistData[i][SETLISTS_NAME_COL];
                    this.titles = JSON.parse(setlistData[i][SETLISTS_TITLES_COL]);

                    break;
                }
            }

            // get setlist docs
            this.parts = [];
            for (let i=SETLIST_DOCUMENTS_MENU_ROWS; i<setlistDocs.length; i++) {
                let item = setlistDocs[i];

                if (item[DOC_DATA_SETLIST_ID_COL] == id) {
                    this.parts.push ({
                      id: item[DOC_DATA_ID_COL],
                      pdf_name: item[DOC_DATA_SETLIST_PDF_NAME_COL],
                      part: item[DOC_DATA_SETLIST_PART_COL],
                      url: item[DOC_DATA_SETLIST_URL_COL],
                      google_id: item[DOC_DATA_SETLIST_GOOGLE_ID_COL]
                    });
                }
            }

            this.getParts();
            this.getDocuments();

        } catch (error) {
            sendAlert ("Error getting setlist: " + error);
        }

    }

    editForm() {

        try {
            SETLISTS_FORM.activate();

            SETLISTS_FORM.getRange(SETLIST_FORM_STATUS_CELL).setValue("Populating form....");
            let newActionRule = SpreadsheetApp.newDataValidation()
                .requireValueInList(['Remove from setlist'])
                .setAllowInvalid(false)
                .build();

            let oldActionRule = SpreadsheetApp.newDataValidation()
                .requireValueInList(['Add to setlist'])
                .setAllowInvalid(false)
                .build();

            SETLISTS_FORM.getRange(SETLIST_FORM_ID_CELL).setValue(this.id);
            SETLISTS_FORM.getRange(SETLIST_FORM_NAME_CELL).setValue(this.name);

            let titleStartRow = SETLIST_FORM_START_ROW; 
            
            // determine the ranges

            let rangeValues = [];
            for (let i=0; i<this.titles.length; i++) {
                let title = new Title2by (this.titles[i]);

                rangeValues.push ([
                    title.title,
                    '',
                    title.id,
                    title.getAvailableParts()
                ]);

            }

            let newRange = SETLISTS_FORM.getRange(
                (SETLIST_FORM_HEADER_ROW + 1),
                1,
                this.titles.length,
                4
            );

            newRange.setValues(rangeValues);            

            // for (let i=0; i<this.titles.length; i++) {
            //     let insertTitle = new Title2by ( this.titles[i] );

            //     SETLISTS_FORM.getRange(titleStartRow, SETLIST_FORM_ID_COL)
            //         .setValue(insertTitle.id);
            //     SETLISTS_FORM.getRange(titleStartRow, SETLIST_FORM_TITLE_COL)
            //         .setValue(insertTitle.title)
            //     SETLISTS_FORM.getRange(titleStartRow, SETLIST_FORM_ACTION_COL)
            //         .setDataValidation(newActionRule);
            //     SETLISTS_FORM.getRange(titleStartRow, SETLIST_FORM_PARTS_COL)
            //         .setValue(insertTitle.getAvailableParts());

            //     SETLISTS_FORM.getRange(
            //         titleStartRow,
            //         1,
            //         1,
            //         SETLIST_FORM_NUM_COLS
            //     ).setVerticalAlignment('top');

            //     titleStartRow++;
            // }

            let myTitles = SETLISTS_FORM.getRange(
                SETLIST_FORM_START_ROW,
                SETLIST_FORM_ID_COL,
                SETLISTS_FORM.getLastRow() - SETLIST_FORM_START_ROW + 1,
                1
            ).getValues().flat();

            let newDropDownTitles = getTitles({
                type: "Repertoire",
                exclude: myTitles
            });

            let newTitleRule = SpreadsheetApp.newDataValidation()
                .requireValueInList(newDropDownTitles)
                .setAllowInvalid(false)
                .build();

            let nextRow = SETLISTS_FORM.getLastRow() + 1;

            SETLISTS_FORM.getRange(nextRow, SETLIST_FORM_TITLE_COL)
                .setDataValidation(newTitleRule);
            SETLISTS_FORM.getRange(nextRow, SETLIST_FORM_ACTION_COL)
                .setDataValidation(oldActionRule);

            // parts cell
            let partsCell = SETLISTS_FORM.getRange(SETLIST_PARTS_CELL);

            if (this.partsRich) {
                partsCell.clearDataValidations();
                partsCell.clearContent();
                partsCell.setRichTextValue(this.partsRich.build());
            }

            let documentsCell = SETLISTS_FORM.getRange(SETLIST_PRINT_CELL);

            if (this.documentsRich) {
                documentsCell.clearDataValidations();
                documentsCell.clearContent();
                documentsCell.setRichTextValue(this.documentsRich.build());
            }

            // find the range to apply the old validation
            let newValidationRange = SETLISTS_FORM.getRange(
                "B" + (SETLIST_FORM_HEADER_ROW + 1) + ":B" +
                SETLISTS_FORM.getLastRow()
            );

            newValidationRange.setDataValidation(newActionRule);

            SETLISTS_FORM.getRange(SETLIST_FORM_STATUS_CELL).setValue("Editing....");
        } catch (error) {
            sendAlert ("Error populating edit form: " + error);
        }
    }

    updateParts() {

        const setlistDocs = SETLIST_DOCUMENTS.getDataRange().getValues();

        // get setlist docs
        let newParts = [];
        for (let i=SETLIST_DOCUMENTS_MENU_ROWS; i<setlistDocs.length; i++) {
            let item = setlistDocs[i];

            if (item[DOC_DATA_SETLIST_ID_COL] == this.id) {
                newParts.push ({
                    id: item[DOC_DATA_ID_COL],
                    pdf_name: item[DOC_DATA_SETLIST_PDF_NAME_COL],
                    part: item[DOC_DATA_SETLIST_PART_COL],
                    url: item[DOC_DATA_SETLIST_URL_COL],
                    google_id: item[DOC_DATA_SETLIST_GOOGLE_ID_COL]
                });
            }
        }

        this.parts = newParts;

    }

    getParts() {
        let linkData = [];

        if (this.parts.length < 1) {
            this.partsRich = null;
            return;
        }

        for (let i=0; i<this.parts.length; i++) {
            linkData.push({
                text: this.parts[i].part,
                url: this.parts[i].url
            });
        }

        let combinedText = "";
        let richTextBuilder = SpreadsheetApp.newRichTextValue();

        for (let i = 0; i < linkData.length; i++) {
            let data = linkData[i];
            let startIndex = combinedText.length;
            combinedText += data.text;
            let endIndex = combinedText.length;

            // Add a separator if it's not the last link
            if (i < linkData.length - 1) {
                combinedText += "\n"; // Add space for readability
            }

            richTextBuilder.setText(combinedText);
        }

        for (let i=0; i<linkData.length; i++) {
            let item = linkData[i];

            let start = combinedText.indexOf(item.text);
            let end = start + item.text.length;

            richTextBuilder.setLinkUrl(start, end, item.url);

        }

        this.partsRich = richTextBuilder;

    }

    getDocuments () {

        try {

            let linkData = [];

            let sheet = SETLIST_DOCUMENTS_SHEET;
            let data = SETLIST_DOCUMENTS_SHEET.getDataRange().getValues();
            data.splice (0, SETLIST_DOCUMENTS_SHEET_MENU_ROWS);

            let myDocuments = data.filter (row => {
                if (row[SDS_SETLIST_ID_COL] == this.id) {
                    return true;
                } 
                else {
                    return false;
                }
            });
            
            if (myDocuments.length <=0 ) {
                this.documentsRich = null;
                return false;
            }

            let combinedText = "";
            let richTextBuilder = SpreadsheetApp.newRichTextValue();

            for (let i = 0; i<myDocuments.length; i++) {
                let partData = myDocuments[i];
                let startIndex = combinedText.length;
                combinedText += partData[SDS_PART_NAME_COL];
                let endIndex = combinedText.length;

                // Add a separator if it's not the last link
                if (i < myDocuments.length - 1) {
                    combinedText += "\n"; // Add space for readability
                }

                richTextBuilder.setText(combinedText);
            }

            for (let i=0; i<myDocuments.length; i++) {
                let item = myDocuments[i];

                let start = combinedText.indexOf(item[SDS_PART_NAME_COL]);
                let end = start + item[SDS_PART_NAME_COL].length;

                richTextBuilder.setLinkUrl(start, end, item[SDS_URL_COL]);

            }

            this.documentsRich = richTextBuilder;
            return true;            

        }
        catch (error) {
            sendAlert ("error getting documents for this setlist: " + error);
            this.documentsRich = null;
        }

    }
    
    update () {

        this.getParts();
        // find row in sheet
        let data = SETLISTS_SHEET.getDataRange().getValues();

        let setlistRow;
        for (let i=SETLISTS_MENU_ROWS; i<data.length; i++) {
            let item = data[i];

            if (item[SETLISTS_ID_COL] == this.id) {
                setlistRow = i+1;
                break;
            }
        }

        let partsCell = SETLISTS_SHEET.getRange(setlistRow, SETLISTS_PART_COL+1);
        partsCell.clearDataValidations();
        partsCell.setValue('');

        if (this.partsRich) {
            partsCell.setRichTextValue(this.partsRich.build());
        }

    }

    deletePart ( partType ) {

        let fileId;
        let docId;

        try {
            for (let i=0; i<this.parts.length; i++) {
                if (this.parts[i].part == partType) {
                    fileId = getFileIdFromUrl(this.parts[i].url);
                    docId = this.parts[i].id;
                    break;
                }
            }

            // find the doc row
            let docsData = SETLISTS_DOCUMENTS.getDataRange().getValues();

            let deleteRow;
            for (let i=SETLIST_DOCUMENTS_MENU_ROWS; i<docsData.length; i++) {
                let item = docsData[i];
                if (item[DOC_DATA_ID_COL] == docId) {
                    deleteRow = i+SETLIST_DOCUMENTS_MENU_ROWS;
                }
            }

            let deleteFile = DriveApp.getFileById(fileId);
            deleteFile.setTrashed(true);

            SETLISTS_DOCUMENTS.deleteRow(deleteRow);

            this.updateParts();
            this.update();

            return true;

        } catch (error) {
            sendAlert ("Error in delete the part: " + error);
            return false;
        }

    }
}