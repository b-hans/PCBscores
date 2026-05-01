function getNewScoreId() {
    const idRange = SCORES_SHEET.getRange(2, 1, SCORES_SHEET.getLastRow(), 1);

    const idData = idRange.getValues().flat();

    if (idData.length < 1) {
        return 1;
    }
    else {
        return Math.max(...idData) + 1;
    }
}