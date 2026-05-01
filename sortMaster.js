function sortMaster ( type ) {

    let sortArray = [];

    switch (type) {
        case "title":

            sortArray.push ({
                column: MASTER_TITLE_COL+1,
                ascending: true
            });
            break;

        case "number":
            sortArray.push ({
                column: MASTER_2BY_COL+1,
                ascending: true
            });
            sortArray.push ({
                column: MASTER_TITLE_COL+1,
                ascending: true
            });
            break;

        case "id":
            sortArray.push ({
                column: MASTER_ID_COL+1,
                ascending: true
            });
            break;
    }

    // get the range first
    let sortRange = MASTER_SHEET.getRange(
        MASTER_START_ROW, 
        1, 
        MASTER_SHEET.getLastRow() - MASTER_START_ROW + 1, 
        MASTER_NUM_COLS);

    sortRange.sort(sortArray);


}