export const immutableUpdateList = <T>(list: T[], newItem: T) => {
    const updateIndex = list.findIndex(item => item === newItem)
    if (updateIndex < 0) return list.concat(newItem)
    return list.slice(0, updateIndex)
        .concat(newItem)
        .concat(list.slice(updateIndex + 1))
}

export const immutableUpdateObjList = <T>(list: T[], newItem: T, key: (keyof T)) => {
    const updateIndex = list.findIndex(item => item[key] === newItem[key])
    if (updateIndex < 0) return list.concat(newItem)
    return list.slice(0, updateIndex)
        .concat(newItem)
        .concat(list.slice(updateIndex + 1))
}