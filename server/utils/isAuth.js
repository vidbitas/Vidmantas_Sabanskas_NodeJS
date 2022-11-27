export const isAuth = (req, res, next) => {
  if (req.session.myname) {
    res.json({ messagesss: 'You autentification.', error: false });
    next();
  }

  return res.json({
    message: 'You not autentification.',
    error: true,
  });
};
