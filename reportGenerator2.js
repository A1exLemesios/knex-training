"use strict";

const Report = require("fluentReports").Report;

//KYC report object
let personData =
    {
      "details": {
          "Customer Name": "Alex Lemesios",
          "Date of Birth": "07-01-1991",
          'Customer File No': "001357",
          'Responsible Officer': 'approver',
          'Relationship Started': '2016-12-04',
          'Customer Risk': 720
      },
      "expiredIds": [{
          'ID Expiration Date': '2015-12-12',
          'Responsible Officer': 'approver'
      },
      {
          'ID Expiration Date': '2015-12-12',
          'Responsible Officer': 'approver'
      }],
      "missingDocuments":
        [
          {
            'Missing document': 'Due Dilligence QUESTIONAIRE',
          },
          {
            'Missing document': 'Signature',
          }
        ],
      "missingAddresses":[{
        'Relationship Started': "2016-12-04",
      }],
      "screeningRisks": [
      {
        'Hit type': 'Sanctions List'
      }]
   }

const name = "kycReportInd3.pdf";


 const footerFunction = (report) => {
   report.line(report.currentX(), report.maxY()-18, report.maxX(), report.maxY()-18);
   report.pageNumber({text: "Page {0} of {1}", footer: true, align: "right"});
   report.print("Printed: "+(new Date().toLocaleDateString()), {y: report.maxY()-14, align: "left"});
 }

 const headerFunction = (report, name) => {
   let subString = (name.length) - 4;
   report.print(`${name.substring(0, subString)} Report`, {fontSize: 22, bold: true, underline:true, align: "center"});
   report.newLine(2);
 }

const detailFunction = (report, personData) => {
  let headerOptions = { fill: "#e0e2e5", fontSize: 12, bold: true };
  let details = personData.details;
  let expiredIds = personData.expiredIds;
  let missingDocuments = personData.missingDocuments;
  let missingAddresses = personData.missingAddresses;
  let screeningRisks = personData.screeningRisks;

  report.print("Customer Details :", headerOptions);
  report.newLine(2);
  
  for (let prop in details) {
    report.band([{ data:`${prop}:    ${details[prop]}`,  width: 250, fontSize: 12, bold: true, textColor: "#173059" }]);
  }

  report.newLine(2);

  if (expiredIds.length) {
    const keys = Object.keys(personData.expiredIds[0]);
    let row;

    report.print("Expired IDs :", headerOptions);
    report.newLine(2);

    let headers = keys.map((header) => {
      return {
        data: header,
        width: 120,
        fontSize: 12,
        bold: true,
        textColor: "#173059",
        underline: true
      }
    })
    report.band(headers, { gutter:4});

    expiredIds.forEach((examinedId) => {

      row = keys.map((key) => {
        return {
          data: examinedId[key],
          width: 120,
          fontSize: 12,
          bold: true,
          textColor: "#173059",
          align: "left"
        }
      });
      report.band(row, { gutter: 4 });
    });
  }

  report.newLine(2);

  if (missingDocuments.length) {
    const keys = Object.keys(personData.missingDocuments[0]);
    let row;

    report.print("Missing Documents :", headerOptions);
    report.newLine(2);

    let headers = keys.map((header) => {
      return {
        data: header,
        width: 120,
        fontSize: 12,
        bold: true,
        textColor: "#173059",
        underline: true
      }
    })
    report.band(headers, { gutter:4});

    missingDocuments.forEach((examinedDocument) => {

      row = keys.map((key) => {
        return {
          data: examinedDocument[key],
          width: 120,
          fontSize: 12,
          bold: true,
          textColor: "#173059",
          align: "left"
        }
      });
      report.band(row, { gutter: 4 });
    });
  }

  report.newLine(2);

  if (missingAddresses.length) {
    const keys = Object.keys(personData.missingAddresses[0]);
    let row;

    report.print("Missing Addresses :", headerOptions);
    report.newLine(2);

    let headers = keys.map((header) => {
      return {
        data: header,
        width: 120,
        fontSize: 12,
        bold: true,
        textColor: "#173059",
        underline: true
      }
    })
    report.band(headers, { gutter:4});

    missingAddresses.forEach((examinedAddress) => {

      row = keys.map((key) => {
        return {
          data: examinedAddress[key],
          width: 120,
          fontSize: 12,
          bold: true,
          textColor: "#173059",
          align: "left"
        }
      });
      report.band(row, { gutter: 4 });
    });
  }

  report.newLine(2);

  if (screeningRisks.length) {
    const keys = Object.keys(personData.screeningRisks[0]);
    let row;

    report.print("Screening Risks :", headerOptions);
    report.newLine(2);

    let headers = keys.map((header) => {
      return {
        data: header,
        width: 120,
        fontSize: 12,
        bold: true,
        textColor: "#173059",
        underline: true
      }
    })
    report.band(headers, { gutter:4});

    screeningRisks.forEach((examinedScreeningRisk) => {

      row = keys.map((key) => {
        return {
          data: examinedScreeningRisk[key],
          width: 120,
          fontSize: 12,
          bold: true,
          textColor: "#173059",
          align: "left"
        }
      });
      report.band(row, { gutter: 4 });
    });
  }
}

const rpt = new Report("kycReportInd3.pdf")
  .pageHeader((report) => {
    headerFunction(report, name);
  })
  .pageFooter(footerFunction)
  .data(personData)
  .detail(detailFunction)
  .render();
