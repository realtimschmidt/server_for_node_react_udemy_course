module.exports = (req, res, next) => {
  if (!res.user) {
    return res.status(401).send({ error: 'You must log in!' })
  }
  next()
}
