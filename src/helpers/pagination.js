function paginate(results, args) {

  const limitIndex =
    args.indexOf("--limit");

  const offsetIndex =
    args.indexOf("--offset");

  const limit =
    limitIndex !== -1
      ? parseInt(args[limitIndex + 1])
      : 20;

  const offset =
    offsetIndex !== -1
      ? parseInt(args[offsetIndex + 1])
      : 0;

  return results.slice(
    offset,
    offset + limit
  );
}

module.exports = paginate;