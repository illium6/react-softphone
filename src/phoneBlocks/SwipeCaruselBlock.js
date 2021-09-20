import React from "react";
import SwipeableViews from "react-swipeable-views";

import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => {
  return {
    tabs: {
      textTransform: "none",
      minWidth: "25%",
      marginRight: "auto",
      // marginRight: theme.spacing(4),
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        color: "#40a9ff",
        opacity: 1,
      },
      "&:focus": {
        color: "#40a9ff",
      },
    },
    tabPanelHold: {
      backgroundColor: "#ff8686",
    },
    tabPanelActive: {
      backgroundColor: "#8bff87",
    },
    text: {
      color: "black",
    },
  };
});

function SwipeCaruselBlock({
  localStatePhone,
  activeChannel,
  setActiveChannel,
}) {
  const classes = useStyles();
  const [duration, setDuration] = React.useState([
    {
      duration: 0,
    },
    {
      duration: 0,
    },
    {
      duration: 0,
    },
  ]);
  const [intervals, setintervals] = React.useState([
    {
      intrId: 0,
      active: false,
    },
    {
      intrId: 0,
      active: false,
    },
    {
      intrId: 0,
      active: false,
    },
  ]);
  const { displayCalls } = localStatePhone;
  const handleTabChangeIndex = (index) => {
    setActiveChannel(index);
  };
  const handleTabChange = (event, newValue) => {
    setActiveChannel(newValue);
  };

  displayCalls.map((displayCall, key) => {
    // if Call just started then increment duration every one second
    if (
      displayCall.inCall === true &&
      displayCall.inAnswer === true &&
      intervals[key].active === false
    ) {
      const intr = setInterval(() => {
        setDuration((durations) => ({
          ...durations,
          [key]: { duration: durations[key].duration + 1 },
        }));
      }, 1000);

      setintervals((inter) => ({
        ...inter,
        [key]: { intrId: intr, active: true },
      }));
    }
    // if Call ended  then stop  increment duration every one second
    if (
      displayCall.inCall === false &&
      displayCall.inAnswer === false &&
      intervals[key].active === true
    ) {
      clearInterval(intervals[key].intrId);
      setDuration((durations) => ({ ...durations, [key]: { duration: 0 } }));
      setintervals((inter) => ({
        ...inter,
        [key]: { intrId: 0, active: false },
      }));
    }
    return true;
  });

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={activeChannel}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab className={classes.tabs} label="CH 1" {...a11yProps(0)} />
          <Tab className={classes.tabs} label="CH 2" {...a11yProps(1)} />
          <Tab className={classes.tabs} label="CH 3" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis="x"
        index={activeChannel}
        onChangeIndex={handleTabChangeIndex}
      >
        {displayCalls.map((displayCall, key) => (
          <TabPanel
            key={`${displayCall.id}-TabPanel`}
            className={
              displayCall.hold ? classes.tabPanelHold : classes.tabPanelActive
            }
            value={key}
            index={displayCall.id}
          >
            {displayCall.inCall ? (
              displayCall.inAnswer ? (
                displayCall.hold ? (
                  // Show hold Call info
                  <div className={classes.text}>
                    <Typography>Статус: {displayCall.callInfo}</Typography>
                    <Typography>
                      Длительность:
                      {duration[key].duration}
                    </Typography>
                    <Typography>
                      Номер:
                      {displayCall.callNumber}
                    </Typography>
                    <Typography>
                      Тип звонка:
                      {displayCall.direction}
                    </Typography>
                  </div>
                ) : displayCall.inTransfer ? (
                  // Show In Transfer info
                  <div className={classes.text}>
                    <Typography>Статус: {displayCall.callInfo}</Typography>
                    <Typography>
                      Тип звонка:
                      {displayCall.direction}
                    </Typography>
                    <Typography>
                      Длительность:
                      {duration[key].duration}
                    </Typography>
                    <Typography>Номер: {displayCall.callNumber}</Typography>
                    <Typography>
                      Перевод к : {displayCall.transferNumber}
                    </Typography>
                    <Typography>
                      {displayCall.attendedTransferOnline.length > 1 &&
                      !displayCall.inConference ? (
                        <span>
                          {"Talking with :"}{" "}
                          {displayCall.attendedTransferOnline}
                        </span>
                      ) : null}
                    </Typography>
                  </div>
                ) : (
                  // Show In Call info
                  <div className={classes.text}>
                    <Typography>
                      Статус:
                      {displayCall.callInfo}
                    </Typography>
                    <Typography>
                      Тип звонка:
                      {displayCall.direction}
                    </Typography>
                    <Typography>
                      Длительность:
                      {duration[key].duration}
                    </Typography>
                    <Typography>
                      Номер:
                      {displayCall.callNumber}
                    </Typography>
                  </div>
                )
              ) : (
                // Show Calling info
                <div className={classes.text}>
                  <Typography>Статус: {displayCall.callInfo}</Typography>
                  <Typography>Тип звонка: {displayCall.direction}</Typography>
                  <Typography>Номер: {displayCall.callNumber}</Typography>
                </div>
              )
            ) : (
              // Show Ready info
              <div className={classes.text}>
                <Typography>
                  Статус: {displayCall.callInfo} {displayCall.info}
                </Typography>
              </div>
            )}
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
}

SwipeCaruselBlock.propTypes = {
  localStatePhone: PropTypes.any,
  activeChannel: PropTypes.any,
  setActiveChannel: PropTypes.any,
};
export default SwipeCaruselBlock;
