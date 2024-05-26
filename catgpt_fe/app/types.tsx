export interface Message {
    id: string
    content: string
    role: ROLE
}

export enum ROLE {
    User,
    AI
}