import React from 'react';
import RowsTable from './RowsTable';
import AddRowForm from './AddRowForm';
import { Container, Typography, Box } from '@mui/material';

const App = () => {
    const [refresh, setRefresh] = React.useState(false);

    const handleUserAdded = () => {
        setRefresh(!refresh);
    };

    return (
        <Container style={{ marginTop: 32 }}>
            <Typography variant="h4" gutterBottom>
                User Management
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box flex={1} marginRight={2}>
                    <AddRowForm onUserAdded={handleUserAdded} />
                </Box>
                <Box flex={2}>
                    <RowsTable key={refresh} />
                </Box>
            </Box>
        </Container>
    );
};

export default App;
