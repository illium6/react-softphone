import Grid from "@mui/material/Grid";
import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Label from "./Label";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "256px",
    padding: "27px",
  },
  online: {
    color: "green",
    backgroundColor: "#d0f6bb",
  },
  offline: {
    color: "red",
    backgroundColor: "#f6bbbb",
  },
}));

function StatusBlock({ connectingPhone, connectedPhone }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={5}>
          <Typography id="continuous-slider" gutterBottom>
            СТАТУС
          </Typography>
        </Grid>
        <Grid item xs={3}>
          {!connectingPhone ? (
            connectedPhone ? (
              <Label className={classes.online} color="primary">
                ОНЛАЙН
              </Label>
            ) : (
              <Label className={classes.offline} color="primary">
                ОФФЛАЙН
              </Label>
            )
          ) : !connectedPhone ? (
            <Label className={classes.online} color="primary">
              ПОДКЛЮЧЕНИЕ
            </Label>
          ) : (
            <Label className={classes.offline} color="primary">
              ОТКЛЮЧЕНИЕ
            </Label>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default StatusBlock;
