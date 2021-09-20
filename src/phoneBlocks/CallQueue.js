import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    width: "100%",
    maxWidth: 264,
  },
  answer: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
    fontSize: 9,
    alignItems: "center",
  },
  reject: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
    fontSize: 9,
  },
}));

function CallQueue({ calls, handleAnswer, handleReject }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {calls.map((call) => {
        const parsedCaller = call.callNumber.split("-");
        return (
          <Grid
            key={call.sessionId}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={12}>
              {parsedCaller[0] ? (
                <Box
                  overflow="auto"
                  component="div"
                  whiteSpace="normal"
                  bgcolor="background.paper"
                >
                  <Typography variant="caption" gutterBottom>
                    Вызывающий:
                    {parsedCaller[0]}
                  </Typography>
                </Box>
              ) : (
                <div />
              )}
              {parsedCaller[1] ? (
                <Box
                  overflow="auto"
                  component="div"
                  whiteSpace="normal"
                  bgcolor="background.paper"
                >
                  <Typography variant="caption" gutterBottom>
                    Юрисдикция:
                    {parsedCaller[1]}
                  </Typography>
                </Box>
              ) : (
                <div />
              )}
              {parsedCaller[2] ? (
                <Box
                  overflow="auto"
                  component="div"
                  whiteSpace="normal"
                  bgcolor="background.paper"
                >
                  <Typography variant="caption" gutterBottom>
                    Звонок:
                    {parsedCaller[2]}
                  </Typography>
                </Box>
              ) : (
                <div />
              )}
            </Grid>

            <Grid item xs={6}>
              <div className={classes.paper}>
                {" "}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAnswer}
                  value={call.sessionId}
                  className={classes.answer}
                >
                  Ответить
                </Button>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.paper}>
                {" "}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleReject}
                  value={call.sessionId}
                  className={classes.reject}
                >
                  Сбросить
                </Button>
              </div>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}

export default CallQueue;
