export const Endpoints = {
    uploadUserDetails: (id: string) => `/users/update-user/${id}`,
    getUser: (id: string) => `/users/get-user/${id}`,
    getUsers: (id:string) => `/users/get-users?userId=${id}`,
    getUserConversations: (senderId: string, receiverId: string) => `/chats/get-chats?senderId=${senderId}&receiverId=${receiverId}`,
    sendUserConversation: () => `/chats/send-chat`
};