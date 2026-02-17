/**
 * Shared middleware for the mint-narcissus microservices.
 * These run after the `auth` middleware (req.user must already be set).
 */

/**
 * Blocks the request if the user hasn't completed their profile.
 * Apply after `auth` on any route that requires a full profile.
 */
const requireProfileComplete = (req, res, next) => {
  if (!req.user.isProfileComplete) {
    return res.status(403).json({
      message: "Please complete your profile before continuing.",
    });
  }
  next();
};

/**
 * Restricts a route to users whose activeRole matches the given role.
 * Usage: requireRole('lender') or requireRole('borrower')
 */
const requireRole = (role) => (req, res, next) => {
  if (req.user.activeRole !== role) {
    return res.status(403).json({
      message: `This action requires the ${role} role. Switch your active role to continue.`,
    });
  }
  next();
};

module.exports = { requireProfileComplete, requireRole };
