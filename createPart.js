function createPart () {
    const currentStatus = getStatus();
    const partType = SETLISTS_FORM.getRange(SETLIST_FORM_CREATE_PART).getValue();
    const setlist_id = SETLISTS_FORM.getRange(SETLIST_FORM_ID_CELL).getValue();
    const setlist_title = SETLISTS_FORM.getRange(SETLIST_FORM_NAME_CELL).getValue();
    const statusCell = SETLISTS_FORM.getRange(SETLIST_FORM_STATUS_CELL);

    if (currentStatus != "NEW_SETLIST" && currentStatus != "EDIT_SETLIST") {
        sendAlert ("Check status: " + currentStatus);
        clearSetlist();
        return;
    }


    // if no part selected
    if (!partType || partType == "Select a part") {
        sendAlert ("You must select a part");
        return;
    }

    try {
        // enter without clearing
        if (!enterSetlist( "NO" )) {
            return;
        }

        // is there a part already

        if (partExists (partType, setlist_id)) {
           
            const ui = SpreadsheetApp.getUi();
            const response = ui.alert(
                'This part already exists\n' +
                'Do you want to re-build the part?',
                ui.ButtonSet.YES_NO
            );

            if (response === ui.Button.NO) {
                return;
            }

            // delete the part
            let deletePartSetlist = new Setlist(setlist_id);
            if (!deletePartSetlist.deletePart(partType)) {
                sendAlert("There was an error");
                statusCell.setValue("There was an error");
                return false;
            }

        }

        setStatus ('CREATE_PART');
        statusCell.setValue("Writing setlist part for " + partType);

        let mySetlist = new Setlist(setlist_id);

        let titleArray = [];
        let titlePagesArray = [];

        for (let i=0; i<mySetlist.titles.length; i++) {
            let item = new Title2by(mySetlist.titles[i]);
            titleArray.push(item);
            titlePagesArray.push({
                title: item.title,
                id: item.id,
                pageNum: 'N/A'
            });
        }

        let indexNumPages = Math.ceil(titleArray.length / 22);

        let scoresArray = [];
        for (let i=0; i<titleArray.length; i++) {
            let item = titleArray[i];

            let partScore;
            let partDocument;

            for (let j=0; j<item.scores.length; j++) {
                let score = item.scores[j];

                if (partType == score[SCORES_TYPE_COL]) {
                    partScore = score;
                    break;
                }

                if (score[SCORES_TYPE_COL] == "Combo score" ||
                    score[SCORES_TYPE_COL] == "Full score"
                ){
                   partScore = score;
                }
            }

            if (partScore) {
                scoresArray.push (partScore);
            }
                   
        }

        // create the index pdf here

        let currentPage = indexNumPages + 1;
        for (let i=0; i<scoresArray.length; i++) {

            let item = scoresArray[i];
            let title_id = item[SCORES_TITLE_ID_COL];
            let pages = item[SCORE_PAGES_COL];

            // find title

            for (j=0; j<titlePagesArray.length; j++) {
                let tItem = titlePagesArray[j];

                if (tItem.id == title_id) {
                    // this is the title
                    titlePagesArray[j].pageNum = "Page " + currentPage;
                    currentPage += pages;
                    break;
                }
            }

        }

        titlePagesArray.sort ((a, b) => {

            if (a.title == b.title) {
                return 0;
            }
            else {
                return a.title > b.title ? 1 : -1;
            }

        });

        // write the index document

        // get the table here
        let color1 = '#cccccc';
        let color2 = '#ffffff';

        let indexPdfs = [];

        let curStart = 0;
        outerLoop: for (let i=0; i<indexNumPages; i++) {

            let indexDocument = DocumentApp.create(
                "index_" + setlist_id + "_" + partType
            );

            let indexFile = DriveApp.getFileById(indexDocument.getId());   
            
            let indexBody = indexDocument.getBody();

            indexBody.setMarginTop(inchesToPoints(0.5));
            indexBody.setMarginBottom(inchesToPoints(0.5));
            indexBody.setMarginLeft(inchesToPoints(0.5));
            indexBody.setMarginRight(inchesToPoints(0.5));


            let titlePar = indexBody.getParagraphs()[0];
            titlePar.setText ("Setlist: " + setlist_title);
            titlePar.setAttributes(SETLIST_TITLE);
            titlePar.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

            let indexTable = indexBody.appendTable();
            indexTable.setAttributes(SETLIST_TABLE)
            indexTable.setBorderWidth(0);

            let end = curStart + 22;
            for (let j=curStart; j<end; j++) {
                if (!titlePagesArray[curStart]) {                 
                    break;
                }
                else {
                    let cellColor;
                    if (j % 2 == 0) {
                        cellColor = color1;
                    }
                    else {
                        cellColor = color2;
                    }

                    let row = indexTable.appendTableRow();
                    let cell1 = row.appendTableCell(titlePagesArray[curStart].title);
                    cell1.setBackgroundColor(cellColor);

                    let cell2 = row.appendTableCell(titlePagesArray[curStart].pageNum);

                    let cell2par = cell2.getChild(0).asParagraph();
                    cell2par.setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
                    cell2.setBackgroundColor(cellColor);


                    curStart++;
                }
            }

            indexDocument.saveAndClose();

            indexPdfs.push(DriveApp.createFile(indexDocument.getAs('application/pdf')).getId());
            indexFile.setTrashed(true);

            if (!titlePagesArray[curStart]) {
                break;
            }

        }

        let newScoresArray = scoresArray.map(item => {

            return getFileIdFromUrl(item[SCORES_URL_COL]);
            
        });

        let inputArray = indexPdfs.concat(newScoresArray);

        concatPdfs(inputArray, 
            "Setlist_" + 
            setlist_title + "_" +
            setlist_id + "_" + partType + ".pdf")
                .then (result => {
                    
                    processObject = {
                        pdf_name: result.name,
                        url: result.url,
                        google_id: result.id,
                        part: partType,
                        setlist_id: setlist_id                        
                    }
                    let processStatus = processPart(processObject);
                    if ( processPart !== true) {
                        sendAlert("Error updating spreadsheet with part: " + error);
                        setStatus('EDIT_SETLIST');
                        statusCell.setValue( "Error updating spreadsheet with part: " + error );
                        return false;
                    }

                });

        for (let i=0; i<indexPdfs.length; i++) {
            let dFile = DriveApp.getFileById(indexPdfs[i]);
            dFile.setTrashed(true);
        }

        statusCell.setValue("Success!");
        setStatus('EDIT_SETLIST');

    } catch (error) {
        sendAlert("Error creating part: " + error);
        setStatus('EDIT_SETLIST');
        statusCell.setValue ("Error creating part: " + error);
        return;
    }

}