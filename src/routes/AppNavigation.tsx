import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ReactQueryMain } from '../screens/ReactQuery/Main';
import { DefaultMain } from '../screens/Default/Main';
import { SpartalkMain } from '../screens/Spartalk/Main';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="Default"
          component={ReactQueryMain}
          options={{
            tabBarIcon: props => (
              <MaterialCommunityIcons name="layers" {...props} />
            ),
          }}
        />
        <Screen
          name="ReactQuery"
          component={DefaultMain}
          options={{
            tabBarIcon: props => (
              <MaterialCommunityIcons name="react" {...props} />
            ),
          }}
        />
        <Screen
          name="Spartalk"
          component={SpartalkMain}
          options={{
            tabBarIcon: props => (
              <MaterialCommunityIcons name="football-helmet" {...props} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
