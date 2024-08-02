import React from 'react';

const renderMenu = (items) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <a href={item.path}>{item.title}</a>
          {item.subItems.length > 0 && renderMenu(item.subItems)}
        </li>
      ))}
    </ul>
  );
};

const Sidebar = ({ menuItems }) => {
  return <nav>{renderMenu(menuItems)}</nav>;
};

export default Sidebar;
