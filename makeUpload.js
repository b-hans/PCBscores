function makeUpload ( obj ) {

    const title_id = TITLE_SHEET.getRange(INPUT_ID_CELL).getValue();
    const score_type = TITLE_SHEET.getRange(INPUT_SCORE_TYPE).getValue();
    let score_id = getNewScoreId();

    const newFileName = "scoreid_" + score_id + 
        "_titleid_" + title_id + "_type_" + score_type + ".pdf";

    let blob = Utilities.newBlob(obj.bytes, obj.mimeType, newFileName);
    let folder = DriveApp.getFolderById(SCORES_DRIVE_ID);
    let file = folder.createFile(blob);

    let fileName = file.getName();
    let fileUrl = file.getUrl();

    // add to sheet
    let scoresLastRow = SCORES_SHEET.getLastRow() + 1;

    let numPages = TITLE_SHEET.getRange(NUM_PAGES_RANGE).getValue();

    let newRange = SCORES_SHEET.getRange(scoresLastRow, 1, 1, SCORES_COL_NUM);
    newRange.setValues([[score_id, title_id, fileUrl, score_type, numPages]]);
    TITLE_SHEET.getRange(NUM_PAGES_RANGE).setValue('');

    // clear search and load uploads
    clearSearch();
    const myTitle = new Title2by(title_id);
    loadScores(myTitle);

    TITLE_SHEET.getRange(INPUT_SCORE_TYPE).setValue('');
    TITLE_SHEET.hideRows(SCORE_TYPE_ROW);

    setStatus("EDIT");
    TITLE_SHEET.getRange(TITLE_STATUS_CELL).setValue("Editing....");

    return [fileName, fileUrl];

}