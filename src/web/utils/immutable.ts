


export const listImmutableDelete = <T>(list: T[], index: number): T[] => {
    return list.slice(0, index)
        .concat(list.slice(index + 1))
}

export const listImmutableInsert = <T>(list: T[], index: number, newElement: T): T[] => {
    return list.slice(0, index)
        .concat(newElement)
        .concat(list.slice(index))
}

export const listImmutableUpdate = <T>(list: T[], index: number, newElement: T): T[] => {
    return list.slice(0, index)
        .concat(newElement)
        .concat(list.slice(index + 1))
}