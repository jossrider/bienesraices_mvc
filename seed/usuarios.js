import bcrypt from 'bcrypt'

const usuarios = [
  {
    nombre: 'Joss',
    email: 'jossrider@gmail.com',
    confirmado: 1,
    password: bcrypt.hashSync('password', 10),
  },
  {
    nombre: 'Rider',
    email: 'rider@gmail.com',
    confirmado: 1,
    password: bcrypt.hashSync('password', 10),
  },
]

export default usuarios
