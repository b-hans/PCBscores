function makePrintPart ( ) {

    const statusCell = SETLIST_FORM_SHEET.getRange(SETLIST_FORM_STATUS_CELL);

    try {

        // create the array for the document hashes

        enterSetlist();

        let docsArray = [];

        let rewrite = false;

        let blankImages = BLANK_IMAGE.getBody().getImages();

        // get the setlist

        const setlist_id = SETLIST_FORM_SHEET.getRange(SETLIST_FORM_ID_CELL).getValue();
        const setlist = new Setlist(setlist_id);
        const part_type = SETLIST_FORM_SHEET.getRange(SETLIST_FORM_CREATE_PART).getValue();

        let docName = "Setlist_doc_" + setlist.name + "_" + setlist.id +
            "_" + part_type;

        // get the document
        let setlists = SETLISTS_FOLDER.getFilesByName(docName);
        let setlistDoc;
        if (setlists.hasNext()) {

            // Display a dialog box with a message and "Yes" and "No" buttons. 
            const ui = SpreadsheetApp.getUi(); // Or SpreadsheetApp.getUi() for Sheets
            const response = ui.alert(
                'That print part exists. Do you want to re-write?',
            ui.ButtonSet.YES_NO
            );

            if (response === ui.Button.NO) {
                return;
            }

            // alert for this exists already
            setlistDoc = DocumentApp.openById(setlists.next().getId());
            rewrite = true;
        }
        else {
           
            setlistDoc = DocumentApp.create(docName);

            let moveDoc = DriveApp.getFileById(setlistDoc.getId());
            moveDoc.moveTo(SETLISTS_FOLDER);
        }

        statusCell.setValue("Writing print part....");

        let titlesPagesArray = [];

        let sortedArray = setlist.titles.map((title_id) => {
            return new Title2by (title_id);
        });

        sortedArray.sort ( (a, b) => {
            if (a.title > b.title) {
                return 1;
            }
            else {
                return -1;
            }
        });


        /**
         * Insert blank images
         * 
         * if less than or equal to 24 - 1 page
         * 
         * else subtract 24 from total
         * 
         * devide by 25 ( ceiling or floor)
         */

        let indexNumPages = Math.ceil(sortedArray.length / 20);

        for (let i=0; i<indexNumPages; i++) {
            docsArray = docsArray.concat(blankImages);
        }

        for (let i=0; i<sortedArray.length; i++) {

            let title = sortedArray[i];
            titlesPagesArray.push ({
                title: title.title,
                id: title.id,
                page_number: null
            });

        }

        let titles = [];

        for (let i=0; i<setlist.titles.length; i++) {
            titles.push (new Title2by (setlist.titles[i]));
        }

        for (let i=0; i<titles.length; i++) {
            let t = titles[i];
            let scorePart;

            for (let j=0; j<t.docs.length; j++) {

                let d = t.docs[j];

                if (d[CDF_PARTS_PART_COL] == part_type) {
                    scorePart = d;
                    break;
                }

                if (d[CDF_PARTS_PART_COL] == "Combo score" || 
                    d[CDF_PARTS_PART_COL] == "Full score"
                )
                {
                    scorePart = d;
                }

            }

            if (scorePart) {
                // get the document
                let myDoc = DocumentApp.openByUrl(scorePart[CDF_PARTS_URL_COL]);

                let myImages = myDoc.getBody().getImages();

                let titlesPagesArrayPos;

                for (let k=0; k<titlesPagesArray.length; k++) {
                    if (titlesPagesArray[k].title == t.title) {
                        titlesPagesArrayPos = k;
                        break;
                    }
                }

                if (myImages.length == 1) {
                    
                    titlesPagesArray[titlesPagesArrayPos].page_number =
                        (docsArray.length + 1);
                    
                    docsArray = docsArray.concat(myImages);
                }
                else if (myImages.length > 1 && docsArray.length % 2 !== 0) {
                    titlesPagesArray[titlesPagesArrayPos].page_number =
                        (docsArray.length + 1);
                    
                    docsArray = docsArray.concat(myImages);                 
                }
                else if (myImages.length > 1) {
                    docsArray = docsArray.concat(blankImages);
                    titlesPagesArray[titlesPagesArrayPos].page_number =
                        (docsArray.length + 1);
                    
                    docsArray = docsArray.concat(myImages);
                }

            }
        }

        let body = setlistDoc.getBody();

        body.clear();
        body.setPageWidth(inchesToPoints(17));
        body.setPageHeight(inchesToPoints(11));

        body.setMarginTop(inchesToPoints(0.5));
        body.setMarginBottom(inchesToPoints(0.5));
        body.setMarginLeft(inchesToPoints(0.5));
        body.setMarginRight(inchesToPoints(0.5));

        if (docsArray.length > 64) { // old value 16
            let remainder = docsArray.length % 64;

            let endNum;
            if (remainder > 0) {
                endNum = Math.ceil(remainder / 4) * 4;
            }

            if (endNum) {
                for (let i=remainder; i<endNum; i++) {
                    docsArray.push(BLANK_IMAGE.getImages()[0]);
                }
            }

            makeSignature ({
                setlist: setlistDoc,
                pages: docsArray.length,
                images: docsArray
            });

        }
        else {
            let base = Math.ceil(docsArray.length / 4 );
            let remainder = docsArray.length % 4;
            let endNum;

            if (remainder > 0) {
                endNum = 4;
            }

            if (endNum) {
                for (let i=remainder; i<endNum; i++) {
                    docsArray.push (BLANK_IMAGE.getImages()[0]);
                }
            }

            makeSignature ({
                setlist: setlistDoc,
                pages: base,
                images: docsArray
            });

        }

        updateList ({
            // list: titleSheet,
            pagesArray: titlesPagesArray,
            setlistDoc: setlistDoc,
            indexNumPages: indexNumPages,
            setlist: setlist,
            sortedArray: sortedArray,
            indexTitle: "2by2bas set: " + setlist.name + " - " + part_type,
        });

        if (!rewrite) {
            // update the Setlist documents sheet
            let sheetData = SETLIST_DOCUMENTS_SHEET.getDataRange().getValues();

            // get next id
            let sheetIds = SETLIST_DOCUMENTS_SHEET.getDataRange().getValues();
            sheetIds.splice(0, 1);
            const idsColumn = sheetIds.map(row => row[SDS_ID_COL]);
            
            let newDataRow = new Array(SDS_DATA_COLS_NUM);

            if (idsColumn.length <= 0) {
                newDataRow[SDS_ID_COL] = 1;
            }
            else {
                newDataRow[SDS_ID_COL] = Math.max(...idsColumn) + 1;
            }

            newDataRow[SDS_SETLIST_ID_COL] = setlist_id;
            newDataRow[SDS_GDOC_NAME_COL] = setlistDoc.getName();
            newDataRow[SDS_PART_NAME_COL] = part_type;
            newDataRow[SDS_GOOGLE_ID_COL] = setlistDoc.getId();
            newDataRow[SDS_URL_COL] = setlistDoc.getUrl();

            sheetData[sheetData.length] = newDataRow;

            let sheetRange = SETLIST_DOCUMENTS_SHEET.getRange(
                1, 
                1, 
                sheetData.length,
                sheetData[0].length
            );
            sheetRange.setValues(sheetData);

            setlist.getDocuments();

            let docsCell = SETLIST_FORM_SHEET.getRange(SETLIST_PRINT_CELL);
            docsCell.clearDataValidations();
            docsCell.clearContent();
            if (setlist.documentsRich) {
                docsCell.setRichTextValue(setlist.documentsRich.build());
            }
        }

        statusCell.setValue("Done!");

        return true;


    } catch (error) {
        sendAlert ("Error writing print part: " + error);
        statusCell.setValue("Error writing print part: " + error);
        return false;
    }

}