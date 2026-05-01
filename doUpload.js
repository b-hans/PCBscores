function doUpload() {

    try {
        // check if page no is empty

        const pageNumsRange = TITLE_SHEET.getRange(NUM_PAGES_RANGE);
        const pageNums = pageNumsRange.getValue();
        const scoreTypeRange = TITLE_SHEET.getRange(INPUT_SCORE_TYPE);

        if (!pageNums) {
            scoreTypeRange.setValue('');
            sendAlert ("No of pages is required. Please enter an integer");
            pageNumsRange.activate();
            return false;
        }
        else if (!isPositiveInteger(pageNums)) {
            scoreTypeRange.setValue('');
            sendAlert ("Please enter a positive integer for number of pages.");
            pageNumsRange.setValue('');
            pageNumsRange.activate();
            return false;

        }
        else {
            setStatus('UPLOAD_FORM');

            const scoreType = TITLE_SHEET.getRange(INPUT_SCORE_TYPE).getValue();

            showDialog();

        }


    }
    catch (error) {
        sendAlert ("Error getting upload dialog: " + error);
        return false;
    }

}