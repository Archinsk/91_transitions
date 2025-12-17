import { useState } from "react";
import { changeCssRule } from "../utils/styleSheetsOperations";

export default function CssOperationsTest() {
  const [fontFamily, setFontFamily] = useState(
    getComputedStyle(document.body).getPropertyValue("font-family")
  );
  const [fontSize, setFontSize] = useState(
    getComputedStyle(document.documentElement).getPropertyValue("font-size")
  );
  console.log("fontFamily", fontFamily);

  const handleChangeFontFamily = (e) => {
    setFontFamily(e.target.value);
    changeCssRule({
      selector: "body",
      property: "font-family",
      value: e.target.value,
    });
  };
  const handleChangeFontSize = (e) => {
    setFontSize(e.target.value);
    changeCssRule({
      selector: "html",
      property: "font-size",
      value: e.target.value,
    });
  };
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="disabledSelect" className="form-label">
          Change body font-family by css rules
        </label>
        <select
          className="form-select"
          value={fontFamily || "unset"}
          onChange={handleChangeFontFamily}
        >
          <option value="unset">Browser font family</option>
          <option value="roboto">Roboto</option>
          <option value="open-sans">Open-sans</option>
          <option value="inter">Inter</option>
          <option value="proxima-nova">Proxima-nova</option>
          <option value="nunito">Nunito</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="disabledSelect" className="form-label">
          Change html font-size by css rules
        </label>
        <select
          className="form-select"
          value={fontSize || "unset"}
          onChange={handleChangeFontSize}
        >
          <option value="unset">Browser font size</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
        </select>
      </div>
    </div>
  );
}
