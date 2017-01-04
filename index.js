// Connection to the database

//TODO Airbnb guidelines , set them in .eslintrc File , .map() tutorial, tests
const knex = require('knex')({
  dialect: 'mssql',
  connection: {
    server : "localhost",
    user : "eucomply",
    password : "euthor123",
    options: {
      port: 1433,
      database : "eucomply",
      encrypt: true
    }
  },
  debug: true
});


//NOTE  reports

function missingIdCardsOrg () {
  knex.column(" tradeName", "username", "relationshipStartDate").select()
  .from("customerorganization")
  .leftJoin("idcard", "customerorganization.idCustomer", "idcard.idCustomer")
  .leftJoin("customer", "customer.idCustomer", "customerorganization.idCustomer")
  .leftJoin("users", "users.idUser", "customer.idUser")
  .where("idcard.idCustomer", null)
  .map(function(row) {
    console.log(
    {
      "Company name" : row.tradeName,
      "File manager" : row.username,
      "Relationship start date" : row.relationshipStartDate
    }
  );
  }).catch(function(err) {
      console.log(err);
    })
};

function missingIdCardsInd () {
  knex.select("customerperson.firstName", "customerperson.lastName", "documenttype.name","relationshipStartDate", "username")
  .from("customerperson")
  .leftJoin("customer", "customerperson.idCustomer", "customer.idCustomer")
  .leftJoin("checkeddocumenttype", "customerperson.idCustomer", "checkeddocumenttype.idCustomer")
  .leftJoin("documenttype", "documenttype.idDocumentType", "checkeddocumenttype.idDocumentType")
  .leftJoin("users", "users.idUser", "customer.idUserResponsibleOfficer")
  .whereNotNull("idCheckedDocumentType")
  .map(function(row) {
    console.log(
    {
      "Customer name" : row.firstName + " " + row.lastName,
      "File manager" : row.username,
      "Relationship start Date" : row.relationshipStartDate
    }
  )
  }).catch(function(err) {
      console.log(err);
    })
};

function missingAddressesInd () {
  knex.select("customerperson.firstName", "customerperson.lastName", "username")
  .from("customerperson")
  .leftJoin("address", "customerperson.idCustomer", "address.idCustomer")
  .leftJoin("customer", "customer.idCustomer", "customerperson.idCustomer")
  .leftJoin("users", "users.idUser", "customer.idUser")
  .where("address.idCustomer", null)
  .map(function(row) {
    console.log(
    {
      "Customer name" : row.firstName + " " + row.lastName,
      "File manager" : row.username
    }
  )
  }).catch(function(err) {
      console.log(err);
    })
};

function missingAddressesOrg () {
  knex.column("tradeName", "username").select()
  .from("customerorganization")
  .leftJoin("address", "customerorganization.idCustomer", "address.idCustomer")
  .leftJoin("customer", "customer.idCustomer", "customerorganization.idCustomer")
  .leftJoin("users", "users.idUser", "customer.idUser")
  .where("address.idCustomer", null)
  .map(function(row) {
    console.log(
    {
      "Company name" : row.tradeName,
      "File manager" : row.username
    }
  );
  }).catch(function(err) {
      console.log(err);
    })
};

function screeningRiskInd () {
  knex.select("firstName","lastName","name")
  .from("customerperson")
  .leftJoin("screeningrisk", "customerperson.idCustomer","screeningrisk.idCustomer")
  .leftJoin("screeningrisktype", "screeningrisktype.idScreeningRiskType", "screeningRisk.idScreeningRiskType")
  .whereNotNull("idScreeningRisk")
  .map(function(row) {
    console.log(
    {
      "Customer name" : row.firstName + " " + row.lastName,
      "Hit type" : row.name
    }
  )
  }).catch(function(err) {
      console.log(err);
    })
};

function screeningRiskOrg () {
  knex.column("tradeName", "name").select()
  .from("customerorganization")
  .leftJoin("screeningrisk", "customerorganization.idCustomer","screeningrisk.idCustomer")
  .leftJoin("screeningrisktype", "screeningrisktype.idScreeningRiskType", "screeningRisk.idScreeningRiskType")
  .whereNotNull("idScreeningRisk")
  .map(function(row) {
    console.log(
    {
      "Company name" : row.tradeName,
      "Hit type" : row.name
    }
  );
  }).catch(function(err) {
      console.log(err);
    })
};

function missingDocumentsInd() {
  knex.select("firstName", "lastName", "documenttype.name")
  .from("customerperson")
  .leftJoin("checkeddocumenttype", "customerperson.idCustomer", "checkeddocumenttype.idCustomer")
  .leftJoin("documenttype", "documenttype.idDocumentType", "checkeddocumenttype.idDocumentType")
  .whereNotNull("idCheckedDocumentType")
  .map(function(row) {
    console.log(
    {
      "Customer name" : row.firstName + " " + row.lastName,
      "Missing document" : row.name
    }
  )
  }).catch(function(err) {
      console.log(err);
    })
};

function missingDocumentsOrg() {
  knex.select("documenttype.name","tradeName")
  .from("customerorganization")
  .leftJoin("checkeddocumenttype", "customerorganization.idCustomer", "checkeddocumenttype.idCustomer")
  .leftJoin("documenttype", "documenttype.idDocumentType", "checkeddocumenttype.idDocumentType")
  .whereNotNull("idCheckedDocumentType")
  .map(function(row) {
    console.log(
    {
     "Company name" : row.tradeName,
     "Missing document" : row.name
    }
  );
  }).catch(function(err) {
      console.log(err);
    })
};

//missingIdCardsOrg ();
//missingIdCardsInd();
//missingAddressesInd();
//missingAddressesOrg();
//screeningRiskInd();
//screeningRiskOrg();
//missingDocumentsInd();
//missingDocumentsOrg();

"use strict";

var pdfReportGenerator = require("fluentreports").Report;


var data = [
        {item: 'Bread', count: 5, unit: 'loaf'},
        {item: 'Egg', count: 3, unit: 'dozen'},
        {item: 'Sugar', count: 32, unit: 'gram'},
        {item: 'Carrot', count: 2, unit: 'kilo'},
        {item: 'Apple', count: 3, unit: 'kilo'},
        {item: 'Peanut Butter', count: 1, unit: 'jar'}
   ];

   var rpt = new Report("grocery1.pdf")
       .data( data )                                  // Add our Data
       .pageHeader( ["My Grocery List"] )             // Add a simple header
       .detail("{{count}} {{unit}} of {{item}}")      // Put how we want to print out the data line.
       .render();
