#!/bin/bash
docker-compose -f docker-compose.db.yml up -d && sleep 5 && npm run dev & sleep 3 && npx prisma studio &
echo "‚úÖ ByGagoos-Ink d√©marr√© !"
echo "Ìºê API: http://localhost:3001"
echo "Ì∑ÑÔ∏è  Prisma: http://localhost:5555"
wait
