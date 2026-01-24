const STORAGE_KEY = 'my-expenses-v1';
const SALARY_KEY = 'my-salary-v1';

export const storageRepository = {
  load() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  loadSalary() {
    const data = localStorage.getItem(SALARY_KEY);
    return data ? parseFloat(data) : 0;
  },

  saveSalary(salary) {
    localStorage.setItem(SALARY_KEY, salary.toString());
  }
};