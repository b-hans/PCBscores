function getTitles ( params ) {
    let masterTitles = MASTER_SHEET.getDataRange().getValues();
    masterTitles.splice(0, MASTER_NUM_MENU_ROWS);

    // filter by params.type
    let filteredTitles = masterTitles.filter(title => {
        if (title[MASTER_TYPE_COL] != params.type) {
            return false;
        }

        for (let i=0; i<params.exclude.length; i++) {
            if (params.exclude[i] == title[MASTER_ID_COL]) {
                return false;
            }
        }

        return true;
    });

    let titleOnly = filteredTitles.map(title => {
        return title[MASTER_TITLE_COL];
    });

    titleOnly.sort();

    return titleOnly;
}