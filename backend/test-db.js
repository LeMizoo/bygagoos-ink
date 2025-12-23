const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/bygagoos_ink"
});

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Connexion à PostgreSQL réussie!');
    
    const result = await client.query('SELECT version()');
    console.log('��� Version PostgreSQL:', result.rows[0].version);
    
    await client.end();
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    console.log('\n��� Solutions possibles:');
    console.log('1. Vérifiez que Docker PostgreSQL est démarré');
    console.log('2. Vérifiez le port dans DATABASE_URL');
    console.log('3. Vérifiez le mot de passe');
  }
}

testConnection();
