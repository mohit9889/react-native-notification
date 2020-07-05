import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={AntDesign}
      iconSize={23}
      color= "black"
    />
  );
};

export default CustomHeaderButton;
