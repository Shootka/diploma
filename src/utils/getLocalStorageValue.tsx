export const getLocalStorageValue = (key: string) => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
    } else return '';
};
