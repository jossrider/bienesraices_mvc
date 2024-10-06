import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

const identifcarUsuario = async (req, res, next) => {
  // Identificar si hay un token
  const { _token } = req.cookies

  if (!_token) {
    req.usuario = null
    return next()
  }

  // Comprobar token
  try {
    const decoded = jwt.verify(_token, process.env.JWT_SECRET)
    const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id)

    if (usuario) {
      req.usuario = usuario
    } 

    return next()
  } catch (error) {
    console.log(error)
    return req.clearCookie('_token').redirect('/auth/login')
  }
}

export default identifcarUsuario
