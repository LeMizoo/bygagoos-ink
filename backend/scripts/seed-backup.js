const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tia-faniry-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connecté à la base de données');

    // Vérifier si l'admin existe déjà
    const existingAdmin = await User.findOne({ email: 'tovoniaina.rahendrison@gmail.com' });
    
    if (existingAdmin) {
      console.log('⚠️  L\'utilisateur admin existe déjà');
      await mongoose.disconnect();
      return;
    }

    // Créer l'utilisateur admin
    const adminUser = new User({
      name: 'Tovoniaina RAHENDRISON',
      email: 'tovoniaina.rahendrison@gmail.com',
      password: 'Admin123!', // Changez ce mot de passe en production
      role: 'admin',
      isActive: true
    });

    await adminUser.save();
    
    console.log('✅ Utilisateur admin créé avec succès');
    console.log('📧 Email:', adminUser.email);
    console.log('🔑 Mot de passe: Admin123!');
    console.log('⚠️  IMPORTANT: Changez le mot de passe après la première connexion!');

    await mongoose.disconnect();
    console.log('✅ Déconnecté de la base de données');

  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'admin:', error);
    process.exit(1);
  }
};

seedAdmin();