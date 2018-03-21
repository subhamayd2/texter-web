import { ContactModel } from "./contact.model";
import { MessageModel } from "./message.model";

export interface MessagesModel {
    contact: ContactModel,
    messages: Array<MessageModel>
}
