export interface IUser {
    id: number
    email: string
    firstName: string
    lastName: string
    dateOfBirth: string
    nationality: {
        id: number
        name: string
    }
}
