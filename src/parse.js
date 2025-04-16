export default (json) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    throw new Error(e);
  }
};
