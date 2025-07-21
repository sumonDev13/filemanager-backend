import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User,{IUser} from '../models/user.model.js';
// import * as dotenv from 'dotenv';
// dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: 'http://localhost:5000/api/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        const newUser = new User({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0].value,
          avatar: profile.photos?.[0].value,
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// Note: For a stateless JWT API, serializeUser and deserializeUser are not needed
// as we are not using sessions. We'll handle user state via the JWT itself.