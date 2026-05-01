function listByTitle( type = null ) {
    const statusCell = MASTER_SHEET.getRange(MASTER_STATUS_CELL);

    let listDocs;
    let listDoc;
    let docFilename;

    if (type == "number") {
        docFilename = LIST_NUM_NAME;
    }
    else {
        docFilename = LIST_ALPHA_NAME;
    }

    listDocs = LISTS_FOLDER.getFilesByName(docFilename);
    
    if (!listDocs.hasNext()){
        listDoc = DocumentApp.create(docFilename);
        let myId = listDoc.getId();
        let myFile = DriveApp.getFileById(myId);
        myFile.moveTo(LISTS_FOLDER);
    }
    else {
        let myId = listDocs.next().getId();
        listDoc = DocumentApp.openById(myId);
    }

    const myBody = listDoc.getBody();
    myBody.clear();
    myBody.setAttributes(STYLE_BODY);

    let titlePar = myBody.getParagraphs()[0];

    titlePar.appendText("2by2bas Title List");
    titlePar.setAttributes(STYLE_TITLE);

    // get data from master
    const titleData = MASTER_SHEET.getDataRange().getValues();
    titleData.splice(0, MASTER_NUM_MENU_ROWS);

    titleData.sort((a, b) => {
        if ( type == "number" ){
            if (a[MASTER_2BY_COL] == b[MASTER_2BY_COL]) {
                return 0;
            }
            else {
                return a[MASTER_2BY_COL] < b[MASTER_2BY_COL] ? -1 : 1;
            }
        }
        else {
            if (a[MASTER_TITLE_COL] == b[MASTER_TITLE_COL]) {
                return 0;
            }
            else {
                return a[MASTER_TITLE_COL] < b[MASTER_TITLE_COL] ? -1 : 1;
            }            
        }
    });

    let titleObjects = titleData.map (row => {
        return new Title2by(row[MASTER_ID_COL]);
    });

    // insert table
    let myTable = myBody.appendTable();
    myTable.setAttributes(STYLE_TABLE);

    // insert header row
    let row1 = myTable.appendTableRow();

    /**
     * colStyles: [STYLE_ID, 
     * STYLE_TYPE_SONG, STYLE_TYPE_ARTIST, STYLE_TYPE_DETAILS],
      tableTitle: 'Repertoire',
      headerColor: '#B4CDCD',
     */

    for (let i=0; i<LIST_TABLE_HEADINGS.length; i++) {
        let myCell = row1.appendTableCell()
            .asText()
            .setText(LIST_TABLE_HEADINGS[i]);

        myCell.setBackgroundColor("#B4CDCD");
    }

    for (let i=0; i<titleObjects.length; i++) {
        let cellBack;

        if (i % 2 === 0) {
            cellBack = "#FFFFFF";        
        }
        else {
            cellBack = "#F2F2F2";
        }

        let titleRow = myTable.appendTableRow();
        titleRow.setBackgroundColor(cellBack);

        let titleCell;

        titleCell = titleRow.appendTableCell().editAsText()
            .setText(titleObjects[i].title);
        titleCell.setBackgroundColor(cellBack);

        titleCell = titleRow.appendTableCell().editAsText()
            .setText(titleObjects[i].tby_num);
        titleCell.setBackgroundColor(cellBack);

        titleCell = titleRow.appendTableCell().editAsText()
            .setText(titleObjects[i].notes);
        titleCell.setBackgroundColor(cellBack);

        if (titleObjects[i].scores.length >= 1) {

            let scoreCell = titleRow.appendTableCell();

            for (let j=0; j<titleObjects[i].scores.length; j++) {
                let myScore = titleObjects[i].scores[j];
                scoreCell.editAsText()
                    .appendText(myScore[SCORES_TYPE_COL] + "\n");
            }

            let myText = scoreCell.editAsText();

            for (let j=0; j<titleObjects[i].scores.length; j++) {
                let myScore = titleObjects[i].scores[j];

                let startIndex = myText.getText()
                    .indexOf(myScore[SCORES_TYPE_COL]);
                
                // Search and insert url links in cell
                // LINKS CELL
                if (startIndex !== -1) {
                    let endIndex = startIndex + myScore[SCORES_TYPE_COL].length;
                    myText.setLinkUrl(startIndex, 
                        endIndex,
                        myScore[SCORES_URL_COL]
                    );
                }
            }

            scoreCell.setBackgroundColor(cellBack);

        }
        else {
            titleCell = titleRow.appendTableCell();
            titleCell.setBackgroundColor(cellBack);
        }
        

    }

    return listDoc;

}