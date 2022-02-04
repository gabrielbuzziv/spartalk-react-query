import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ReactQueryMain } from '../screens/ReactQuery/Main';
import { Challenge } from '../screens/Challenge/Main';
import { DefaultMain } from '../screens/Default/Main';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="Default"
          component={DefaultMain}
          options={{
            tabBarIcon: props => (
              <MaterialCommunityIcons name="layers" {...props} />
            ),
          }}
        />
        <Screen
          name="ReactQuery"
          component={ReactQueryMain}
          options={{
            tabBarIcon: props => (
              <MaterialCommunityIcons name="react" {...props} />
            ),
          }}
        />
        <Screen
          name="Challenge"
          component={Challenge}
          options={{
            tabBarIcon: props => (
              <MaterialCommunityIcons name="star" {...props} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
