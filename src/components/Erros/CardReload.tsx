import * as React from 'react';
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export function CardReload() {
    const history = useHistory();
    const goToNewAdmissionPage = () => {
        history.push(routes.dashboard);
    };

    return (
        <Box sx={{ minWidth: 275 }} >
            <Card variant="outlined" sx={{ textAlign:"center" }}>
                <React.Fragment>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Tivemos problemas ao carregar as admissões.
                            <p>
                                Por favor, tente mais tarde!
                            </p>
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent:"center" }}>
                        <Button onClick={() => goToNewAdmissionPage()} size="small" variant="contained">Recarregar</Button>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    );
}