import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';

const DocumentsPage = () => {
  const documents = [
    { id: 1, name: 'Contrat Standard.pdf', type: 'pdf', size: '2.4 MB', date: '10/12/2025' },
    { id: 2, name: 'Design T-shirt.ai', type: 'ai', size: '8.7 MB', date: '08/12/2025' },
    { id: 3, name: 'Facture_001.docx', type: 'doc', size: '1.2 MB', date: '05/12/2025' },
    { id: 4, name: 'Logo Atelier.png', type: 'image', size: '3.1 MB', date: '01/12/2025' },
    { id: 5, name: 'Guide Sérigraphie.pdf', type: 'pdf', size: '5.6 MB', date: '28/11/2025' },
  ];

  const folders = [
    { id: 1, name: 'Contrats Clients', count: 12 },
    { id: 2, name: 'Designs', count: 25 },
    { id: 3, name: 'Factures', count: 8 },
    { id: 4, name: 'Documentation', count: 15 },
  ];

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <PictureAsPdfIcon sx={{ color: '#f44336' }} />;
      case 'image': return <ImageIcon sx={{ color: '#4caf50' }} />;
      case 'doc': return <InsertDriveFileIcon sx={{ color: '#2196f3' }} />;
      case 'ai': return <InsertDriveFileIcon sx={{ color: '#ff9800' }} />;
      default: return <InsertDriveFileIcon />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <DescriptionIcon sx={{ fontSize: 40, color: '#2E7D32' }} />
          <Box>
            <Typography variant="h4" component="h1" sx={{ color: '#2E7D32', fontWeight: 600 }}>
              📁 Système de Documents
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Gérez et partagez vos documents familiaux
            </Typography>
          </Box>
        </Box>

        {/* Dossiers */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#2E7D32', mb: 2 }}>
            Dossiers
          </Typography>
          <Grid container spacing={3}>
            {folders.map((folder) => (
              <Grid item xs={12} sm={6} md={3} key={folder.id}>
                <Card sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  }
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <FolderIcon sx={{ fontSize: 60, color: '#ff9800', mb: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      {folder.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {folder.count} documents
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Documents récents */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ color: '#2E7D32', mb: 2 }}>
            Documents récents
          </Typography>
          <List sx={{ bgcolor: 'background.paper' }}>
            {documents.map((doc) => (
              <ListItem
                key={doc.id}
                secondaryAction={
                  <Box>
                    <IconButton edge="end" aria-label="download" sx={{ mr: 1 }}>
                      <DownloadIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </Box>
                }
                sx={{ 
                  borderBottom: '1px solid #e0e0e0',
                  '&:hover': { bgcolor: '#f5f5f5' }
                }}
              >
                <ListItemIcon>
                  {getFileIcon(doc.type)}
                </ListItemIcon>
                <ListItemText 
                  primary={doc.name}
                  secondary={`${doc.size} • ${doc.date}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ 
          mt: 4, 
          p: 3, 
          bgcolor: 'info.light', 
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <Typography variant="h6" color="info.dark" gutterBottom>
            📤 Partage de fichiers
          </Typography>
          <Typography variant="body2" color="info.dark" sx={{ mb: 2 }}>
            Téléchargez et partagez vos documents avec les membres de la famille
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mr: 2 }}
            onClick={() => alert('Upload en développement')}
          >
            + Uploader un document
          </Button>
          <Button 
            variant="outlined"
            onClick={() => alert('Créer un dossier')}
          >
            + Nouveau dossier
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default DocumentsPage;