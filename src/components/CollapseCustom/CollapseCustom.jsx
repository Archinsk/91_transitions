import { useState } from "react";
import "./CollapseCustom.css";
export default function CollapseCustom({
  isOpen,
  classname,
  children,
  ...props
}) {
  const [componentClassName, setComponentClassName] = useState(
    "collapse-custom-closed"
  );
  const [isTransition, setIsTransition] = useState(false);
  const [transitionStage, setTransitionStage] = useState("");
  // Открывание
  if (
    !isTransition &&
    componentClassName === "collapse-custom-closed" &&
    isOpen
  ) {
    setIsTransition(true);
    setComponentClassName("collapse-custom-transiting");
    setTransitionStage("displayBlockHeight0");
  }
  // Закрывание
  if (
    !isTransition &&
    componentClassName === "collapse-custom-opened" &&
    !isOpen
  ) {
    setIsTransition(true);
    setComponentClassName("collapse-custom-closed");
  }
  return (
    <div className={componentClassName} {...props}>
      {children}
    </div>
  );
}
