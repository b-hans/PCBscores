class Title2by {

    constructor ( title_id ) {
        const titleData = MASTER_SHEET.getDataRange().getValues();
        titleData.splice(0, MASTER_NUM_MENU_ROWS);

        const myTitle = titleData.filter(row => {
            if (row[MASTER_ID_COL] == title_id) {
                return true;
            }
            else {
                return false;
            }
        });

        if (myTitle.length < 1) {
            this.id = title_id;
            this.title = '';
            this.type = '';
            this.tby_num = '';
            this.notes = '';
            this.scores = [];
        }
        else {
            this.id = myTitle[0][MASTER_ID_COL];
            this.title = myTitle[0][MASTER_TITLE_COL];
            this.type = myTitle[0][MASTER_TYPE_COL];
            this.tby_num = myTitle[0][MASTER_2BY_COL];
            this.length = myTitle[0][MASTER_LENGTH];
            this.tempo = myTitle[0][MASTER_TEMPO];
            this.composer_last = myTitle[0][MASTER_COMPOSER_LAST];
            this.composer_first = myTitle[0][MASTER_COMPOSER_FIRST];
            this.arranger_last = myTitle[0][MASTER_ARRANGER_LAST];
            this.arranger_first = myTitle[0][MASTER_ARRANGER_FIRST];
            this.date = myTitle[0][MASTER_DATE];

            // consolidate notes
            this.notes = myTitle[0][MASTER_NOTES_COL];

            let allNotes = []
            if (myTitle[0][MASTER_NOTES_COL]) {
                allNotes.push(myTitle[0][MASTER_NOTES_COL]);
            }
            if (myTitle[0][MASTER_HAROLD_NOTES]) {
                allNotes.push(myTitle[0][MASTER_HAROLD_NOTES]);
            }
            if (myTitle[0][MASTER_OTHER_NOTES]) {
                allNotes.push(myTitle[0][MASTER_OTHER_NOTES]);
            }

            this.notes = "";
            for (let i=0; i<allNotes.length; i++) {
                this.notes += allNotes[i];
                if (i != allNotes.length-1) {
                    this.notes += "\n";
                }
            }
            

            // find scores
            let scoresData = SCORES_SHEET.getDataRange().getValues();
            scoresData.splice(0, 1);

            this.scores = scoresData.filter(row => {
                if (row[SCORES_TITLE_ID_COL] == this.id) {
                    return true;
                }
                else {
                    return false;
                }
            });

            // find documents
            let docsData = CDF_PARTS_SHEET.getDataRange().getValues();
            docsData.splice(0, CDF_PARTS_SHEET_NUM_MENU_ROWS);
            this.docs = docsData.filter (row => {
                if (row[CDF_PARTS_TITLE_ID_COL] == this.id) {
                    return true;
                }
                else {
                    return false;
                }
            });

        }

    }

    // delete
    delete () {

        MASTER_SHEET.getRange(MASTER_STATUS_CELL).setValue("Deleting row....");
       
        // delete the scores files

        for (let i=0; i<this.scores.length; i++) {
            let myScore = this.scores[i];

            doScoreDelete(myScore[SCORES_ID_COL]);
        }

        // delete the master row
        let masterData = MASTER_SHEET.getDataRange().getValues();
        for (let i=MASTER_NUM_MENU_ROWS; i<masterData.length; i++) {
            if (masterData[i][MASTER_ID_COL] == this.id) {
                let masterRow = i+1;
                MASTER_SHEET.deleteRow(masterRow);
                break;
            }
        }

        MASTER_SHEET.getRange(MASTER_STATUS_CELL).setValue("Success");
    }

    // doEdit
    doEdit() {
        
        let dataArray = [];
        dataArray[MASTER_ID_COL] = this.id;
        dataArray[MASTER_2BY_COL] = this.tby_num;
        dataArray[MASTER_NOTES_COL] = this.notes;
        dataArray[MASTER_TITLE_COL] = this.title;
        dataArray[MASTER_TYPE_COL] = this.type;
        dataArray[MASTER_ACTION_COL]

        dataArray[MASTER_LENGTH] = this.length;
        dataArray[MASTER_TEMPO] = this.tempo;
        dataArray[MASTER_COMPOSER_LAST] = this.composer_last;
        dataArray[MASTER_COMPOSER_FIRST] = this.composer_first;
        dataArray[MASTER_ARRANGER_LAST] = this.arranger_last;
        dataArray[MASTER_ARRANGER_FIRST] = this.arranger_first;
        dataArray[MASTER_DATE] = this.date;
        dataArray[MASTER_HAROLD_NOTES] = '';
        dataArray[MASTER_OTHER_NOTES] = '';

        // find that row in MASTER
        let masterData = MASTER_SHEET.getDataRange().getValues();

        let titleRow;
        for (let i=MASTER_START_ROW-1; i<masterData.length; i++) {
            if (masterData[i][MASTER_ID_COL] == this.id) {
                titleRow = i+1;
                break;
            }
        }

        MASTER_SHEET.getRange(titleRow, 1, 1, MASTER_NUM_COLS)
            .setValues([dataArray]);

        clearSearch();
        clearTitleSheet();

        TITLE_SHEET.getRange(TITLE_STATUS_CELL)
            .setValue(this.title + " updated");

        setStatus('');
        
        return;
    }

    getAvailableParts ( ) {
        let availableParts = "";

        for (let i=0; i<this.scores.length; i++) {
            availableParts += this.scores[i][SCORES_TYPE_COL] + "\n";
        }

        return availableParts.slice(0, -1);
    }

    clearPartsDocuments () {
        const sheet = CDF_PARTS_SHEET;

        sheet.getRange(CDF_CURRENT_PARTS_RANGE).setValue('');
    }

    loadPartsDocuments ( ) {
        this.clearPartsDocuments();
        
        if (this.docs && this.docs.length > 0) {
            let start_row = CDF_PARTS_FIRST_ROW;

            for (let i=0; i<this.docs.length; i++) {

                let value = SpreadsheetApp.newRichTextValue()
                    .setText(this.docs[i][CDF_PARTS_PART_COL])
                    .setLinkUrl(this.docs[i][CDF_PARTS_URL_COL])
                    .build();

                let range = CDF_SHEET.getRange(start_row++, CDF_PARTS_COLUMN);
                range.setRichTextValue(value);
            }
        }

    }
}