import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { abductionsData } from './abductionsData.js'

const seedTable = async () => {
  const db = await open( {
    filename: path.join('database.db'),
    driver: sqlite3.Database
  })
  try {
    await db.exec('BEGIN TRANSACTION')  //spelling wrong huda error auxa hai "BEGIN TRANSACTION"
    for( const {location, details} of abductionsData) {
      await db.run(` INSERT INTO abductions (location, details)
        VALUES (?, ?)`,
        [location, details]
      )
    }
    await db.exec('COMMIT')
    console.log('ALl records Inserted!!')
  } catch (err) {
    await db.exec('ROLLBACK')
    console.log('Error in Inserting Data', err.message)
  } finally {
    await db.close()
    console.log('Connection Closed!!')
  }
}
seedTable()