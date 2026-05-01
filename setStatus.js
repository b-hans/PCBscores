function setStatus( status ) {
    const myProps = PropertiesService.getUserProperties();

    myProps.setProperty('CURRENT_STATUS', status);

    switch (status) {
        case "EDIT":
        case "UPLOAD":
            TITLE_SHEET.showColumns(SEARCH_TITLE_COL, SEARCH_NUM_COLS);
            TITLE_SHEET.getRange(SEARCH_SCORES_TITLE_CELL).setValue(
                "Uploaded scores");
            TITLE_SHEET.getRange(SEARCH_SCORES_NAME_CELL)
                .setValue("Type/URL");
            TITLE_SHEET.getRange(TITLE_STATUS_CELL).activate();
            break;

        case "SEARCH":
            TITLE_SHEET.showColumns(SEARCH_TITLE_COL, SEARCH_NUM_COLS);
            TITLE_SHEET.getRange(SEARCH_SCORES_TITLE_CELL).setValue(
                "Search results");
            TITLE_SHEET.getRange(SEARCH_SCORES_NAME_CELL)
                .setValue("Title");
            TITLE_SHEET.getRange(TITLE_STATUS_CELL).activate();

            break;

        case "UPLOAD_FORM":
            TITLE_SHEET.getRange(TITLE_STATUS_CELL).activate();
            break;

        case "CREATE_DOCUMENT":
            break;
            
        default:
            TITLE_SHEET.hideColumns(SEARCH_TITLE_COL, SEARCH_NUM_COLS);
            break;
    }


}