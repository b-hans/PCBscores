function rebuildInputForm ( ) {

    try {
        const sheet = TITLE_SHEET;

        sheet.showColumns(SEARCH_TITLE_COL, SEARCH_NUM_COLS);
        sheet.showRows(SCORE_TYPE_ROW);

        let columnWidths = [
            127,
            211,
            100,
            100,
            100,
            176,
            40,
            119
        ];

        // set column widths
        for (let i=0; i<columnWidths.length; i++) {
            sheet.setColumnWidth ((i+1), columnWidths[i]);
        }

        const statusRowHeight = 93;
        const tagRowHeight = 34;

        let rowHeights = [ 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 
            21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21 ];

        rowHeights[INPUT_STATUS_ROW-1] = statusRowHeight;
        rowHeights[SCORE_TYPE_ROW-1] = tagRowHeight;
        rowHeights[INPUT_TITLE_ROW_NUM-1] = tagRowHeight;
        rowHeights[ID_MENU_ROW_NUM-1] = tagRowHeight;
        rowHeights[TYPE_ROW_NUM-1] = tagRowHeight;
        rowHeights[INPUT_2BY_ROW_NUM-1] = tagRowHeight;
        rowHeights[INPUT_NOTES_ROW_NUM-1] = tagRowHeight;

        for (let i=0; i<rowHeights.length; i++) {
            sheet.setRowHeight((i+1), rowHeights[i]);
        }

        /**
         * STATUS RANGE
         * 
         * INPUT_STATUS_RANGE
         * 
         * BACKGROUND COLOR: #efefef
         * 
         * Row height: 93
         * 
         * font: Arial
         * size: 14
         * horizontalAlignment: left
         * vertialAlignment: middle
         * color: #cc0000
         */

        let statusCell = sheet.getRange(INPUT_STATUS_RANGE);
        statusCell.merge()
            .setFontFamily('Arial')
            .setFontColor('#cc0000')
            .setFontSize(14)
            .setFontWeight('normal')
            .setFontStyle('normal')
            .setHorizontalAlignment('left')
            .setVerticalAlignment('middle')
            .setValue('')
            .setBorder(
                true,
                true,
                false,
                true,
                false,
                false,
                '#000000',
                SpreadsheetApp.BorderStyle.SOLID_THICK
            )
            .setBackgroundColor('#efefef');



        /**
         *  A2:E24
         *  INPUT_MAIN_FORM_RANGE
         * 
         *  Background color #d0e0e3
         */

        let mainRange = sheet.getRange(INPUT_MAIN_FORM_RANGE);        
        mainRange.setBackgroundColor('#d0e0e3');
        mainRange.setBorder(
            false,
            true,
            true,
            true,
            false,
            false,
            '#000000',
            SpreadsheetApp.BorderStyle.SOLID_THICK
        );

        /**
         * BUTTON RANGE
         * INPUT_BUTTON_RANGE
         * 
         * BACKGROUND COLOR: #f3f3f3
         */

        let buttonRange = sheet.getRange(INPUT_BUTTON_RANGE);
        buttonRange.merge();
        buttonRange.setBackgroundColor('#f3f3f3');

        /**
         * Score type row (number 3) height 21
         * 
         * 
         * B3
         * Background color: white
         * rule for the dropdown
         * 
         * A3 Tag font:
         * Caveat 17 normal normal black center middle
         * 
         * Column widths
         * Widths:
            1: 127
            2: 211
            3: 100
            4: 100
            5: 100
            6: 176
            7: 40
            8: 119
         * 
         * 
         */

        // get the menu choices
        let types = SpreadsheetApp.getActive().getSheetByName('Types')
            .getRange("B:B").getValues().flat();

        let filteredTypes = types.filter(item => {
            if (item) {
                return true;
            }
            return false;
        });

        filteredTypes.splice(0, 1);

        // create the rule
        let scoreTypeRule = SpreadsheetApp.newDataValidation()
            .requireValueInList (filteredTypes, true)
            .setHelpText('Select an option from the list.')
            .build();

        sheet.getRange(INPUT_SCORE_TYPE)
            .setDataValidation(scoreTypeRule);
        applyInputStyles(sheet.getRange(INPUT_SCORE_TYPE));

        applyTagStyles(sheet.getRange(INPUT_SCORE_TYPE_TAG), "Score type");

        /**
         * Number of pages
         * 
         */

        let numPagesTagRange = sheet.getRange(NUM_PAGES_TAG_RANGE);
        applyTagStyles(numPagesTagRange, "No of pages");

        let numPagesRange = sheet.getRange(NUM_PAGES_RANGE);
        applyInputStyles(numPagesRange);
        numPagesRange.setValue('');

        /**
         * ID AND MENU ROW
         * 
         * Row height: 21
         * 
         */

        applyTagStyles(sheet.getRange(INPUT_ID_TAG_CELL), "ID");
        let idCell = sheet.getRange(INPUT_ID_CELL);
        applyInputStyles(idCell);

        // form menu options
        const formMenuOptions = [
            'Menu',
            'Add',
            'Enter',
            'Search title',
            'Searcn no.',
            'Upload score',
            'Create document',
            'Rebuild form',
            'Cancel'
        ];

        let formMenuRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(formMenuOptions, true)
            .build();

        let menuCells = sheet.getRange(MENU_RANGE);
        menuCells.clearDataValidations();
        menuCells.clearContent();
        menuCells.merge();
        menuCells.setBackgroundColor('#ffffff');
        menuCells.setDataValidation(formMenuRule);
        applyInputStyles(menuCells, 'Menu');
        // menuCells.setHorizontalAlignment('center');
        // menuCells.setVerticalAlignment('middle');

        /**
         * Title row: INPUT_TITLE_ROW_NUM
         * Row height: 21
         */

        applyTagStyles(sheet.getRange(INPUT_TITLE_TAG_CELL), 'Title');
        let titleCell = sheet.getRange(INPUT_TITLE_CELL);
        applyInputStyles(titleCell);
        titleCell.setHorizontalAlignment('left')
            .setVerticalAlignment('top')
            .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);

        // sheet.getRange(INPUT_2BY_NUMBER).setBackgroundColor('#ffffff');
        let num2by = sheet.getRange(INPUT_2BY_NUMBER);
        applyInputStyles(num2by);

        applyTagStyles(sheet.getRange(INPUT_2BY_NUMBER_TAG), '2by2bas no.');

        applyTagStyles(sheet.getRange(INPUT_NOTES_TAG_CELL), "Notes");

        let notesRange = sheet.getRange(INPUT_NOTES_RANGE);
        notesRange.merge();
        applyInputStyles(notesRange);
        notesRange.setHorizontalAlignment('left')
            .setVerticalAlignment('top')
            .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);

        // types
        let scoreTypes = SpreadsheetApp.getActive().getSheetByName('Types')
            .getRange("A:A").getValues().flat();

        let filteredScoreTypes = scoreTypes.filter(item => {
            if (item) {
                return true;
            }
            return false;
        });

        filteredScoreTypes.splice(0, 1);

        applyTagStyles(sheet.getRange(INPUT_TYPE_TAG_CELL), "Type");

        let typeCell = sheet.getRange(INPUT_TYPE_CELL);
        typeCell.clearDataValidations();
        typeCell.clearContent();

        let typeRule = SpreadsheetApp.newDataValidation()
            .requireValueInList (filteredScoreTypes, true)
            .setHelpText('Select an option from the list.')
            .build();
        typeCell.setDataValidation(typeRule);
        applyInputStyles(typeCell);

        /**
         * 
         * Harold's fields
         */

        applyTagStyles(sheet.getRange(INPUT_COMPOSER_LAST_TAG), "Composer last");
        let composerLastCell = sheet.getRange(INPUT_COMPOSER_LAST_CELL);
        applyInputStyles(composerLastCell);

        applyTagStyles(sheet.getRange(INPUT_COMPOSER_FIRST_TAG), "Composer first");
        let composerFirstCell = sheet.getRange(INPUT_COMPOSER_FIRST_CELL);
        applyInputStyles(composerFirstCell);

        applyTagStyles(sheet.getRange(INPUT_ARR_LAST_TAG), "Arranger last");
        let arrLastCell = sheet.getRange(INPUT_ARR_LAST_CELL);
        applyInputStyles(arrLastCell);

        applyTagStyles(sheet.getRange(INPUT_ARR_FIRST_TAG), "Arranger first");
        let arrFirstCell = sheet.getRange(INPUT_ARR_FIRST_CELL);
        applyInputStyles(arrFirstCell);

        applyTagStyles(sheet.getRange(INPUT_LENGTH_TAG), "Length");
        let lengthCell = sheet.getRange(INPUT_LENGTH_CELL);
        applyInputStyles(lengthCell);
        lengthCell.setNumberFormat("@");

        applyTagStyles(sheet.getRange(INPUT_TEMPO_TAG), "Tempo");
        let tempoCell = sheet.getRange(INPUT_TEMPO_CELL);
        applyInputStyles(tempoCell);

        applyTagStyles(sheet.getRange(INPUT_DATE_TAG), "Date");
        let dateCell = sheet.getRange(INPUT_DATE_CELL);
        applyInputStyles(dateCell);


        /**
         * 
         * SEARCH AREAS
         * 
         * Title row background: #000000
         * Title row font: Arial 10 normal normal left middle #ffffff 
         * 
         * Header row background: #e6b8af
         * */        

        let searchTitleRange = sheet.getRange(SEARCH_TITLE_RANGE);
        searchTitleRange.merge();
        applyNormalStyles(searchTitleRange, 'Uploaded scores');
        searchTitleRange.setFontColor('#ffffff');
        searchTitleRange.setBackgroundColor('#000000');

        let searchHeader = sheet.getRange(SEARCH_HEADING_RANGE);
        searchHeader.setBackgroundColor('#e6b8af');

        let searchHeaderTitle = sheet.getRange(SEARCH_TITLE_CELL);
        applyNormalStyles(searchHeaderTitle, 'Type/URL');
        searchHeaderTitle.setHorizontalAlignment('center')
            .setVerticalAlignment('middle')
            .setFontWeight('bold');

        let searchHeaderId = sheet.getRange(SEARCH_ID_CELL);
        applyNormalStyles(searchHeaderId, 'Id');
        searchHeaderId.setHorizontalAlignment('center')
            .setVerticalAlignment('middle')
            .setFontWeight('bold');

        let searchHeaderAction = sheet.getRange(SEARCH_ACTIONS_CELL);
        applyNormalStyles(searchHeaderAction, 'Actions');
        searchHeaderAction.setHorizontalAlignment('center')
            .setVerticalAlignment('middle')
            .setFontWeight('bold');

        // back color #faf4c6
        let searchBodyRange = sheet.getRange(SEARCH_BODY_RANGE);
        searchBodyRange.setBackgroundColor('#faf4c6');

        searchBodyRange.clearDataValidations();
        searchBodyRange.clearContent();

        searchBodyRange.setFontFamily('Arial')
            .setFontSize(10)
            .setFontWeight('normal')
            .setFontStyle('normal')
            .setVerticalAlignment('top')
            .setHorizontalAlignment('left');

        // Arial 10 normal normal left middle

        return true;
    }
    catch (error) {
        sendAlert ("Error rebuilding input form: " + error);
        return false;
    }
}