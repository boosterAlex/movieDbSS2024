import { Dispatch, SetStateAction } from 'react'

export interface SelectOption {
    id: number
    name: string
}

export type TypeSetState<T> = Dispatch<SetStateAction<T>>
