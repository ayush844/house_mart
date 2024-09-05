import GoogleProvider from 'next-auth/providers/google';

import connectDB from '@/config/database';

import User from '@/models/User';


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        }),
      
    ],
    callbacks: {
        // invoke on successfull sign in
        async signIn({profile}){

            // connect to database
            await connectDB();

            // check if user exists
            const userExists = await User.findOne({email: profile.email});

            // if not, create user
            if(!userExists){
                // truncate username if too long
                const username = profile.name.slice(0, 20);

                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                })
            }


            // return true to allow signIn
            return true;

        },

        // session callback function that modifies session object
        async session({session}){
            // get user from database
            const user = await User.findOne({email: session.user.email});

            // assign user id from the session
            session.user.id = user._id.toString();

            // return session
            return session;
            
        }
    }
}  