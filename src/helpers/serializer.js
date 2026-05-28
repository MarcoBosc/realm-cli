function serializeRealmObject(
  obj,
  selectedFields = null
) {

  const raw =
    JSON.parse(JSON.stringify(obj));

  if (
    !selectedFields ||
    !selectedFields.length
  ) {
    return raw;
  }

  const filtered = {};

  for (const field of selectedFields) {
    filtered[field] = raw[field];
  }

  return filtered;
}

function getSelectedFields(args) {

  const idx =
    args.indexOf("--select");

  if (idx === -1) {
    return null;
  }

  return args[idx + 1]
    .split(",")
    .map(f => f.trim())
    .filter(Boolean);
}

module.exports = {
  serializeRealmObject,
  getSelectedFields
};