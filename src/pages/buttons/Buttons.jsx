import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const Buttons = () => {
    // To apply styles to material elements
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        }, testButtons: {
            '&': {
                margin: 40,
            }
        },
    }));

    const classes = useStyles();
    
    return <div>
        <Button variant="contained" color="primary" disableElevation className={classes.testButtons}>
            Example button Material-UI
        </Button>
        <Button variant="contained" disabled className={classes.testButtons}>
            Example №2 disabled
        </Button>
    </div>;
};

export default Buttons;