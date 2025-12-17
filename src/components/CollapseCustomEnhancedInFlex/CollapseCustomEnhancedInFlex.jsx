import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./CollapseCustomEnhancedInFlex.css";
import { isSameChildren } from "../utils/isSameChildren";
export default function CollapseCustomEnhancedInFlex({
  isOpen,
  className,
  children,
  ...props
}) {
  const collapseRef = useRef(null);
  const [componentClassName, setComponentClassName] = useState(
    isOpen
      ? "collapse-custom-enhanced-in-flex-opened"
      : "collapse-custom-enhanced-in-flex-closed"
  );
  const [collapseStyle, setCollapseStyle] = useState(null);
  const [isTransition, setIsTransition] = useState(false);
  const [transitionStage, setTransitionStage] = useState("");
  const [collapseHeight, setCollapseHeight] = useState(0);
  const [gapCompensationSize, setGapCompensationSize] = useState(null);
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
  console.log(
    "parentElement",
    collapseRef?.current
      ? getComputedStyle(collapseRef?.current?.parentElement).getPropertyValue(
          "column-gap"
        )
      : ""
  );
  console.groupEnd();

  const isPreviousChildrenDelay = useMemo(() => {
    return (
      isOpen && isTransition && !isSameChildren(children, previousChildren)
    );
  }, [isOpen, isTransition, children, previousChildren]);

  let rowGapCompensation;
  let columnGapCompensation;
  let docFontSize = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("font-size")
  );

  if (collapseRef?.current) {
    const parentElement = collapseRef?.current?.parentElement;
    if (
      getComputedStyle(parentElement).getPropertyValue("display") === "flex" &&
      getComputedStyle(parentElement).getPropertyValue("flex-direction") ===
        "column"
    ) {
      console.log("Обнаружен Flex-column");
      rowGapCompensation = parseFloat(
        getComputedStyle(parentElement).getPropertyValue("row-gap")
      );
    }
    console.log("docFontSize", docFontSize);
    console.log("rowGapCompensation", rowGapCompensation);
  }

  // Открывание
  if (
    !isTransition &&
    componentClassName === "collapse-custom-enhanced-in-flex-closed" &&
    isOpen &&
    children
  ) {
    setIsTransition(true);
    setComponentClassName("collapse-custom-enhanced-in-flex-transiting");
    setTransitionStage("displayBlockHeight0");
  }

  useLayoutEffect(() => {
    if (
      isTransition &&
      componentClassName === "collapse-custom-enhanced-in-flex-transiting" &&
      transitionStage === "displayBlockHeight0"
    ) {
      console.log("useLayoutEffect");

      setTransitionStage("growTransitionStarted");
      setCollapseHeight(collapseRef?.current?.scrollHeight);
    }
  }, [componentClassName, isTransition, transitionStage]);

  const handleGrowTransitionEnd = () => {
    if (isTransition && transitionStage === "growTransitionStarted") {
      setComponentClassName("collapse-custom-enhanced-in-flex-opened");
      setTransitionStage("");
      setCollapseHeight(0);
      collapseRef?.current?.removeAttribute("style");
      setIsTransition(false);
    }
  };

  // Плавное появление несуществующего содержимого при открытом коллапсе
  if (
    !isTransition &&
    componentClassName === "collapse-custom-enhanced-in-flex-opened" &&
    isOpen &&
    !previousChildren &&
    children
  ) {
    setIsTransition(true);
    setComponentClassName("collapse-custom-enhanced-in-flex-transiting");
    setTransitionStage("displayBlockHeight0");
    setPreviousChildren(children);
  }

  // Закрывание
  if (
    !isTransition &&
    componentClassName === "collapse-custom-enhanced-in-flex-opened" &&
    !isOpen
  ) {
    setIsTransition(true);
    setComponentClassName("collapse-custom-enhanced-in-flex-transiting");
    setTransitionStage("displayBlockHeightContent");
    let style = {};
    style.height = collapseRef?.current?.scrollHeight / docFontSize + "rem";
    if (rowGapCompensation) {
      style.marginTop = "0rem";
    }
    console.log(style);
    setCollapseStyle(style);
  }

  useEffect(() => {
    if (
      isTransition &&
      componentClassName === "collapse-custom-enhanced-in-flex-transiting" &&
      transitionStage === "displayBlockHeightContent"
    ) {
      setTransitionStage("shrinkTransitionStarted");
      let style = {};
      style.height = "0rem";
      if (rowGapCompensation) {
        style.marginTop = (-1 * rowGapCompensation) / docFontSize + "rem";
      }
      setCollapseStyle(style);
    }
  }, [componentClassName, isTransition, transitionStage]);

  const handleShrinkTransitionEnd = () => {
    if (isTransition && transitionStage === "shrinkTransitionStarted") {
      /* Скрытие существующего контента (display: none) */
      if (
        previousChildren &&
        children &&
        isSameChildren(children, previousChildren)
      ) {
        setComponentClassName("collapse-custom-enhanced-in-flex-closed");
        setCollapseStyle(null);
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
        setComponentClassName("collapse-custom-enhanced-in-flex-opened");
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
    componentClassName === "collapse-custom-enhanced-in-flex-opened" &&
    isOpen &&
    previousChildren &&
    !children
  ) {
    setComponentClassName("collapse-custom-enhanced-in-flex-transiting");
    setTransitionStage("displayBlockHeightContent");
    setCollapseHeight(collapseRef?.current?.scrollHeight);
    setIsTransition(true);
  }

  // Плавная замена одного контента на другой при открытом коллапсе
  // Упростить! То же, что и в предыдущем условии
  console.log("isSameChildren: ", isSameChildren(children, previousChildren));

  if (
    !isTransition &&
    componentClassName === "collapse-custom-enhanced-in-flex-opened" &&
    isOpen &&
    previousChildren &&
    children &&
    !isSameChildren(children, previousChildren)
  ) {
    console.log("Плавная замена");

    setComponentClassName("collapse-custom-enhanced-in-flex-transiting");
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
      {...(collapseStyle && {
        style: collapseStyle,
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
