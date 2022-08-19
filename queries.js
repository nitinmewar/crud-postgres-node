const Pool = require('pg').Pool

const pool = new Pool({
    user :"me",
    host : "localhost",
    database : "api",
    password : "password",
    port : 5432
})

const getUser = (req,res)=> {
    pool.query("SELECT * FROM users", (err, result) => {
            if (err) {
                throw err
            }
            res.status(200).json(result.rows)
    })
}

const getUserByid = (req,res)=>{
    const {id} = (req.params)
    pool.query('SELECT * FROM users WHERE id = $1 ',[id],(err,result) => {
        if(err){
            throw err
        }

        res.status(200).json(result.rows)
    })
}

const addUser = (req,res) => {
    const {email, name} = req.body
    pool.query(`INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *`, [email,name], (err,result)=>{
        if(err){
            throw err
        }
        res.status(200).send(`user created with id : ${result.rows[0].id}`)
    })
}
const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email } = req.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',[name, email, id],(err, results) => {
        if (err) {
          throw err
        }
        res.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getUser,
    getUserByid,
    deleteUser,
    updateUser,
    addUser
  }