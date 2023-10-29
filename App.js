import React from 'react';
import RNExitApp from 'react-native-exit-app';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';

import Scannar from './Scannar';
function HomeScreen() {
  return (
    <View style={styles.container}>
        <Text style={{paddingTop: 50, color : "blue"}} >Scanned Object</Text>
        <TouchableOpacity onPress={()=> RNExitApp.exitApp()}>
                    <Text>Quit</Text>
                </TouchableOpacity>
        <Scannar/>

      </View>
  );
}
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
/*const App = () => {
  return (
    <>
      <View>
        <Text style={{color : "red"}} >Open React Native Scannar</Text>
        <Scannar/>
      </View>
    </>
  );
};

export default App;

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

// /* The `backgroundStyle` constant is defining a style object for the background color of the app. It
// uses the `isDarkMode` variable to determine whether the app is in dark mode or not. If `isDarkMode`
// is true, it sets the background color to `Colors.darker`, otherwise it sets it to `Colors.lighter`. */
//   // const backgroundStyle = {
//   //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   // };

//   return (
//     <>

//     </>
//   );
// }

// // const styles = StyleSheet.create({
// //   sectionContainer: {
// //     marginTop: 32,
// //     paddingHorizontal: 24,
// //   },
// //   sectionTitle: {
// //     fontSize: 24,
// //     fontWeight: '600',
// //   },
// //   sectionDescription: {
// //     marginTop: 8,
// //     fontSize: 18,
// //     fontWeight: '400',
// //   },
// //   highlight: {
// //     fontWeight: '700',
// //   },
// // });

// export default App;
