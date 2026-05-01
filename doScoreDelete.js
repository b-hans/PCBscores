function doScoreDelete ( id ) {

    // get the score row
    const scoreData = SCORES_SHEET.getDataRange().getValues();
    scoreData.splice(0, SCORES_MENU_ROWS);

    for (let i=0; i<scoreData.length; i++) {
        if (scoreData[i][SCORES_ID_COL] == id) {

            let scoreUrl = scoreData[i][SCORES_URL_COL];
            let sheetRow = i+2;

            deletePdfByUrl(scoreUrl);
            SCORES_SHEET.deleteRow(sheetRow);
            break;
        }
    }
}