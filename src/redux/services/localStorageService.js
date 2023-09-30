export const localStorageService = {
  getItem: name => localStorage.getItem(name),
  setItem: (name, value) => localStorage.setItem(name, value)
};
