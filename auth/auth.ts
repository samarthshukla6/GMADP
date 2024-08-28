import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/model/user-model';
import NextAuth from 'next-auth';
import dbConnect from '@/lib/mongo';

interface Credentials {
    email?: string;
    password?: string;
}

interface CustomUser {
    email: string;
    password: string;
}

const authOptions: any = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: Credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }
                await dbConnect(); 
                try {
                    const user = await User.findOne({ email: credentials.email }) as CustomUser | null;

                    if (user) {
                        const isMatch = await bcrypt.compare(credentials.password, user.password);
                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error('Email or Password is not correct');
                        }
                    } else {
                        throw new Error('User not found');
                    }
                } catch (error) {
                    throw new Error((error as Error).message);
                }
            },
        }),
    ],
};

export const { auth, handlers,signIn, signOut} = NextAuth (authOptions);