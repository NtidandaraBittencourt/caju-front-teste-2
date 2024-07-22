import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFetch } from '~/hooks/useFetch';
import { Loading } from '~/components/Loading';

export default function OutlinedCard() {

    const { refetch, isLoading } = useFetch();

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
                        <Button onClick={ refetch } size="small" variant="contained">Nova Admissão</Button>
                    </CardActions>
                </React.Fragment>
            </Card>

            {isLoading && <Loading />}
        </Box>
    );
}