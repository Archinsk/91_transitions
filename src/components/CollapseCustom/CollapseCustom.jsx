import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./CollapseCustom.css";
export default function CollapseCustom({
  isOpen,
  className,
  children,
  ...props
}) {
  const collapseRef = useRef(null);
  const [componentClassName, setComponentClassName] = useState(
    "collapse-custom-closed"
  );
  const [isTransition, setIsTransition] = useState(false);
  const [transitionStage, setTransitionStage] = useState("");
  const [collapseHeight, setCollapseHeight] = useState(0);

  // Открывание
  if (
    !isTransition &&
    componentClassName === "collapse-custom-closed" &&
    isOpen &&
    children
  ) {
    setIsTransition(true);
    setComponentClassName("collapse-custom-transiting");
    setTransitionStage("displayBlockHeight0");
  }

  useLayoutEffect(() => {
    if (
      isTransition &&
      componentClassName === "collapse-custom-transiting" &&
      transitionStage === "displayBlockHeight0"
    ) {
      setTransitionStage("growTransitionStarted");
      setCollapseHeight(collapseRef?.current?.scrollHeight);
    }
  }, [componentClassName, isTransition, transitionStage]);

  const handleGrowTransitionEnd = () => {
    if (isTransition && transitionStage === "growTransitionStarted") {
      setComponentClassName("collapse-custom-opened");
      setTransitionStage("");
      setCollapseHeight(0);
      collapseRef?.current?.removeAttribute("style");
      setIsTransition(false);
    }
  };

  // Закрывание
  if (
    !isTransition &&
    componentClassName === "collapse-custom-opened" &&
    !isOpen
  ) {
    setIsTransition(true);
    setComponentClassName("collapse-custom-transiting");
    setTransitionStage("displayBlockHeightContent");
    setCollapseHeight(collapseRef?.current?.scrollHeight);
  }

  useEffect(() => {
    if (
      isTransition &&
      componentClassName === "collapse-custom-transiting" &&
      transitionStage === "displayBlockHeightContent"
    ) {
      setTransitionStage("shrinkTransitionStarted");
      setCollapseHeight(0);
    }
  }, [componentClassName, isTransition, transitionStage]);

  const handleShrinkTransitionEnd = () => {
    if (isTransition && transitionStage === "shrinkTransitionStarted") {
      setComponentClassName("collapse-custom-closed");
      setTransitionStage("");
      collapseRef?.current?.removeAttribute("style");
      setIsTransition(false);
    }
  };

  return (
    <div
      className={
        className ? `${componentClassName} ${className}` : componentClassName
      }
      {...props}
      ref={collapseRef}
      {...(collapseHeight && {
        style: {
          height:
            collapseHeight /
              parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue(
                  "font-size"
                )
              ) +
            "rem",
        },
      })}
      onTransitionEnd={
        (transitionStage === "growTransitionStarted" &&
          handleGrowTransitionEnd) ||
        (transitionStage === "shrinkTransitionStarted" &&
          handleShrinkTransitionEnd) ||
        (() => {})
      }
      {...props}
    >
      {children}
    </div>
  );
}
