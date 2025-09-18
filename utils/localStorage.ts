export const getLocalStorage = <T>(key: string, defaultValue: T | null = null): T | null => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item;
  } catch (error) {
    console.error('Error getting localStorage item:', error);
    return defaultValue;
  }
};