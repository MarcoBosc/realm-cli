function normalizeQuery(q) {

  if (!q) {
    return q;
  }

  const withLogicalOperators = q
    .replace(/\s+&&\s+/g, " AND ")
    .replace(/\s+\|\|\s+/g, " OR ")
    .replace(
      /(^|[\s(])!(?!=)\s*/g,
      "$1NOT "
    )
    .replace(
      /\b(and|or|not)\b/gi,
      keyword =>
        keyword.toUpperCase()
    );

  return withLogicalOperators.replace(
    /(\w+)\s*(==|!=|>=|<=|>|<|=)\s*("[^"]*"|'[^']*'|[^\s)]+)/g,
    (_, field, rawOperator, rawValue) => {

      const operator =
        rawOperator === "="
          ? "=="
          : rawOperator;

      const clean = rawValue
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

      if (
        /^\d{4}[/-]\d{2}[/-]\d{2}(?:[T\s].+)?$/.test(
          clean
        )
      ) {
        return `${field} ${operator} ${clean}`;
      }

      const escaped =
        clean.replace(/'/g, "\\'");

      return `${field} ${operator} '${escaped}'`;
    }
  );
}

module.exports = normalizeQuery;