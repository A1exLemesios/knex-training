"use strict";

const report  = require("fluentreports").Report;
const rimraf  = require("rimraf");



const data =
[
   {
     customerName: 'ind ind',
     fileManager: 'administrator',
     relationshipDate: "2016-12-04T00:00:00.000Z",
     customerRisk: 720
   },
   {
     customerName: 'ind 2  ind 2',
     fileManager: 'administrator',
     relationshipDate:" 2016-12-04T00:00:00.000Z",
     customerRisk: 340
  },
  {
     customerName: 'Test Test',
     fileManager: 'administrator',
     relationshipDate: "2016-12-04T00:00:00.000Z",
     customerRisk: 640
  }
]

const headerFunction = (report, headers) => {
  report.print("Individual missing addresses report", {fontSize: 22, bold: true, x:80, underline:true, align: "center"});
  report.newLine(2);
  headers = headers.map((header) => {
    return {
      data: header,
      width: 120,
      fontSize: 12,
      bold: true,
      textColor: "#173059"
    }
  })
  report.band(headers, {gutter: 4});
};

const footerFunction = (report) => {
  report.line(report.currentX(), report.maxY()-18, report.maxX(), report.maxY()-18);
  report.pageNumber({text: "Page {0} of {1}", footer: true, align: "right"});
  report.print("Printed: "+(new Date().toLocaleDateString()), {y: report.maxY()-14, align: "left"});
};

const testDetail = (report, datum) => {
  const keys = Object.keys(datum);
  datum = keys.map((key) => {
    return {
      data: datum[key],
      width:120,
      fontSize: 10,
      textColor: "#173059",
      align:"left"
    }
  });
  report.band(datum, { gutter: 4 });
};

const print = function(name, headers, data, options) {

  const rpt = new report(name, options)
   .data(data)
   .pageHeader((report) => {
     headerFunction(report, headers)
   })
   .pageFooter(footerFunction)
   .detail(testDetail)
   .render();
 };

const headers = [ "Customer name", "File manager", "Relationship Started", "Customer Risk"];
const options = { landscape: true };

print("missingAddressesInd.pdf", headers, data, options);
