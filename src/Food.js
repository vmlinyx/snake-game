import React from "react";

const Food = function (props) {
  const style = {
    left: `${props.foodDot[0]}%`,
    top: `${props.foodDot[1]}%`,
  };
  return <div className="snake-food" style={style}></div>;
};

export default Food;
