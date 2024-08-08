import GoogleProvider from 'next-auth/providers/google';

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
        // invoke on sign in
        async signIN({profile}){
            // connect to database

            // check if user exists

            // if not, create user

            // return true to allow signIn

        },

        // session callback function that modifies session object
        async session(){
            // get user from database

            // assign user id from the session

            // return session
            
        }
    }
}  