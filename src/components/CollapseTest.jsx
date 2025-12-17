import { useState } from "react";
import CollapseCustom from "./CollapseCustom/CollapseCustom";
import CollapseCustomEnhanced from "./CollapseCustomEnhanced/CollapseCustomEnhanced";
import CollapseCustomEnhancedInFlex from "./CollapseCustomEnhancedInFlex/CollapseCustomEnhancedInFlex";

export default function CollapseTest() {
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);
  const [contentInCollapse6, setContentInCollapse6] = useState(false);
  const [isOpenCollapse7, setIsOpenCollapse7] = useState(false);
  const [collapse8Content, setCollapse8Content] = useState("content1");
  const [isOpenCollapse9, setIsOpenCollapse9] = useState(true);

  return (
    <div className="flex-column">
      <div>Flex-column child 1</div>
      <div>Flex-column child 2</div>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapse3"
      >
        Bootstrap Collapse third item
      </button>
      <div className="collapse" id="collapse3">
        <div>Flex-column child 3</div>
      </div>
      <div>Flex-column child 4</div>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => {
          setIsOpenCollapse(!isOpenCollapse);
        }}
      >
        CollapseCustom fifth item
      </button>
      <CollapseCustom isOpen={isOpenCollapse}>
        <div>Flex-column child 5</div>
      </CollapseCustom>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => {
          setContentInCollapse6(!contentInCollapse6);
        }}
      >
        CollapseCustomEnhanced sixth item
      </button>
      <CollapseCustomEnhanced isOpen="true">
        {contentInCollapse6 && <div>Not existed content</div>}
      </CollapseCustomEnhanced>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => {
          setIsOpenCollapse7(!isOpenCollapse7);
        }}
      >
        CollapseCustomEnhanced seventh item
      </button>
      <CollapseCustomEnhanced isOpen={isOpenCollapse7}>
        <div>Existed content</div>
      </CollapseCustomEnhanced>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => {
          if (collapse8Content === "content1") {
            setCollapse8Content("content2");
          }
          if (collapse8Content === "content2") {
            setCollapse8Content("content1");
          }
        }}
      >
        CollapseCustomEnhanced eightth item
      </button>
      <CollapseCustomEnhanced isOpen="true">
        {collapse8Content === "content1" && <div>Content 1</div>}
        {collapse8Content === "content2" && (
          <>
            <div>Content 2 line 1</div>
            <div>Content 2 line 2</div>
          </>
        )}
      </CollapseCustomEnhanced>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => {
          setIsOpenCollapse9(!isOpenCollapse9);
        }}
      >
        CollapseCustomEnhanced ninth item
      </button>
      <CollapseCustomEnhancedInFlex isOpen={isOpenCollapse9}>
        <div className="background-color-green">Flex-column child 9</div>
      </CollapseCustomEnhancedInFlex>
      <div>Flex-column child 10</div>
    </div>
  );
}
