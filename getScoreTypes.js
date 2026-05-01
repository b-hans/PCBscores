function getScoreTypes ( ) {

    try {

        const sheet = SpreadsheetApp.getActive().getSheetByName('Types');
        const typeColumn = sheet.getRange("B:B").getValues().flat();

        const types = typeColumn.filter(item => {
            if (item && item != "Scores") {
                return true;
            }
            else {
                return false;
            }
        });

        return types;

    } catch (error) {
        sendAlert ("Error getting score types: " + error);
        return [];
    }
}