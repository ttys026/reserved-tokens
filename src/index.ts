import reserved from './reserved.json';

const { keywords, tokens } = reserved;
const nameCache = new Map();
const getUid = (name: string) => {
  const val = nameCache.get(name) || 0;
  nameCache.set(name, val + 1)
  return val + 1;
}

const isReserved = (name: string) => {
  return keywords.includes(name) || tokens.includes(name);
}

const getValidVarName = (name: string) => {
  if (isReserved(name)) {
    return `${name}_${getUid(name)}`;
  }
  return name;
}

export default { isReserved, getValidVarName, reserved };
export { isReserved, getValidVarName, reserved };