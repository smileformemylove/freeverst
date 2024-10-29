import {storageKey} from "./constants.js";

const calcItemId = () => {
    let savedData = getAllData();

    if(savedData === null || savedData.length === 0) {
        return 1;
    }

    return savedData.at(-1).id + 1;
}
export const getAllData = () => {
    let savedData = JSON.parse(localStorage.getItem(storageKey));

    if(savedData === null) {
        return [];
    }

    if(Array.isArray(savedData)) {
        return savedData;
    }
}

export const getItemById = (id) => {
    if(typeof id !== 'number' || id === 0) throw new Error('id should be a number that more than 0');
    const data = getAllData();

    return data.find(item => item.id === id)
}

export const setToStorage = (data) => {
    const prepareData = JSON.stringify(data)
    localStorage.setItem(storageKey,  prepareData);
}

export const saveData = (data) => {
    const savedData = getAllData();
    const currentId = calcItemId();

    const dataToSave = {...data, id: currentId}

    savedData.push(dataToSave)
    setToStorage(savedData)

    return dataToSave;
}

export const updateById = (dataToSave) => {
    if(typeof dataToSave.id !== 'number' || dataToSave.id === 0) throw new Error('id should be a number that more than 0');
    const allData = getAllData();
    const index = allData.findIndex(item => item.id === dataToSave.id);
    allData[index] = {
        ...dataToSave
    }
    setToStorage(allData);
}

export const removeData = (id) => {
    let savedData = getAllData();
    const index = savedData.findIndex((item) => item.id === id);
    savedData.splice(index, 1);
    setToStorage(savedData)
}
