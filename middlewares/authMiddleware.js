const HOST = process.env.HOST;

export const ensureAuthUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect(`${HOST}/auth/github`);
  }
};

export const ensureGuest = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect(`${HOST}/dashboard`);
  }
};

export function roleChecker(...permittedRoles) {
  return (req, res, next) => {
    const { user } = req;
    if (
      user &&
      req.isAuthenticated() &&
      user.role &&
      permittedRoles.includes(user.role)
    ) {
      next();
    } else {
      res.status(401).json({
        msg: 'You are not authorized to view this resource because you are not an admin.',
      });
      res.redirect(`${HOST}/dashboard`);
    }
  };
}

export function permit(...permittedRoles) {
  // return a middleware
  return (request, response, next) => {
    const { user } = request;

    if (user && permittedRoles.includes(user.role)) {
      next(); // role is allowed, so continue on the next middleware
    } else {
      response.status(403).json({ message: 'Forbidden' }); // user is forbidden
    }
  };
}

export const sessionizeUser = user => {
  return {
    userId: user.id,
    nickname: user.nickname,
  };
};
