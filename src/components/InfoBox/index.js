import React from "react";

// Node modules
import { Card, CardContent, Typography } from "@material-ui/core";

// Local files
import "./index.scss";

/**
 * InfoBox component that displays cases statistics
 *
 * @param {boolean} selected
 * @param {boolean} isRed
 * @param {String} title
 * @param {Number} cases
 * @param {Number} total
 */
function InfoBox({ selected, isRed, title, cases, total, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${selected && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`} //BEM: __element && --modifier
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>
        <Typography className="infoBox__total" color="textSecondary">
          {total}
          {" Total"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
