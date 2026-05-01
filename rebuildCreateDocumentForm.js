function rebuildCreateDocumentForm ( ) {
    
    try {

        const sheet = CDF_SHEET;

        for (let i=0; i<CDF_ROW_HEIGHTS.length; i++) {
            sheet.setRowHeight(i+1, CDF_ROW_HEIGHTS[i]);
        }

        for (let i=0; i<CDF_COLUMN_WIDTHS.length; i++) {
            sheet.setColumnWidth(i+1, CDF_COLUMN_WIDTHS[i]);
        }

        // #a2c4c9 Create Document Form
        let formTitleRange = sheet.getRange(CDF_FORM_TITLE_RANGE);
        formTitleRange.setBackgroundColor('#a2c4c9');
        formTitleRange.merge();
        formTitleRange.setBorder( true, true, true, true, false, false,
            '#000000',
            SpreadsheetApp.BorderStyle.SOLID_THICK);

        applyCdfStyles ( formTitleRange, "FORM_TITLE", "Create Document Form");

        // #f3f3f3

        // BUTTON RANGE #FFFFFF

        // STATUS RANGE #f4cccc

        sheet.getRange(CDF_FORM_BODY_RANGE).setBackgroundColor('#f3f3f3');
        let bodyRange = sheet.getRange(CDF_FORM_BODY_RANGE)
            .setBorder( true, true, true, true, false, false,
            '#000000',
            SpreadsheetApp.BorderStyle.SOLID_THICK
        );

        // CURRENT PARTS HERE
        // #d9ead3
        // #fff2cc

        let partsHead = sheet.getRange(CDF_CURRENT_PARTS_TAG);
        partsHead.setBackgroundColor('#d9ead3')
        applyCdfStyles(partsHead, 'TAG_STATUS', 'Current documents');
        partsHead.setBorder( true, true, null, null, false, false,
            '#000000',
            SpreadsheetApp.BorderStyle.SOLID_MEDIUM
        );

        let partsBody = sheet.getRange(CDF_CURRENT_PARTS_RANGE);
        partsBody.setBorder( false, true, true, null, false, false,
            '#000000',
            SpreadsheetApp.BorderStyle.SOLID_MEDIUM
        );
        applyCdfStyles(partsBody, "DROPDOWN");
        partsBody.setBackgroundColor('#fff2cc');


        let titleTag = sheet.getRange(CDF_TITLE_TAG);
        applyCdfStyles( titleTag, "TAG", "Title: ");

        let titleCell = sheet.getRange(CDF_TITLE_CELL);
        applyCdfStyles( titleCell, 'INPUT');
        titleCell.setHorizontalAlignment('left');
        titleCell.setVerticalAlignment('top');
        titleCell.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);

        let idTag = sheet.getRange(CDF_ID_TAG);
        applyCdfStyles(idTag, 'TAG', 'ID: ');

        let idCell = sheet.getRange(CDF_ID_CELL);
        applyCdfStyles(idCell, 'INPUT');

        let statusTag = sheet.getRange(CDF_STATUS_TAG_RANGE);
        statusTag.merge();
        applyCdfStyles(statusTag, 'TAG_STATUS', 'Status');

        let statusRange = sheet.getRange(CDF_STATUS_RANGE);
        statusRange.merge();
        statusRange.setBackgroundColor('#f4cccc');
        applyCdfStyles(statusRange, 'STATUS', 'Form has been rebuilt');
        statusRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);

        let partTag = sheet.getRange(CDF_PART_TAG);
        applyCdfStyles(partTag, 'TAG', 'Part type: ');

        let partCell = sheet.getRange(CDF_PART_CELL);
        partCell.clearDataValidations();
        partCell.clearContent();
        applyCdfStyles(partCell, 'DROPDOWN');

        partCell.setDataValidation(CDF_SCORES_RULE);
        partCell.setValue("Select a score type");
        partCell.setBackgroundColor('#ffffff');

        let actionTag = sheet.getRange(CDF_ACTIONS_TAG);
        applyCdfStyles(actionTag, 'TAG', 'Menu: ');

        let actionCell = sheet.getRange(CDF_ACTIONS_CELL);
        actionCell.clearDataValidations();
        actionCell.clearContent();
        actionCell.setDataValidation(CDF_ACTIONS_RULE);

        applyCdfStyles(actionCell, 'DROPDOWN', 'Choose an action');


        let buttonRange = sheet.getRange(CDF_BUTTON_RANGE);
        buttonRange.merge();
        buttonRange.setBackgroundColor('#ffffff');
        buttonRange.setBorder( true, true, true, true, false, false,
            '#000000',
            SpreadsheetApp.BorderStyle.SOLID_MEDIUM
        );

        return true;
    }
    catch (error) {
        sendAlert ("Error rebuilding create document form: " + error);
        return false;
    }
}