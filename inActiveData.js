function inActiveData(){
    currentCellA1 = TITLE_SHEET.getActiveCell().getA1Notation();

    switch (currentCellA1) {

        case INPUT_TITLE_CELL:
        case INPUT_TYPE_CELL:
        case INPUT_2BY_NUMBER:
        case INPUT_NOTES_CELL:
            return false;

        default:
            return true;
    }
}