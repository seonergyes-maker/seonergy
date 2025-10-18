import mysql from 'mysql2/promise';

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    // Check if table exists
    const [tables] = await connection.query(
      "SHOW TABLES LIKE 'seo_analysis'"
    );

    if ((tables as any[]).length === 0) {
      // Create table
      await connection.query(`
        CREATE TABLE seo_analysis (
          id INT AUTO_INCREMENT PRIMARY KEY,
          unique_id VARCHAR(100) NOT NULL UNIQUE,
          website VARCHAR(500) NOT NULL,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          results TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        )
      `);
      console.log('✓ Table seo_analysis created successfully');
    } else {
      // Check if we need to add new columns
      const [columns] = await connection.query(
        "SHOW COLUMNS FROM seo_analysis LIKE 'unique_id'"
      );

      if ((columns as any[]).length === 0) {
        // Add new columns
        await connection.query(`
          ALTER TABLE seo_analysis 
          ADD COLUMN unique_id VARCHAR(100) NOT NULL UNIQUE AFTER id,
          ADD COLUMN results TEXT NOT NULL,
          DROP COLUMN status
        `);
        console.log('✓ Table seo_analysis updated successfully');
      } else {
        console.log('✓ Table seo_analysis already up to date');
      }
    }
  } catch (error) {
    console.error('Migration error:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

migrate().then(() => {
  console.log('Migration completed');
  process.exit(0);
}).catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
