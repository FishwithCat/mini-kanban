export interface ValueStreamBaseInfo {
    id: string,
    name: string,
}

export interface ValueStreamStruct {
    name: string,
    steps: Step[]
}
export interface ValueStream extends ValueStreamStruct {
    id: string,
    members?: string[],
    creator?: string
}

export interface Step {
    id: string,
    name: string,
    color?: string
}