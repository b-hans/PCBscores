function rebuildSetlistInputForm ( ) {

    try {
        const sheet = SETLIST_FORM_SHEET;

        // row heights
        const rowHeights = [ 109, 21, 47, 30, 133, 35, 30 ];

        for (let i=0; i<rowHeights.length; i++) {
            sheet.setRowHeight(i+1, rowHeights[i]);
        }

        // column widths
        const columnWidths = [ 126, 132, 109, 115, 100, 100, 100, 100 ];

        for (let i=0; i<columnWidths.length; i++) {
            sheet.setColumnWidth(i+1, columnWidths[i]);
        }

        // upper menu gray
        sheet.getRange(SETLIST_FORM_UPPER_MENU_RANGE)
            .setBackgroundColor('#f3f3f3');

        // status range #f4cccc

        let statusRange = sheet.getRange(SETLIST_FORM_STATUS_RANGE);
        statusRange.merge();
        statusRange.setBackgroundColor('#f4cccc');
        applyStatusStyles(statusRange);

        // status tag background #f3f3f3
        let statusTagCell = sheet.getRange(SETLIST_FORM_STATUS_TAG_CELL);
        statusTagCell.setBackgroundColor('#f3f3f3')
            .setFontFamily('Comic Sans MS')
            .setFontSize(16)
            .setFontColor('#000000')
            .setFontWeight('normal')
            .setFontStyle('normal')
            .setHorizontalAlignment('right')
            .setVerticalAlignment('middle')
            .setValue('Status: ');
        
        sheet.getRange(SETLIST_FORM_NAME_TAG_CELL)
            .setFontFamily('Arial')
            .setFontSize(12)
            .setFontColor('#000000')
            .setFontWeight('normal')
            .setFontStyle('normal')
            .setHorizontalAlignment('right')
            .setVerticalAlignment('middle')
            .setValue('Setlist name: ');

        // border double color #93ccea
        let setlistNameCell = sheet.getRange(SETLIST_FORM_NAME_CELL);
        setlistNameCell.setBackgroundColor('#ffffff')
            .setFontFamily('Arial')
            .setFontSize(10)
            .setFontColor('#000000')
            .setFontWeight('normal')
            .setFontStyle('normal')
            .setHorizontalAlignment('left')
            .setVerticalAlignment('top')
            .setBorder(
                true,
                true,
                true,
                true,
                false,
                false,
                '#2380b2',
                SpreadsheetApp.BorderStyle.DOUBLE
            );

        sheet.getRange(SETLIST_FORM_ID_TAG_CELL)
            .setFontFamily('Arial')
            .setFontSize(12)
            .setFontColor('#000000')
            .setFontWeight('normal')
            .setFontStyle('normal')
            .setHorizontalAlignment('right')
            .setVerticalAlignment('middle')
            .setValue('Setlist ID: ');

        let setlistIdCell = sheet.getRange(SETLIST_FORM_ID_CELL);
        setlistIdCell.setBackgroundColor('#ffffff')
            .setFontFamily('Arial')
            .setFontSize(10)
            .setFontColor('#000000')
            .setFontWeight('normal')
            .setFontStyle('normal')
            .setHorizontalAlignment('left')
            .setVerticalAlignment('top')
            .setBorder(
                true,
                true,
                true,
                true,
                false,
                false,
                '#2380b2',
                SpreadsheetApp.BorderStyle.DOUBLE
            );

        let printsTitle = sheet.getRange(SETLIST_PRINT_TITLE_RANGE);
        printsTitle.merge();
        printsTitle.setValue("Print documents");
        printsTitle.setBackgroundColor("#f0efeb")
                    .setBorder(
                true, true, true, true, false, false,
                '#000000',
                SpreadsheetApp.BorderStyle.SOLID_THICK
            )
            .setFontFamily('Caveat')
            .setFontSize(14)
            .setFontColor('#000000')
            .setFontWeight('bold')
            .setFontStyle('normal')
            .setHorizontalAlignment('center')
            .setVerticalAlignment('middle');


        let printsBox = sheet.getRange(SETLIST_PRINT_RANGE);
        printsBox.merge();
        printsBox.setBackgroundColor("#fff1e6")
            .setBorder(
                true, true, true, true, false, false,
                '#000000',
                SpreadsheetApp.BorderStyle.SOLID_THICK
            );

        let partsTag = sheet.getRange(SETLIST_FORM_PARTS_TAG_RANGE);
        partsTag.merge();
        partsTag.setBackgroundColor('#f4cccc')
            .setBorder(
                true, true, true, true, false, false,
                '#000000',
                SpreadsheetApp.BorderStyle.SOLID_THICK
            )
            .setFontFamily('Caveat')
            .setFontSize(14)
            .setFontColor('#000000')
            .setFontWeight('bold')
            .setFontStyle('normal')
            .setHorizontalAlignment('center')
            .setVerticalAlignment('middle')
            .setValue('Parts');

        let createPartsTag = sheet.getRange(SETLIST_FORM_CREATE_PARTS_TAG_CELL);
        createPartsTag.setBorder(
            true, true, true, true, false, false,
            '#000000',
            SpreadsheetApp.BorderStyle.SOLID_THICK
            ).setBackgroundColor('#b6d7a8')
            .setFontFamily('Arial')
            .setFontSize(14)
            .setFontColor('#000000')
            .setFontWeight('normal')
            .setFontStyle('normal')
            .setHorizontalAlignment('center')
            .setVerticalAlignment('middle')
            .setValue('Create parts');

        let partsArray = SpreadsheetApp.getActive().getSheetByName('Types')
            .getRange("B:B").getValues().flat();
        let filteredPartsArray = partsArray.filter(item => {
            if (item && item != "Combo score" && item != "Full score") {
                return true;
            }
            return false;
        });
        filteredPartsArray[0] = "Select a part";

        let partsRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(filteredPartsArray, true)
            .build();

        let partDropdown = sheet.getRange(SETLIST_FORM_CREATE_PART);
        partDropdown.clearDataValidations();
        partDropdown.clearContent();
        partDropdown.setBorder(
            true, true, true, false, false, false,
            '#000000',
            SpreadsheetApp.BorderStyle.SOLID_THICK
            )
            .setFontFamily('Arial')
            .setFontSize(10)
            .setFontWeight('normal')
            .setFontStyle('normal')
            .setHorizontalAlignment('center')
            .setVerticalAlignment('middle')
            .setDataValidation(partsRule)
            .setValue('Select a part')
            .setBackgroundColor('#d9ead3');

        let partsButtonRange = sheet.getRange(SETLIST_FORM_PARTS_BUTTON_RANGE);
        partsButtonRange.merge();
        partsButtonRange.setBackgroundColor('#d9ead3')
            .setBorder(
            true, false, true, true, false, false,
            '#000000',
            SpreadsheetApp.BorderStyle.SOLID_THICK
            );

        let buttonRange = sheet.getRange(SETLIST_FORM_BUTTON_RANGE);
        buttonRange.merge();
        buttonRange.setBackgroundColor('#cfe2f3')
            .setBorder(
            true, true, true, true, false, false,
            '#000000',
            SpreadsheetApp.BorderStyle.SOLID_THICK
            );

        // #fce5cd
        let partsRange = sheet.getRange(SETLIST_FORM_PARTS_RANGE);
        partsRange.merge();
        partsRange.setBackgroundColor('#fce5cd')
            .setBorder (
            true, true, true, true, false, false,
            '#000000',
            SpreadsheetApp.BorderStyle.SOLID_THICK
            )
            .setFontFamily('Arial')
            .setFontSize(12)
            .setFontWeight('normal')
            .setFontStyle('normal')
            .setHorizontalAlignment('left')
            .setVerticalAlignment('top');

        // Comic Sans MS 13 bold
        let titlesHeaderRange = sheet.getRange(SETLIST_FORM_TITLES_HEADER_RANGE);
        titlesHeaderRange.merge();
        titlesHeaderRange.setBackgroundColor('#f3f3f3')
            .setFontFamily('Comic Sans MS')
            .setFontSize(13)
            .setFontWeight('bold')
            .setFontStyle('normal')
            .setHorizontalAlignment('left')
            .setVerticalAlignment('middle')
            .setValue('  Titles');

        sheet.getRange(SETLIST_FORM_HEADER_ROW_RANGE)
            .setBackgroundColor('#000000')
            .setFontFamily('Arial')
            .setFontSize(10)
            .setFontWeight('bold')
            .setFontStyle('normal')
            .setFontColor('#ffffff')
            .setHorizontalAlignment('center')
            .setVerticalAlignment('middle');

        const headerValues = [
            'Title name',
            'Actions',
            'Title id',
            'Available parts'
        ];

        for (let i=0; i<headerValues.length; i++) {
            sheet.getRange(
                SETLIST_FORM_HEADER_ROW,
                i+1,
            ).setValue(headerValues[i]);
        }

        sheet.getRange(
            SETLIST_FORM_START_ROW,
            1,
            50,
            6
            )
            .setFontFamily('Arial')
            .setFontSize(10)
            .setFontWeight('normal')
            .setFontStyle('normal')
            .setHorizontalAlignment('left')
            .setBackgroundColor('#ffffff')
            .setVerticalAlignment('top');

        // #d9ead3
        let actionsRange = sheet.getRange(SETLIST_FORM_ACTIONS_RANGE);
        actionsRange.merge();
        actionsRange.setBackgroundColor('#d9ead3');
        actionsRange.setFontFamily('Arial')
            .setFontSize(10)
            .setFontWeight('normal')
            .setFontStyle('normal')
            .setHorizontalAlignment('Center')
            .setVerticalAlignment('middle');

        let actionsOptions = [
            "Actions",
            "Enter",
            "Cancel",
            "Create/edit part",
            "Print part",
            "Remove part"
        ];

        let actionsRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(actionsOptions, true)
            .setAllowInvalid(false)
            .build();

        actionsRange.clearDataValidations();
        actionsRange.clearContent();
        actionsRange.setDataValidation(actionsRule);
        actionsRange.setValue('Actions');

        // sendAlert (actionsRange.getBackgroundColor());

        return true;
    }
    catch (error) {
        sendAlert ("Error rebuilding setlist input form: " + error);
        return false;
    }

}