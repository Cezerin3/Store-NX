import React from "react";

const Tags = ({
  tags
}) => {
  if (tags && tags.length > 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "tags"
    }, tags.map((tag, index) => /*#__PURE__*/React.createElement("span", {
      key: index,
      className: "tag"
    }, tag)));
  } else {
    return null;
  }
};

export default Tags;