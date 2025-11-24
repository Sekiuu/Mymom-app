export type PostRecord = {
    id?: string;
    user_id?: string;
    username?: string;
    content: string;
    image?: string;
    create_at?: string;
};
export type UserRecord = {
    id?: string;
    username: string;
    email: string;
    password: string;
    create_at?: string;
};

export type userWithoutPassword = {
    id?: string;
    username: string;
    email: string;
    create_at?: string;
};

export type UserSession = {
    id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
};