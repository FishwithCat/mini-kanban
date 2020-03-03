export const immutableUpdateList = <T>(list: T[], newItem: T) => {
    const updateIndex = list.findIndex(item => item === newItem)
    if (updateIndex < 0) return list.concat(newItem)
    return list.slice(0, updateIndex)
        .concat(newItem)
        .concat(list.slice(updateIndex + 1))
}

export const immutableDeleteFromList = <T>(list: T[], deleteItem: T) => {
    const removeIndex = list.findIndex(item => item === deleteItem)
    if (removeIndex < 0) return list
    return list.slice(0, removeIndex)
        .concat(list.slice(removeIndex + 1))
}

export const immutableUpdateObjList = <T>(list: T[], newItem: T, key: (keyof T)) => {
    const updateIndex = list.findIndex(item => item[key] === newItem[key])
    if (updateIndex < 0) return list.concat(newItem)
    return list.slice(0, updateIndex)
        .concat(newItem)
        .concat(list.slice(updateIndex + 1))
}


export const immutableDeleteObjFromList = <T>(list: T[], newItem: T, key: (keyof T)) => {
    const deleteIndex = list.findIndex(item => item[key] === newItem[key])
    if (deleteIndex < 0) return list
    return list.slice(0, deleteIndex)
        .concat(list.slice(deleteIndex + 1))
}
