const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2");
const https = require("https");
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
        const info = await new Promise((resolve, reject) => {
          const options = {
            hostname: "api.linkedin.com",
            path: "/v2/userinfo",
            family: 4, // force IPv4 — avoids ETIMEDOUT in Docker on macOS
            headers: { Authorization: `Bearer ${accessToken}` },
          };
          https.get(options, (res) => {
            let body = "";
            res.on("data", (chunk) => (body += chunk));
            res.on("end", () => {
              if (res.statusCode !== 200) {
                return reject(new Error(`LinkedIn userinfo failed: ${res.statusCode}`));
              }
              try { resolve(JSON.parse(body)); }
              catch (e) { reject(e); }
            });
          }).on("error", reject);
        });

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
