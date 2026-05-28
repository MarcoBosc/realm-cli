function normalizeQuery(q) {

  if (!q) {
    return q;
  }

  return q

    .replace(
      /(\w+)\s*=\s*([^\s]+)/g,
      (_, field, value) => {
        return `${field} == ${value}`;
      }
    )

    .replace(
      /(\w+)\s*(==|!=|>=|<=|>|<)\s*([^\s]+)/g,
      (_, field, operator, value) => {

        const clean = value
          .replace(/^['"]/, "")
          .replace(/['"]$/, "");

        if (
          clean === "true" ||
          clean === "false"
        ) {
          return `${field} ${operator} ${clean}`;
        }

        if (clean === "null") {
          return `${field} ${operator} null`;
        }

        if (!isNaN(clean)) {
          return `${field} ${operator} ${clean}`;
        }

        return `${field} ${operator} '${clean}'`;
      }
    );
}

module.exports = normalizeQuery;