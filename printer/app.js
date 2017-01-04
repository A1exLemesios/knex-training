"use strict"

const printer = require("./index.js")();


const datas =
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
]

let name = "Missing addresses - Individual.pdf"
const headers = [ "Customer name", "File manager", "Relationship Started", "Customer Risk"];
let options = {landscape: true};
printer.print(name, headers, datas, options);
