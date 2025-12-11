// backend/test-db.js
const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://postgres:ByGagoos2025!@localhost:5432/bygagoos_ink"
});

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Connexion à PostgreSQL réussie!');
    
    const result = await client.query('SELECT version()');
    console.log('📊 Version PostgreSQL:', result.rows[0].version);
    
    // Tester si la base existe
    const dbResult = await client.query(`
      SELECT datname FROM pg_database 
      WHERE datname = 'bygagoos_ink'
    `);
    
    if (dbResult.rows.length > 0) {
      console.log('✅ Base de données "bygagoos_ink" existe');
    } else {
      console.log('⚠️  Base de données "bygagoos_ink" n\'existe pas');
      console.log('💡 Création de la base...');
      await client.query('CREATE DATABASE bygagoos_ink');
      console.log('✅ Base créée');
    }
    
    await client.end();
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    console.log('\n💡 Solutions possibles:');
    console.log('1. Vérifiez que Docker PostgreSQL est démarré');
    console.log('2. Vérifiez le port dans DATABASE_URL');
    console.log('3. Vérifiez le mot de passe');
    console.log('\n📋 Docker commandes:');
    console.log('   docker ps -a');
    console.log('   docker start bygagoos-db');
  }
}

testConnection();