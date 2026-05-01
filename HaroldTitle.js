class HaroldTitle {
    constructor ( params ) {

        try {

            for (let i=0; i<params.headers.length; i++) {
                this[params.headers[i]] = params.data_row[i];
            }

        }
        catch (error) {
            sendAlert ("error constructing harold: " + error);
            return false;
        }

    }

    updateMaster () {

        try {

            // find based on Code first
            const masterData = MASTER_SHEET.getDataRange().getValues();
            let master_row = null;

            for (let i=MASTER_NUM_MENU_ROWS; i<masterData.length; i++) {
                let item = masterData[i];
                if (item[MASTER_2BY_COL] == this.Code) {
                    master_row = i+1;
                    break;
                }
                else if (!item[MASTER_2BY_COL] && 
                    item[MASTER_TITLE_COL].toLowerCase() == this.Title.toLowerCase()) {
                    master_row = i+1;
                    break;
                }
            }

            if (master_row) {

                // // get the range
                // let updateRange = MASTER_SHEET.getRange (
                //     master_row,
                //     7,
                //     1,
                //     9
                // );

                // let valuesArray = [
                //     this.Length,
                //     this.Tempo,
                //     this['Composer Last'],
                //     this['Composer First'],
                //     this['Arranger Last'],
                //     this['Arranger First'],
                //     this.Date,
                //     this.Notes,
                //     this['Other notes']
                // ];

                // updateRange.setValues([valuesArray]);

                // MASTER_SHEET.getRange(master_row, MASTER_2BY_COL+1)
                //     .setValue(this.Code);

            }
            else {
                let hSheet = SpreadsheetApp.getActive().getSheetByName("Harold new");

                // get next row
                let insertRow = hSheet.getLastRow() + 1;

                let insertArray = [
                    this.Code,
                    this.Title,
                    this.Length,
                    this.Tempo,
                    this['Composer Last'],
                    this['Composer First'],
                    this['Arranger Last'],
                    this['Arranger First'],
                    this.Date,
                    this.Notes,
                    this['Other notes']
                ];

                let insertRange = hSheet.getRange(insertRow, 
                    1,
                    1,
                    11
                );
                insertRange.setValues([insertArray]);

                // let logDocuments = DriveApp.getFilesByName("Harold logs");
                // let logDocument;
                // if (logDocuments.hasNext()) {
                //     logDocument = DocumentApp.openById(
                //         logDocuments.next().getId()
                //     );
                // }
                // else {
                //     logDocument = DocumentApp.create("Harold logs");
                // }
                // let logBody = logDocument.getBody();
                // logBody.appendParagraph(this.Title + " : " + this.Code);
            }

        }
        catch (error) {
            sendAlert ("Error updating " + this.Title + ": " + error);
            return false;
        }

    }
}