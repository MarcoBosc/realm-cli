function buildRealmQuery(query) {

  const args = [];

  let parsed = query;

  parsed = parsed.replace(
    /(\w+)\s+IN\s+\[(.*?)\]/gi,
    (_, field, valuesRaw) => {

      const values = valuesRaw
        .split(",")
        .map(v =>
          v
            .trim()
            .replace(/^['"]/, "")
            .replace(/['"]$/, "")
        );

      args.push(values);

      return `${field} IN $${args.length - 1}`;
    }
  );

  parsed = parsed.replace(
    /(\w+)\s*(==|!=|>=|<=|>|<)\s*'(\d{4}-\d{2}-\d{2}(?:T[^']+)?)'/g,
    (_, field, operator, dateValue) => {

      args.push(new Date(dateValue));

      return `${field} ${operator} $${args.length - 1}`;
    }
  );

  return {
    query: parsed,
    args
  };
}

module.exports = buildRealmQuery;