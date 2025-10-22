import mysql from 'mysql2/promise';

async function runMigrations() {
  if (!process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
    throw new Error("Missing database credentials in environment variables");
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    console.log('[Migration] Checking database schema...');

    // Check if contacted column exists in seo_analysis
    const [columns] = await connection.query(
      "SHOW COLUMNS FROM seo_analysis LIKE 'contacted'"
    );
    
    if ((columns as any[]).length === 0) {
      console.log('[Migration] Adding contacted column to seo_analysis...');
      await connection.query(
        'ALTER TABLE seo_analysis ADD COLUMN contacted TINYINT NOT NULL DEFAULT 0'
      );
      console.log('[Migration] ✓ contacted column added');
    } else {
      console.log('[Migration] contacted column already exists');
    }

    // Check if contact_messages table exists
    const [tables] = await connection.query(
      "SHOW TABLES LIKE 'contact_messages'"
    );
    
    if ((tables as any[]).length === 0) {
      console.log('[Migration] Creating contact_messages table...');
      await connection.query(`
        CREATE TABLE contact_messages (
          id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          message TEXT NOT NULL,
          status VARCHAR(20) NOT NULL DEFAULT 'nuevo',
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('[Migration] ✓ contact_messages table created');
    } else {
      console.log('[Migration] contact_messages table already exists');
    }

    // Check if projects_seoweb table exists
    const [projectsSeowebTables] = await connection.query(
      "SHOW TABLES LIKE 'projects_seoweb'"
    );
    
    if ((projectsSeowebTables as any[]).length === 0) {
      console.log('[Migration] Creating projects_seoweb table...');
      await connection.query(`
        CREATE TABLE projects_seoweb (
          id INT PRIMARY KEY AUTO_INCREMENT,
          title VARCHAR(255) NOT NULL,
          category VARCHAR(100) NOT NULL,
          description TEXT NOT NULL,
          image_path VARCHAR(500) NOT NULL,
          external_link VARCHAR(500),
          display_order INT NOT NULL DEFAULT 0,
          is_active TINYINT NOT NULL DEFAULT 1,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('[Migration] ✓ projects_seoweb table created');
    } else {
      console.log('[Migration] projects_seoweb table already exists');
    }

    console.log('[Migration] All migrations completed successfully');
  } catch (error) {
    console.error('[Migration] Error running migrations:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

export { runMigrations };
