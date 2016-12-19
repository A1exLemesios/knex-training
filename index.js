
// Connection to the database
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
  knex.column(" tradeName as Company Name", "username as File Manager", "relationshipStartDate as Relationship Start Date").select()
  .from("customerorganization")
  .leftJoin("idcard", "customerorganization.idCustomer", "idcard.idCustomer")
  .leftJoin("customer", "customer.idCustomer", "customerorganization.idCustomer")
  .leftJoin("users", "users.idUser", "customer.idUser")
  .where("idcard.idCustomer", null)
  .then(function(row) {
    console.log(row);
  }).catch(function(err) {
    console.log(err);
  })
}
function missingIdCardsInd () {
  knex.select(knex.raw("concat(customerperson.firstName, ' ', customerperson.lastname) as 'Customer Name', username as 'File manager', relationshipStartDate as 'Relationship Start Date'"))
  .from("customerperson")
  .leftJoin("idcard", "customerperson.idCustomer", "idcard.idCustomer")
  .leftJoin("customer", "customer.idCustomer", "customerperson.idCustomer")
  .leftJoin("users", "users.idUser", "customer.idUser")
  .where("idcard.idCustomer", null)
  .then(function(row) {
    console.log(row);
  }).catch(function(err) {
    console.log(err);
  })
}

function missingAddressesInd () {
  knex.select(knex.raw("concat(customerperson.firstName, ' ', customerperson.lastname) as 'Customer Name', username as 'File manager'"))
  .from("customerperson")
  .leftJoin("address", "customerperson.idCustomer", "address.idCustomer")
  .leftJoin("customer", "customer.idCustomer", "customerperson.idCustomer")
  .leftJoin("users", "users.idUser", "customer.idUser")
  .where("address.idCustomer", null)
  .then(function(row) {
    console.log(row);
  }).catch(function(err) {
    console.log(err);
  })
};

function missingAddressesOrg () {
  knex.column("tradeName as Company Name", "username as File manager").select()
  .from("customerorganization")
  .leftJoin("address", "customerorganization.idCustomer", "address.idCustomer")
  .leftJoin("customer", "customer.idCustomer", "customerorganization.idCustomer")
  .leftJoin("users", "users.idUser", "customer.idUser")
  .where("address.idCustomer", null)
  .then(function(row) {
    console.log(row);
  }).catch(function(err) {
    console.log(err);
  })
};

function screeningRiskInd () {
  knex.select(knex.raw("concat(firstName, lastName) as 'Customer Name',name as 'Hit type'"))
  .from("customerperson")
  .leftJoin("screeningrisk", "customerperson.idCustomer","screeningrisk.idCustomer")
  .leftJoin("screeningrisktype", "screeningrisktype.idScreeningRiskType", "screeningRisk.idScreeningRiskType")
  .then(function(row) {
    console.log(row);
  }).catch(function(err) {
    console.log(err);
  })
};

function screeningRiskOrg () {
  knex.column("tradeName as Company Name", "name as Hit type").select()
  .from("customerorganization")
  .leftJoin("screeningrisk", "customerorganization.idCustomer","screeningrisk.idCustomer")
  .leftJoin("screeningrisktype", "screeningrisktype.idScreeningRiskType", "screeningRisk.idScreeningRiskType")
  .whereNotNull("idScreeningRisk")
  .then(function(row) {
    console.log(row);
  }).catch(function(err) {
    console.log(err);
  })
};

function missingDocumentsInd() {
  knex.select(knex.raw("concat(customerperson.firstName, ' ', customerperson.lastName) as 'Customer Name', documenttype.name as 'Missing Document'"))
  .from("customerperson")
  .leftJoin("checkeddocumenttype", "customerperson.idCustomer", "checkeddocumenttype.idCustomer")
  .leftJoin("documenttype", "documenttype.idDocumentType", "checkeddocumenttype.idDocumentType")
  .whereNotNull("idCheckedDocumentType")
  .then(function(row) {
    console.log(row);
  }).catch(function(err) {
    console.log(err);
  })
}

function missingDocumentsInd() {
  knex.select(knex.raw("concat(customerperson.firstName, ' ', customerperson.lastName) as 'Customer Name', documenttype.name as 'Missing Document'"))
  .from("customerperson")
  .leftJoin("checkeddocumenttype", "customerperson.idCustomer", "checkeddocumenttype.idCustomer")
  .leftJoin("documenttype", "documenttype.idDocumentType", "checkeddocumenttype.idDocumentType")
  .whereNotNull("idCheckedDocumentType")
  .then(function(row) {
    console.log(row);
  }).catch(function(err) {
    console.log(err);
  })
}

function missingDocumentsOrg() {
  knex.select(knex.raw("tradeName 'Company Name', documenttype.name as 'Missing Document'"))
  .from("customerorganization")
  .leftJoin("checkeddocumenttype", "customerorganization.idCustomer", "checkeddocumenttype.idCustomer")
  .leftJoin("documenttype", "documenttype.idDocumentType", "checkeddocumenttype.idDocumentType")
  .whereNotNull("idCheckedDocumentType")
  .then(function(row) {
    console.log(row);
  }).catch(function(err) {
    console.log(err);
  })
}

//missingIdCardsOrg ();
//missingIdCardsInd();
//missingAddressesInd();
//missingAddressesOrg();
//screeningRiskInd();
//screeningRiskOrg();
//missingDocumentsInd();
missingDocumentsOrg();
