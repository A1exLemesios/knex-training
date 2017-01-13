/*
 * Printer
 *
 * Authors:
 * Alexandros Lemesios (alexlemesios@gmail.com)
 *
 */

"use strict";

const report = require("fluentreports").Report;


module.exports = function() {

  const printer = {

    print: function(name, headers, data, options, title, cb) {
      const rpt = new report(name, options)
       .data(data)
       .pageHeader((report) => {
         this._headerFunction(report, headers, title)
       })
       .pageFooter(this._footerFunction)
       .detail(this._dataDetail)
       .render((err, reportName) => {
         cb(err, reportName);
       });
    },

    _footerFunction : function(report) {
      report.line(report.currentX(), report.maxY()-18, report.maxX(), report.maxY()-18);
      report.pageNumber({text: "Page {0} of {1}", footer: true, align: "right"});
      report.print("Printed: "+(new Date().toLocaleDateString()), {y: report.maxY()-14, align: "left"});
    },

    _headerFunction: function(report, headers, title) {
      report.print(`${title} Report`, {fontSize: 22, bold: true, underline:true, align: "center"});
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
    },

    _dataDetail: function(report, datum) {
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
    }

  }

  return printer;
}
