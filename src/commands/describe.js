const printOutput =
  require("../output/output");

const exportData =
  require("../output/export");

function normalizeField(
  name,
  definition
) {

  if (
    typeof definition === "string"
  ) {

    const optional =
      definition.endsWith("?");

    const list =
      definition.endsWith("[]");

    const baseType =
      definition
        .replace(/\?$/, "")
        .replace(/\[\]$/, "");

    return {
      field: name,
      type: list
        ? `list<${baseType}>`
        : baseType,
      optional,
      indexed: false,
      target: ""
    };
  }

  const type =
    definition.type || "mixed";

  const objectType =
    definition.objectType || "";

  const isCollection =
    ["list", "set", "dictionary"]
      .includes(type);

  return {
    field: name,
    type: isCollection && objectType
      ? `${type}<${objectType}>`
      : type,
    optional: Boolean(
      definition.optional
    ),
    indexed: Boolean(
      definition.indexed
    ),
    target: objectType
  };
}

async function describeSchema(
  realm,
  schemaName,
  args
) {

  if (!schemaName) {
    throw new Error(
      "Informe o schema após -d/--describe."
    );
  }

  const schema =
    realm.schema.find(
      item => item.name === schemaName
    );

  if (!schema) {

    const available =
      realm.schema
        .map(item => item.name)
        .join(", ");

    throw new Error(
      `Schema \"${schemaName}\" não encontrado. Disponíveis: ${available || "nenhum"}.`
    );
  }

  console.log(
    `Schema: ${schema.name}`
  );

  if (schema.primaryKey) {
    console.log(
      `Primary key: ${schema.primaryKey}`
    );
  }

  if (schema.embedded) {
    console.log("Embedded: true");
  }

  const data =
    Object.entries(
      schema.properties
    ).map(entry =>
      normalizeField(
        entry[0],
        entry[1]
      )
    );

  printOutput(data, args);

  exportData(data, args);
}

module.exports = describeSchema;