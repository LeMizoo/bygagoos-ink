-- backend/init.sql
-- Création d'un utilisateur spécifique pour l'application
CREATE USER bygagoos_app WITH PASSWORD 'ByGagoosApp2025!';

-- Attribution des privilèges
GRANT ALL PRIVILEGES ON DATABASE bygagoos_ink TO bygagoos_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO bygagoos_app;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO bygagoos_app;

-- Création d'un schéma pour l'application (optionnel)
CREATE SCHEMA IF NOT EXISTS bygagoos_schema;
GRANT ALL PRIVILEGES ON SCHEMA bygagoos_schema TO bygagoos_app;