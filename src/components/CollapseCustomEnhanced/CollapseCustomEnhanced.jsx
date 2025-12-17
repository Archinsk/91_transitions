import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./CollapseCustomEnhanced.css";
import { isSameChildren } from "../utils/isSameChildren";
export default function CollapseCustomEnhanced({
  isOpen,
  className,
  children,
  ...props
}) {
  const collapseRef = useRef(null);
  const [componentClassName, setComponentClassName] = useState(
    isOpen ? "collapse-custom-opened" : "collapse-custom-closed"
  );
  const [isTransition, setIsTransition] = useState(false);
  const [transitionStage, setTransitionStage] = useState("");
  const [collapseHeight, setCollapseHeight] = useState(0);
  const [previousChildren, setPreviousChildren] = useState(children || null);

  console.groupCollapsed("Состояния CollapseCustomEnhanced");
  console.log("isOpen: ", isOpen);
  console.log("children: ", children);
  console.log("componentClassName: ", componentClassName);
  console.log("isTransition: ", isTransition);
  console.log("transitionStage: ", transitionStage);
  console.log("collapseHeight: ", collapseHeight);
  console.log("previousChildren: ", previousChildren);
  console.log("collapseRef", collapseRef);
  console.groupEnd();

  const isPreviousChildrenDelay = useMemo(() => {
    return (
      isOpen && isTransition && !isSameChildren(children, previousChildren)
    );
  }, [isOpen, isTransition, children, previousChildren]);

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
      console.log("useLayoutEffect");

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

  // Плавное появление несуществующего содержимого при открытом коллапсе
  if (
    !isTransition &&
    componentClassName === "collapse-custom-opened" &&
    isOpen &&
    !previousChildren &&
    children
  ) {
    setIsTransition(true);
    setComponentClassName("collapse-custom-transiting");
    setTransitionStage("displayBlockHeight0");
    setPreviousChildren(children);
  }

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
      if (
        previousChildren &&
        children &&
        isSameChildren(children, previousChildren)
      ) {
        setComponentClassName("collapse-custom-closed");
      }
      if (
        previousChildren &&
        children &&
        !isSameChildren(children, previousChildren)
      ) {
        setTransitionStage("displayBlockHeight0");
        setPreviousChildren(children);
      }
      if (previousChildren && !children) {
        setComponentClassName("collapse-custom-opened");
        setPreviousChildren(null);
      }
      // Требуется упрощение
      if (
        !(
          previousChildren &&
          children &&
          !isSameChildren(children, previousChildren)
        )
      ) {
        setTransitionStage("");
        collapseRef?.current?.removeAttribute("style");
        setIsTransition(false);
      }
    }
  };

  // Плавное исчезновение существующего содержимого при открытом коллапсе
  if (
    !isTransition &&
    componentClassName === "collapse-custom-opened" &&
    isOpen &&
    previousChildren &&
    !children
  ) {
    setComponentClassName("collapse-custom-transiting");
    setTransitionStage("displayBlockHeightContent");
    setCollapseHeight(collapseRef?.current?.scrollHeight);
    setIsTransition(true);
  }

  // Плавная замена одного контента на другой при открытом коллапсе
  // Упростить! То же, что и в предыдущем условии
  console.log("isSameChildren: ", isSameChildren(children, previousChildren));

  if (
    !isTransition &&
    componentClassName === "collapse-custom-opened" &&
    isOpen &&
    previousChildren &&
    children &&
    !isSameChildren(children, previousChildren)
  ) {
    console.log("Плавная замена");

    setComponentClassName("collapse-custom-transiting");
    setTransitionStage("displayBlockHeightContent");
    console.log("collapseRef", collapseRef?.current?.scrollHeight);
    setCollapseHeight(collapseRef?.current?.scrollHeight);
    setIsTransition(true);
  }

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
      {isPreviousChildrenDelay && previousChildren}
      {!isPreviousChildrenDelay && children}
    </div>
  );
}
