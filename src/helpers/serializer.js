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

  // Collect all tokens after --select until the next flag (starts with -)
  const parts = [];
  for (let i = idx + 1; i < args.length; i++) {
    const token = args[i];
    if (token.startsWith("-")) break;
    parts.push(token);
  }

  // Join tokens and split by comma to support:
  // --select nome,email,uuid
  // --select "nome, email, uuid"
  // --select nome, email, uuid (separated tokens)
  const joined = parts.join(" ");

  return joined
    .split(",")
    .map(f => f.trim())
    .filter(Boolean);
}

module.exports = {
  serializeRealmObject,
  getSelectedFields
};