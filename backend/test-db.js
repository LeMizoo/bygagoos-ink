const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://postgres:ByGagoos2025!@localhost:5432/bygagoos_ink"
});

async function testConnection() {
  try {
    await client.connect();
    console.log('‚úÖ Connexion √† PostgreSQL r√©ussie!');
    
    const result = await client.query('SELECT version()');
    console.log('Ì≥ä Version PostgreSQL:', result.rows[0].version);
    
    await client.end();
  } catch (error) {
    console.error('‚ùå Erreur de connexion:', error.message);
    console.log('\nÌ≤° Solutions possibles:');
    console.log('1. V√©rifiez que Docker PostgreSQL est d√©marr√©');
    console.log('2. V√©rifiez le port dans DATABASE_URL');
    console.log('3. V√©rifiez le mot de passe');
  }
}

testConnection();
