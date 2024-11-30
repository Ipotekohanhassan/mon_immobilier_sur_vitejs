import mobileMenuItems from "../../../data/mobileMenuItems";
import { isParentActive } from "../../../utilis/isMenuActive";
import {useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";


const ProSidebarContent = () => {
  const { pathname } = useLocation()



  return (
    <Sidebar width="100%" backgroundColor="#fff" className="my-custom-class">
      <Menu>
        {mobileMenuItems.map((item, index) => (
          <SubMenu
            key={index}
            className={isParentActive(item.subMenu, pathname) ? "active" : ""}
            label={item.label}
          >
            {item.subMenu.map((subItem, subIndex) =>
              subItem.subMenu ? (
                <SubMenu
                  key={subIndex}
                  label={subItem.label}
                  className={
                    isParentActive(subItem.subMenu, pathname) ? "active" : ""
                  }
                >
                  {subItem.subMenu.map((nestedItem, nestedIndex) => (
                    <MenuItem
                      key={nestedIndex}
                      component={
                        <Link
                          className={nestedItem.path == pathname ? "active" : ""}
                          to={nestedItem.path}
                        />
                      }
                    >
                      {nestedItem.label}
                    </MenuItem>
                  ))}
                </SubMenu>
              ) : (
                <MenuItem
                  key={subIndex}
                  component={
                    <Link
                      className={subItem.path == pathname ? "active" : ""}
                      to={subItem.path}
                    />
                  }
                >
                  {subItem.label}
                </MenuItem>
              )
            )}
          </SubMenu>
        ))}
      </Menu>
    </Sidebar>
  );
};

export default ProSidebarContent;
