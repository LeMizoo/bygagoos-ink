-- backend/init.sql
-- Script d'initialisation de la base de données

-- Créer l'extension pour UUID si nécessaire
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Message de log
DO $$ 
BEGIN
    RAISE NOTICE 'Base de données ByGagoos-Ink initialisée le %', NOW();
END $$;