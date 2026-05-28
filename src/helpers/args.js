function getFlagIndex(args, short, long) {
  const shortIndex = args.indexOf(short);

  if (shortIndex !== -1) {
    return shortIndex;
  }

  return args.indexOf(long);
}

function hasFlag(args, flag) {
  return args.includes(flag);
}

function getArgValue(args, flag, fallback = null) {
  const idx = args.indexOf(flag);

  if (idx === -1) {
    return fallback;
  }

  return args[idx + 1] || fallback;
}

module.exports = {
  getFlagIndex,
  hasFlag,
  getArgValue
};