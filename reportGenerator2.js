"use strict";

const Report = require("fluentReports").Report;

//KYC report object
let personData =

  {
      "expiredId": {
          'Customer File No': undefined,
          'Customer Name': 'ind 2  ind 2',
          'ID Expiration Date': '2015-12-12',
          'Responsible Officer': 'approver',
          'Customer Risk': 340

      },
      "missingDocuments":
        [
          {
            'Customer name': 'ind ind',
            'Missing document': 'Due Dilligence QUESTIONAIRE',
            'Relationship Started': '2016-12-04',
            'File manager': 'administrator',
            'Customer Risk': 720
          },
          {
            'Customer name': 'ind ind',
            'Missing document': 'Signature',
            'Relationship Started': '2016-12-04',
            'File manager': 'administrator',
            'Customer Risk': 720
          }
      ],
      "missingAddresses":{
        'Customer name': 'ind 2  ind 2',
        'File manager': 'administrator',
        'Relationship Started': "2016-12-04",
        'Customer Risk': 340
      }
  }

console.log(personData.missingDocuments);
/*const rpt = new Report("Report.pdf")
  .pageHeader( ["Employee Ages"] )
  .data( data )
  .detail( [['name', 200],['age', 50]])
  .render();*/
