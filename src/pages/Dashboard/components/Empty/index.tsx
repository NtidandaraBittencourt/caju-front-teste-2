import * as React from 'react';
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function OutlinedCard() {
    const history = useHistory();
    const goToNewAdmissionPage = () => {
        history.push(routes.newUser);
    };

    return (
        <Box sx={{ minWidth: 275 }} >
            <Card variant="outlined" sx={{ textAlign:"center" }}>
                <React.Fragment>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Ainda sem admissões!!
                            <p>
                            Comece a cadastrar suas admissões :)

                            </p>
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent:"center" }}>
                        <Button onClick={() => goToNewAdmissionPage()} size="small" variant="contained">Nova Admissão</Button>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    );
}