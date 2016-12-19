// Update with your config settings.

module.exports = {

  mssql_deploy: {
    client : "mssql",
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
    pool: {
      min: 0,
      max: 50
    }
  },
};
