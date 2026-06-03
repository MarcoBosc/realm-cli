const printOutput =
  require("../output/output");

const exportData =
  require("../output/export");

async function listSchemas(
  realm,
  args
) {

  const data =
    realm.schema.map(schema => ({
      schema: schema.name,
      fields: Object.keys(
        schema.properties
      ).length
    }));

  printOutput(data, args);

  exportData(data, args);
}

module.exports = listSchemas;