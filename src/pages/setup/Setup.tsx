import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function Setup() {
  return (
    <div className="SetupPage">
      <Typography variant="h4" component="h4">
        Game Setup
      </Typography>
      <div>TO-DO: add user form to set: Name, age, player colour etc.</div>
      <div>
        <Link to="/game">Start Game</Link>
      </div>
    </div>
  );
}
