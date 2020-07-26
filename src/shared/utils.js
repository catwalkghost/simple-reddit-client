// A simple util to update objects immutably. Handy for Redux
export const updateObject = (oldObject, updatedProps) => {
    return {
        ...oldObject,
        ...updatedProps
    }
}