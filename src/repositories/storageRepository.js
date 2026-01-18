const STORAGE_KEY = 'my-expenses-v1';

export const storageRepository = {
  load() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};