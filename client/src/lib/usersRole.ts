export type UsersRole = 'USER' | 'ADMIN';

export const isAdmin = (email: string): boolean => {
    const adminEmails = ['admin@gmail.com', 'sega.pamma@gmail.com'];
    return adminEmails.includes(email);
}