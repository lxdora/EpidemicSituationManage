const allConfig = require('../config')
const config = allConfig.database
const mysql = require('mysql')

const pool = mysql.createPool({
  host: config.HOST,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE
})

let query = function (sql, values) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection){
      if(err) {
        resolve(err)
      }else {
        connection.query(sql, values, (err, rows)=>{
          if(err){
            reject(err)
          }else{
            resolve(rows)
          }
          connection.release();
        })
      }
    })
  })
}

let createTable = function (sql) {
  return query(sql, [])
}

let findDataById = function (table, id) {
  let _sql = "select * from ?? where id = ?"
  return query(_sql, [ table, id, start, end])
}

let findByPage = function ( table, keys, start, end) {
  let _sql = "select ?? from ?? lmit ? , ?"
  return query(_sql, [ keys, table, start, end])
}

let insertData = function ( table, values ) {
  let _sql = "insert info ?? set ?"
  return query(_sql, [tabled, values])
}

let updateData = function (table, values, id) {
  let _sql = "update ?? set ? where id = ?"
  return query(_sql, [table, values, id])
}

let deleteDataById = function ( table, id) {
  let _sql = "delete from ?? where id = ?"
  return query(_sql, [table, id])
}

let select = function ( table, keys) {
  let _sql = "select ?? from ??"
  return query(_sql, [keys, table])
}

let count = function ( table ) {
  let _sql = "select count(*) as total_count from ??"
  return query( _sql, [table] )
}

module.exports = {
  query,
  createTable,
  findByPage,
  findDataById,
  deleteDataById,
  insertData,
  updateData,
  select,
  count
}