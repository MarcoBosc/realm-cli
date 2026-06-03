function buildRealmQuery(query) {

  const args = [];

  let parsed = query;

  function toDateArg(rawValue) {

    const normalized =
      rawValue
        .replace(/\//g, "-")
        .replace(/\s+/, "T");

    const date =
      new Date(normalized);

    if (isNaN(date.getTime())) {
      return null;
    }

    return date;
  }

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

      const date =
        toDateArg(dateValue);

      if (!date) {
        return `${field} ${operator} '${dateValue}'`;
      }

      args.push(date);

      return `${field} ${operator} $${args.length - 1}`;
    }
  );

  parsed = parsed.replace(
    /(\w+)\s*(==|!=|>=|<=|>|<)\s*(\d{4}[/-]\d{2}[/-]\d{2}(?:[T\s]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?)?)/g,
    (_, field, operator, dateValue) => {

      const date =
        toDateArg(dateValue);

      if (!date) {
        return `${field} ${operator} ${dateValue}`;
      }

      args.push(date);

      return `${field} ${operator} $${args.length - 1}`;
    }
  );

  return {
    query: parsed,
    args
  };
}

module.exports = buildRealmQuery;