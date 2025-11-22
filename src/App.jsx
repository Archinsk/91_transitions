import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CheckBlock from "./components/CheckBlock";
import CardCustom from "./components/CardCustom/CardCustom";
import CollapseCustom from "./components/CollapseCustom/CollapseCustom";

function App() {
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);

  return (
    <div className="display-flex">
      <div className="flex-column" style={{ width: "20rem" }}>
        {[0, 1, 2, 3, 4].map((item, cardIndex) => {
          return (
            <CardCustom>
              Card {cardIndex + 1}
              <div className="flex-column">
                {[0, 1, 2, 3, 4].map((sidebarItem, itemIndex) => {
                  return (
                    <div>
                      Sidebar-item {cardIndex + 1}-{itemIndex + 1}
                    </div>
                  );
                })}
              </div>
            </CardCustom>
          );
        })}
      </div>
      <div className="flex-column">
        <div>Header</div>
        <div>
          <div className="flex-column">
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse3"
            >
              Collapse third item
            </button>
            <div>Flex-column child 1</div>
            <div>Flex-column child 2</div>
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
              Collapse fifth item
            </button>
            <CollapseCustom isOpen={isOpenCollapse}>
              <div>Flex-column child 5</div>
            </CollapseCustom>
          </div>
        </div>
        {/* <CheckBlock /> */}
      </div>
      <div>Right Sidebar</div>
    </div>
  );
}

export default App;
