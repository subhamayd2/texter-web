export interface MessageModel {
    id: number,
    thread_id: number,
    read: number,
    person?: number,
    message: string,
    timestamp: string,
    isSelf: boolean
}