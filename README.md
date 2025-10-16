# Abductions Database Manager

A simple Node.js application for managing a SQLite database of fictional "abductions" data. This project includes scripts to seed the database with sample data and retrieve/view all records. It's built using ES modules and the `sqlite` and `sqlite3` libraries for database operations.

**Note**: This appears to be an example or demo project. The theme ("abductions") is likely fictional; adapt it for real-world use cases like product catalogs or event logging.

## Features
- Seed a SQLite database with sample data from `abductionsData.js`.
- Query and display all records from the `abductions` table.
- Error handling for database operations, including transactions and rollbacks.
- Uses asynchronous database connections for better performance.

## Prerequisites
- Node.js (version 14 or higher recommended) with ES module support.
- npm or yarn for package management.

## Installation

1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd abductions-database-manager
   ```

2. Install dependencies:
   ```
   npm install sqlite3 sqlite
   ```
   - `sqlite3`: Low-level SQLite driver.
   - `sqlite`: Higher-level async wrapper for SQLite.

3. Ensure you have the data file:
   - Create or include `abductionsData.js` in the root directory. It should export an array of objects like:
     ```javascript
     export const abductionsData = [
       { location: 'Example Location 1', details: 'Detailed description here...' },
       { location: 'Example Location 2', details: 'Another description...' },
       // Add more entries as needed
     ];
     ```
   - The database file (`database.db`) will be created automatically in the root directory when running the scripts.

## Usage

### 1. Seeding the Database
Run the seeding script to insert sample data into the `abductions` table. This creates the table if it doesn't exist (via the INSERT statements) and handles transactions.

- File: `seedTable.js` (based on your provided code).
- Command:
  ```
  node seedTable.js
  ```

Expected output:
```
ALl records Inserted!!
Connection Closed!!
```
- If an error occurs (e.g., duplicate data), it will roll back the transaction and log the error.

### 2. Viewing All Records
Run the view script to fetch and display all records from the `abductions` table in a console table format.

- File: `viewAllProducts.js` (based on your provided code; note the function name suggests it might be adaptable for products).
- Command:
  ```
  node viewAllProducts.js
  ```

Expected output:
A console table like:
```
┌─────────┬────────────┬──────────────────────────────┐
│ (index) │ location   │ details                      │
├─────────┼────────────┼──────────────────────────────┤
│ 0       │ Location 1 │ Detailed description...      │
│ 1       │ Location 2 │ Another description...       │
└─────────┴────────────┴──────────────────────────────┘
```

- Uncomment the commented lines in `viewAllProducts.js` if you want to truncate details (e.g., first 50 characters) or customize the display.

### Database Schema
The scripts assume a simple table structure:
```sql
CREATE TABLE IF NOT EXISTS abductions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  location TEXT NOT NULL,
  details TEXT NOT NULL
);
```
- The table is created implicitly on first INSERT if it doesn't exist (SQLite behavior).
- Data is inserted via parameterized queries to prevent SQL injection.

## Project Structure
```
abductions-database-manager/
├── viewAllProducts.js      # Script to query and display data
├── seedTable.js            # Script to seed the database
├── abductionsData.js       # Sample data export (create this file)
├── database.db             # SQLite database (generated on run)
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Running in Development
- Add scripts to `package.json` for convenience:
  ```json
  {
    "scripts": {
      "seed": "node seedTable.js",
      "view": "node viewAllProducts.js",
      "dev": "npm run seed && npm run view"
    }
  }
  ```
- Then run: `npm run dev` to seed and view in one go.

## Potential Improvements
- Add CRUD operations (update/delete) for full database management.
- Use an ORM like Sequelize or Prisma for more complex queries.
- Handle file paths more robustly (e.g., using environment variables for DB location).
- Add tests with Jest or similar for database interactions.
- If adapting for production, consider migrating to a full database like PostgreSQL.

## Troubleshooting
- **Module not found errors**: Ensure you're using ES modules. Add `"type": "module"` to `package.json` if needed.
- **SQLite errors**: Check file permissions for `database.db`. Delete it to reset the DB.
- **Import issues**: Verify `abductionsData.js` exports correctly (use `export` for ES modules).
- **BEGIN TRANSACTION spelling**: Your code has a comment about this—it's correctly spelled as `BEGIN TRANSACTION` (no issues in the provided snippet).
