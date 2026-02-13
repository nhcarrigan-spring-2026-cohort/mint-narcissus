const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2");
const User = require("../models/User");

passport.use(
  "linkedin",
  new OAuth2Strategy(
    {
      authorizationURL: "https://www.linkedin.com/oauth/v2/authorization",
      tokenURL: "https://www.linkedin.com/oauth/v2/accessToken",
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ["openid", "profile", "email"],
      state: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // LinkedIn OIDC userinfo endpoint (works with openid/profile/email scopes)
        const response = await fetch(
          "https://api.linkedin.com/v2/userinfo",
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        if (!response.ok) {
          return done(
            new Error(`LinkedIn userinfo failed: ${response.status}`),
          );
        }

        // OIDC userinfo response: { sub, name, given_name, family_name, picture, email }
        const info = await response.json();

        const linkedinId = info.sub;
        const email = info.email || null;
        const name =
          info.name ||
          `${info.given_name || ""} ${info.family_name || ""}`.trim() ||
          "LinkedIn User";
        const profilePhoto = info.picture || undefined;

        let user = await User.findOne({ linkedinId });

        if (!user) {
          if (email) {
            user = await User.findOne({ email });
          }

          if (user) {
            // Link LinkedIn to existing account
            user.linkedinId = linkedinId;
            if (!user.profilePhoto && profilePhoto) {
              user.profilePhoto = profilePhoto;
            }
            await user.save();
          } else {
            user = await User.create({
              name,
              email,
              linkedinId,
              profilePhoto,
            });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

module.exports = passport;
