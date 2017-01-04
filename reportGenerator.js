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

const headerFunction = (report) => {
  report.print("Individual missing addresses report", {fontSize: 22, bold: true, x:80, underline:true, align: "center"});
  report.newLine(2);
  report.band(
    [
      {data: "Customer name", width:180, fontSize: 16, bold: true, textColor: "#173059"},
      {data: "File manager", width:180, bold: true, fontSize: 16, textColor: "#173059"},
      {data: "Relationship started", width:180, fontSize: 16, bold: true, textColor: "#173059"},
      {data: "Customer Risk", width:180, fontSize: 16, bold: true, textColor: "#173059"}
    ]
  );
};

const footerFunction = (report) => {
  report.line(report.currentX(), report.maxY()-18, report.maxX(), report.maxY()-18);
  report.pageNumber({text: "Page {0} of {1}", footer: true, align: "right"});
  report.print("Printed: "+(new Date().toLocaleDateString()), {y: report.maxY()-14, align: "left"});
};

const testDetail = ( report, data ) => {
  report.band(
    [
      {data: data.customerName, width:180, fontSize: 12, textColor: "#173059", align:"left"},
      {data: data.fileManager, width:180, fontSize: 12, textColor: "#173059", align:"left"},
      {data: data.relationshipDate, width:180, fontSize: 12, textColor: "#173059", align:"left"},
      {data: data.customerRisk, width:100, fontSize: 12, textColor: "#173059", align:"center"}
    ]
  );
};


rimraf.sync("missingAddressesInd.pdf");

const print = function(name, headers, data, options) {
  const rpt = new report(name, options)
   .data(data)
   .pageHeader(headerFunction)
   .pageFooter(footerFunction)
   .detail(testDetail)
   .render();
 };

const headers = [ "Customer name", "File manager", "Relationship Started", "Customer Risk"];
const options = { landscape: true };

print("missingAddressesInd.pdf", headers, data, options);
