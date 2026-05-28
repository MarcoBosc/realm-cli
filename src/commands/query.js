const normalizeQuery =
  require("../query/normalize");

const buildRealmQuery =
  require("../query/builder");

const paginate =
  require("../helpers/pagination");

const {
  serializeRealmObject,
  getSelectedFields
} = require("../helpers/serializer");

const printOutput =
  require("../output/output");

const exportData =
  require("../output/export");

async function runQuery(
  realm,
  schemaName,
  query,
  args
) {

  const selectedFields =
    getSelectedFields(args);

  let results =
    realm.objects(schemaName);

  if (query) {

    const built =
      buildRealmQuery(
        normalizeQuery(query)
      );

    results =
      results.filtered(
        built.query,
        ...built.args
      );
  }

  const data =
    paginate(results, args)
      .map(r =>
        serializeRealmObject(
          r,
          selectedFields
        )
      );

  printOutput(data, args);

  exportData(data, args);
}

module.exports = runQuery;