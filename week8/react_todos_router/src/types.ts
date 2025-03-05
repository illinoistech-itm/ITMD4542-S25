export interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
}

// export interface TodoActions {
//     handleComplete: (id: number) => void,
//     handleDelete: (id: number) => void,
// }

export type TodoActions = {
    handleComplete: (id: number) => void,
    handleDelete: (id: number) => void,
    handleUpdate: (id: number, title: string) => void,
}