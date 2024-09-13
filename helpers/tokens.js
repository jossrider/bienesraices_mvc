import jwt from 'jsonwebtoken'

const generarJWT = (datos) => jwt.sign({ id: datos.id, nombre: datos.nombre }, process.env.JWT_SECRET, { expiresIn: '1d' })

const generarId = () => Math.floor(100000 + Math.random() * 900000).toString()

export { generarJWT, generarId }
