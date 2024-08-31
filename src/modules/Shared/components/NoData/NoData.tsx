import React from "react";
import "./NoData.scss";
import noDataImg from "../../../../assets/images/noData.png";
export default function NoData() {
  return (
    <div id="noData">
      <img src={noDataImg} />
      <span>No Data Found </span>
    </div>
  );
}
