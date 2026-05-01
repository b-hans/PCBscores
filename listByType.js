function listByType( ) {
    const statusCell = MASTER_SHEET.getRange(MASTER_STATUS_CELL);

    let listDocs;
    let listDoc;
    const docFilename = LIST_TYPE_NAME;

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

    titlePar.appendText("2by2bas Titles by Type");
    titlePar.setAttributes(STYLE_TITLE);

    // get data from master
    const titleData = MASTER_SHEET.getDataRange().getValues();
    titleData.splice(0, MASTER_NUM_MENU_ROWS);

    titleData.sort((a, b) => {
        if (a[MASTER_TITLE_COL] == b[MASTER_TITLE_COL]) {
            return 0;
        }
        else {
            return a[MASTER_TITLE_COL] < b[MASTER_TITLE_COL] ? -1 : 1;
        }            
    });

    // create filtered arrays
    let typeArrays = [];

    // get the types here - just one column
    let types = TYPES_SHEET
        .getRange(TYPES_FIRST_ROW, TYPES_COL_NUM, TYPES_SHEET.getLastRow(), 1)
        .getValues().flat();

    for (let i=0; i<types.length; i++) {
        if (types[i]) {
            let filteredArray = titleData.filter(row => {
                if (row[MASTER_TYPE_COL] == types[i]) {
                    return true;
                }
                return false;
            });

            typeArrays.push({
                type: types[i],
                titles: filteredArray
            });
        }
    }

    for (let i=0; i<typeArrays.length; i++) {
        let outType = typeArrays[i];

        let titleObjects = outType.titles.map (row => {
            return new Title2by(row[MASTER_ID_COL]);
        });

        let subTitlePar = myBody.appendParagraph(outType.type);
        subTitlePar.setAttributes(STYLE_SUBTITLE);

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

        for (let j=0; j<LIST_TABLE_HEADINGS.length; j++) {
            let myCell = row1.appendTableCell()
                .asText()
                .setText(LIST_TABLE_HEADINGS[j]);

            myCell.setBackgroundColor("#B4CDCD");
        }

        for (let j=0; j<titleObjects.length; j++) {
            let cellBack;

            if (j % 2 === 0) {
                cellBack = "#FFFFFF";        
            }
            else {
                cellBack = "#F2F2F2";
            }

            let titleRow = myTable.appendTableRow();
            titleRow.setBackgroundColor(cellBack);

            let titleCell;

            titleCell = titleRow.appendTableCell().editAsText()
                .setText(titleObjects[j].title);
            titleCell.setBackgroundColor(cellBack);

            titleCell = titleRow.appendTableCell().editAsText()
                .setText(titleObjects[j].tby_num);
            titleCell.setBackgroundColor(cellBack);

            titleCell = titleRow.appendTableCell().editAsText()
                .setText(titleObjects[j].notes);
            titleCell.setBackgroundColor(cellBack);

            if (titleObjects[j].scores.length >= 1) {

                let scoreCell = titleRow.appendTableCell();

                for (let k=0; k<titleObjects[j].scores.length; k++) {
                    let myScore = titleObjects[j].scores[k];
                    scoreCell.editAsText()
                        .appendText(myScore[SCORES_TYPE_COL] + "\n");
                }

                let myText = scoreCell.editAsText();

                for (let k=0; k<titleObjects[j].scores.length; k++) {
                    let myScore = titleObjects[j].scores[k];

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

    }


    return listDoc;

}