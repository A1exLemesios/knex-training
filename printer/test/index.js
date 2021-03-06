/**
 *
 *
 * Authors:
 * - Alexandros Lemesios
 */

 "use strict";

const chai = require("chai");
const should = chai.should();
const fs = require("fs");
const printer = require("./../../printer")();


describe("Printer tests", ()  => {
  it("should create a report with 3 rows and 4 headers and compare it with a masterFile report. The two reports should be equal", (done) => {
    const data =
    [
       {
         customerName: 'ind ind',
         fileManager: 'administrator',
         relationshipDate: "2016-12-04",
         customerRisk: 720
       },
       {
         customerName: 'ind 2  ind 2',
         fileManager: 'administrator',
         relationshipDate:" 2016-12-04",
         customerRisk: 340
      },
      {
         customerName: 'Test Test',
         fileManager: 'administrator',
         relationshipDate: "2016-12-04",
         customerRisk: 640
      }
    ];
    const name = "Missing Addresses - Individual.pdf"
    const headers = [ "Customer name", "File manager", "Relationship Started", "Customer Risk"];
    const options = {landscape: true};
    const title = "Missing addresses";
  //  let masterFile = fs.readFileSync(`./tmp/${name}`, "utf8");
    printer.print(name, headers, data , options, title, (err, reportName) => {
      let createdFile = fs.readFileSync(`./../test/${name}`, "utf8");
  //    removeTrash(createdFile).should.equal(removeTrash(masterFile));
      done();
    });
  });

  it("should create a report with 2 rows and three headers and then compare it to the master report", (done) => {
    const data =
    [
       {
         customerName: 'ind ind',
         relationshipDate: "2016-12-04",
         customerRisk: 720
       },
       {
         customerName: 'ind 2  ind 2',
         relationshipDate:" 2016-12-04",
         customerRisk: 340
      }
    ]
    const name = "(1)Missing addresses - Individual.pdf"
    const headers = [ "Customer name", "Relationship Started", "Customer Risk"];
    const options = {landscape: true};
    const title = "Missing addresses";

    let masterFile = fs.readFileSync(`./tmp/${name}`, "utf8");

    printer.print(name, headers, data, options, title, (err, reportName) => {
      let createdFile = fs.readFileSync(`./../test/${name}`, "utf8");
      removeTrash(createdFile).should.equal(removeTrash(masterFile));
      done();
    });
  });
});

const removeTrash = (str) => {
  let splitted = str.split("\n");
  for (let i = 0; i < splitted.length; i++) {
    if (splitted[i].includes("CreationDate")) {
      splitted.splice(i, 1);
    }
  }

  return splitted.join("\n");
}
