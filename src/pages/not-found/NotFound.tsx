import React from "react";

import Typography from "@mui/material/Typography";
import StarBackground from "../../components/star-background";

export default function NotFound() {
  return (
    <div className="NotFoundPage">
      <StarBackground />
      <Typography variant="h3" component="h3">
        Page not found... Lost in space...
      </Typography>
    </div>
  );
}
