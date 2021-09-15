import React, { useState } from 'react';

function TabNav(props){
  const [visibleTab, setVisibleTab] = useState(props.tabs[0].id)

  const listTitles = props.tabs.map((item) => 
    <li 
      onClick={() => {
        !item.inactive && setVisibleTab(item.id)
      }} 
      className={
        item.inactive ? "tab-navigation__tab tab-navigation__tab--inactive" :
        visibleTab === item.id ? "tab-navigation__tab tab-navigation__tab--active" : "tab-navigation__tab"
      }
    >{item.tabTitle}</li>
  );
                                   
  const listContent = props.tabs.map((item) => 
      <div style={visibleTab === item.id ? {} : {display: 'none'}}>{item.tabContent}</div>
  );
  
  return (
    <div className="tab-navigation">
      <ul className="tab-navigation__tabs">
        {listTitles}
      </ul>
      <div className="tab-content">
          {listContent}
      </div>
    </div>
  );
}

export default TabNav;
