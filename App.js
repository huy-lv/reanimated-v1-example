import React from "react";
import { FlatList, StyleSheet, Text, View, LogBox } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import ChatHeads from "./src/chatHeads";
import Code from "./src/code";
import Colors from "./src/colors";
import DifferentSpringConfigs from "./src/differentSpringConfigs";
import ImageViewer from "./src/imageViewer";
import Imperative from "./src/imperative";
import InteractablePlayground, {
  SCREENS as INTERACTABLE_SCREENS,
} from "./src/interactablePlayground";
import PanRotateAndZoom from "./src/PanRotateAndZoom";
import ProgressBar from "./src/progressBar";
import Rotations from "./src/rotations";
import Snappable from "./src/snappable";
import Interpolate from "./src/src/interpolate";
import StartAPI from "./src/startAPI";
import Test from "./src/test";
import TransitionsProgress from "./src/transitions/progress";
import TransitionsSequence from "./src/transitions/sequence";
import TransitionsShuffle from "./src/transitions/shuffle";
import TransitionsTicket from "./src/transitions/ticket";
import WidthAndHeight from "./src/widthAndHeight";

LogBox.ignoreLogs([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
]);
// refers to bug in React Navigation which should be fixed soon
// https://github.com/react-navigation/react-navigation/issues/3956

const SCREENS = {
  Snappable: { screen: Snappable, title: "Snappable" },
  Test: { screen: Test, title: "Test" },
  ImageViewer: { screen: ImageViewer, title: "Image Viewer" },
  Interactable: { screen: InteractablePlayground, title: "Interactable" },
  Interpolate: { screen: Interpolate, title: "Interpolate" },
  Colors: { screen: Colors, title: "Colors" },
  StartAPI: { screen: StartAPI, title: "Start API" },
  chatHeads: { screen: ChatHeads, title: "Chat heads (iOS only)" },
  code: { screen: Code, title: "Animated.Code component" },
  width: { screen: WidthAndHeight, title: "width & height & more" },
  rotations: { screen: Rotations, title: "rotations (concat node)" },
  imperative: {
    screen: Imperative,
    title: "imperative (set value / toggle visibility)",
  },
  panRotateAndZoom: {
    screen: PanRotateAndZoom,
    title: "Pan, rotate and zoom (via native event function)",
  },
  progressBar: {
    screen: ProgressBar,
    title: "Progress bar",
  },
  differentSpringConfigs: {
    screen: DifferentSpringConfigs,
    title: "Different Spring Configs",
  },
  transitionsSequence: {
    screen: TransitionsSequence,
    title: "Transitions sequence",
  },
  transitionsShuffle: {
    screen: TransitionsShuffle,
    title: "Transitions shuffle",
  },
  transitionsProgress: {
    screen: TransitionsProgress,
    title: "Transitions progress bar",
  },
  transitionsTicket: {
    screen: TransitionsTicket,
    title: "Transitions – flight ticket demo",
  },
};

class MainScreen extends React.Component {
  static navigationOptions = {
    title: "👵 Reanimated 1.x Examples",
  };

  render() {
    const data = Object.keys(SCREENS).map((key) => ({ key }));
    return (
      <FlatList
        style={styles.list}
        data={data}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={(props) => (
          <MainScreenItem
            {...props}
            onPressItem={({ key }) => this.props.navigation.navigate(key)}
          />
        )}
        renderScrollComponent={(props) => <ScrollView {...props} />}
      />
    );
  }
}

const ItemSeparator = () => <View style={styles.separator} />;

class MainScreenItem extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.item);
  render() {
    const { key } = this.props.item;
    return (
      <RectButton style={styles.button} onPress={this._onPress}>
        <Text style={styles.buttonText}>{SCREENS[key].title || key}</Text>
      </RectButton>
    );
  }
}

const ExampleApp = createStackNavigator(
  {
    Main: { screen: MainScreen },
    ...SCREENS,
    ...INTERACTABLE_SCREENS,
  },
  {
    initialRouteName: "Main",
    headerMode: "screen",
  }
);

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#EFEFF4",
  },
  separator: {
    height: 1,
    backgroundColor: "#DBDBE0",
  },
  buttonText: {
    backgroundColor: "transparent",
  },
  button: {
    flex: 1,
    height: 60,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

const createApp = Platform.select({
  web: (input) => createBrowserApp(input, { history: "hash" }),
  default: (input) => createAppContainer(input),
});

export default createApp(ExampleApp);
