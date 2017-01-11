"use strict";

const printer = require("./printer")();


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
  }
]

let name = "(1)Missing addresses - Individual.pdf"
const headers = [ "Customer name", "Relationship Started", "Customer Risk"];
let options = {landscape: true};
printer.print(name, headers, data, options);
