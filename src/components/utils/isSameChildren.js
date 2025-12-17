import { Children } from "react";

const getFirstLevelChildrenExistanceAndKeys = (children) => {
  if (!children) {
    return null;
  }
  const childrenArray = Children.toArray(children);
  if (childrenArray.length === 1 && !children.length) {
    return [{ key: children.key }];
  }
  let count = -1;
  const existanceAndKeys = children.map((child) => {
    if (typeof child === "boolean") {
      return child;
    }
    if (typeof child === "object") {
      count++;
      return { key: childrenArray[count]?.key };
    }
  });
  return existanceAndKeys;
};

export const isSameChildren = (children1, children2) => {
  return (
    JSON.stringify(getFirstLevelChildrenExistanceAndKeys(children1)) ===
    JSON.stringify(getFirstLevelChildrenExistanceAndKeys(children2))
  );
};
