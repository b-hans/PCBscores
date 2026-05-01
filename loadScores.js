function loadScores( title ) {

    clearSearch();
    
    let insertRow = SEARCH_RESULTS_ROW_START;

    let rule = SpreadsheetApp.newDataValidation()
        .requireValueInList(['Delete this pdf'])
        .build(); 

    if (title.scores && title.scores.length > 0) {
        for (let i=0; i<title.scores.length; i++) {
            let rowData = title.scores[i];

            let scoreURL = rowData[SCORES_URL_COL];
            let scorePart = rowData[SCORES_TYPE_COL];
            
            const value = SpreadsheetApp.newRichTextValue()
                .setText(scorePart + ' pdf')
                .setLinkUrl(scoreURL)
                .build();
            
            TITLE_SHEET.getRange(insertRow, SEARCH_TITLE_COL)
                .setRichTextValue(value);
            TITLE_SHEET.getRange(insertRow, SEARCH_ID_COL)
                .setValue(rowData[SCORES_ID_COL]);
            TITLE_SHEET.getRange(insertRow, SEARCH_ACTIONS_COL)
                .setDataValidation(rule);

            insertRow++;

        }
    }

    rule = SpreadsheetApp.newDataValidation()
        .requireValueInList(['Delete this document'])
        .build(); 


    if (title.docs && title.docs.length > 0) {
        for (let i=0; i<title.docs.length; i++) {
            let rowData = title.docs[i];

            let scoreURL = rowData[CDF_PARTS_URL_COL];
            let scorePart = rowData[CDF_PARTS_PART_COL];
            
            const value = SpreadsheetApp.newRichTextValue()
                .setText(scorePart + ' document')
                .setLinkUrl(scoreURL)
                .build();
            
            TITLE_SHEET.getRange(insertRow, SEARCH_TITLE_COL)
                .setRichTextValue(value);
            TITLE_SHEET.getRange(insertRow, SEARCH_ID_COL)
                .setValue(rowData[CDF_PARTS_DOC_ID_COL]);
            TITLE_SHEET.getRange(insertRow, SEARCH_ACTIONS_COL)
                .setDataValidation(rule);

            insertRow++;

        }
    }

}