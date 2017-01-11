"use strict";

const fs = require("fs");

  const splitted = fs.readFileSync("./printer/test/Missing Addresses - Individual.pdf","utf8")

const removeDate = (str) => {
  let splitted = str.split("\n");
  for (let i = 0; i < splitted.length; i++) {
    if (splitted[i].includes("CreationDate")) {
      splitted.splice(i, 1);
    }
  }

  return splitted;
}


console.log(splitted[39]);
