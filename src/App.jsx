import { useState } from "react";
import "./App.css";
import CheckBlock from "./components/CheckBlock";
import CardCustom from "./components/CardCustom/CardCustom";
import CollapseTest from "./components/CollapseTest";
import CssOperationsTest from "./components/CssOperationsTest";

function App() {
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
          <CssOperationsTest />
        </div>
        {/* <CheckBlock /> */}
        {/* <CollapseTest /> */}
      </div>
      <div>Right Sidebar</div>
    </div>
  );
}

export default App;
