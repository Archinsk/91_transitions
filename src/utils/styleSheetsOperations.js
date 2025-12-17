const styleSheets = document.styleSheets;

const findStyleSheetIndexAndCssRuleIndexByCssSelector = (selector) => {
  console.log("findStyleSheetIndexAndCssRuleIndexByCssSelector", selector);
  const indexes = { styleSheetIndex: null, cssRuleIndex: null };
  for (let i = styleSheets.length - 1; i >= 0; i--) {
    const styleSheet = styleSheets[i];
    for (let j = styleSheet.cssRules.length - 1; j >= 0; j--) {
      // TODO!! Ищет только по началу правила. Нужно искать по всему тексту
      if (styleSheet.cssRules[j].cssText.startsWith(selector + " {")) {
        indexes.styleSheetIndex = i;
        indexes.cssRuleIndex = j;
        return indexes;
      }
    }
  }
  return null;
};

const findCssRuleIndexByCssProperty = (styleSheetIndex, property) => {
  console.log("findCssRuleIndexByCssProperty", styleSheetIndex, property);
  const cssRules = styleSheets[styleSheetIndex].cssRules;
  for (let i = 0; i < cssRules.length; i++) {
    if (cssRules[i].cssText.includes(property)) {
      return i;
    }
  }
};

const checkPropertyByStyleSheetIndexAndCssRuleIndex = (
  styleSheetIndex,
  cssRuleIndex,
  property
) => {
  if (
    styleSheets[styleSheetIndex].cssRules[cssRuleIndex].cssText.indexOf(
      property
    ) >= 0
  ) {
    return true;
  }
  return false;
};

const createCssRuleByStyleSheetIndexAndCssRuleIndex = (
  styleSheetIndex,
  cssRuleIndex,
  cssRuleCssText
) => {
  console.log(
    "createCssRuleByStyleSheetIndexAndCssRuleIndex",
    styleSheetIndex,
    cssRuleIndex,
    cssRuleCssText
  );
  styleSheets[styleSheetIndex].insertRule(cssRuleCssText, cssRuleIndex);
  console.log("document.styleSheets", styleSheets);
};

const createCssPropertyInExistedCssRuleByStyleSheetIndexAndCssRuleIndex = (
  styleSheetIndex,
  cssRuleIndex,
  cssRuleObject
) => {
  console.log(
    "createCssPropertyInExistedCssRuleByStyleSheetIndexAndCssRuleIndex",
    styleSheetIndex,
    cssRuleIndex,
    cssRuleObject
  );
  const newProperty = `${cssRuleObject.property}: ${cssRuleObject.value}${cssRuleObject.unit || ""}`;
  console.log("newProperty", newProperty);
  const updatedCssRuleText =
    styleSheets[styleSheetIndex].cssRules[cssRuleIndex].cssText;
  const insertionIndex = updatedCssRuleText.indexOf("}");
  const newCssRuleCssText =
    updatedCssRuleText.slice(0, insertionIndex) +
    newProperty +
    updatedCssRuleText.slice(insertionIndex);
  deleteCssRuleByStyleSheetIndexAndCssRuleIndex(styleSheetIndex, cssRuleIndex);
  createCssRuleByStyleSheetIndexAndCssRuleIndex(
    styleSheetIndex,
    cssRuleIndex,
    newCssRuleCssText
  );
};

const deleteCssRuleByStyleSheetIndexAndCssRuleIndex = (
  styleSheetIndex,
  cssRuleIndex
) => {
  console.log(
    "deleteCssRuleByStyleSheetIndexAndCssRuleIndex",
    styleSheetIndex,
    cssRuleIndex
  );
  styleSheets[styleSheetIndex].deleteRule(cssRuleIndex);
};

const updateCssRuleByStyleSheetIndexAndCssRuleIndex = (
  styleSheetIndex,
  cssRuleIndex,
  cssRuleObject
) => {
  console.log(
    "updateCssRuleByStyleSheetIndexAndCssRuleIndex",
    styleSheetIndex,
    cssRuleIndex
  );
  const newProperty = `${cssRuleObject.property}: ${cssRuleObject.value}${cssRuleObject.unit || ""}`;
  console.log("newProperty", newProperty);
  const updatedCssRuleText =
    styleSheets[styleSheetIndex].cssRules[cssRuleIndex].cssText;
  const updatedPropertyStartIndex = updatedCssRuleText.indexOf(
    cssRuleObject.property
  );
  const updatedPropertyEndIndex = updatedCssRuleText.indexOf(
    ";",
    updatedPropertyStartIndex
  );
  const newCssRuleCssText =
    updatedCssRuleText.slice(0, updatedPropertyStartIndex) +
    newProperty +
    updatedCssRuleText.slice(updatedPropertyEndIndex);
  deleteCssRuleByStyleSheetIndexAndCssRuleIndex(styleSheetIndex, cssRuleIndex);
  createCssRuleByStyleSheetIndexAndCssRuleIndex(
    styleSheetIndex,
    cssRuleIndex,
    newCssRuleCssText
  );
};

const createNewStyleSheetWithNewRule = (cssRuleObject) => {
  console.log("createNewStyleSheetWithNewRule", cssRuleObject);
  const newStyleSheet = document.createElement("style");
  newStyleSheet.textContent = `${cssRuleObject.selector} { ${cssRuleObject.property}: ${cssRuleObject.value}${cssRuleObject.unit || ""}}`;
  console.log("Надо вставить таблицу");
  console.log(document);
  document.head.appendChild(newStyleSheet);
};

export const changeCssRule = (cssRuleObject) => {
  console.log("changeCssRule", styleSheets, cssRuleObject);
  const indexes = findStyleSheetIndexAndCssRuleIndexByCssSelector(
    cssRuleObject.selector
  );
  console.log("indexes", indexes);
  if (cssRuleObject.declarations) {
    // TODO!! Вынести в функцию
    cssRuleObject.declarations.forEach((declaration) => {
      const cssRuleIndex = findCssRuleIndexByCssProperty(
        styleSheetIndex,
        declaration.property
      );
      console.log("cssRuleIndex", cssRuleIndex);
    });
  } else {
    if (indexes) {
      const existedProperty = checkPropertyByStyleSheetIndexAndCssRuleIndex(
        indexes.styleSheetIndex,
        indexes.cssRuleIndex,
        cssRuleObject.property
      );
      console.log("existedProperty", existedProperty);
      if (existedProperty) {
        updateCssRuleByStyleSheetIndexAndCssRuleIndex(
          indexes.styleSheetIndex,
          indexes.cssRuleIndex,
          cssRuleObject
        );
      } else {
        createCssPropertyInExistedCssRuleByStyleSheetIndexAndCssRuleIndex(
          indexes.styleSheetIndex,
          indexes.cssRuleIndex,
          cssRuleObject
        );
      }
    } else {
      createNewStyleSheetWithNewRule(cssRuleObject);
    }
  }
};
