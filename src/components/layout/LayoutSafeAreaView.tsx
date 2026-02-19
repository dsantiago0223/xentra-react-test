import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LayoutSafeAreaViewProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  dismissKeyboardOnTap?: boolean;
}

const LayoutSafeAreaView = ({
  style,
  children,
  dismissKeyboardOnTap = false,
}: LayoutSafeAreaViewProps) => {
  const safeAreaInsets = useSafeAreaInsets();

  if (dismissKeyboardOnTap) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            style,
            {
              paddingTop: safeAreaInsets.top,
              paddingBottom: safeAreaInsets.bottom,
            },
          ]}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <View
        style={[
          style,
          {
            paddingTop: safeAreaInsets.top,
            paddingBottom: safeAreaInsets.bottom,
          },
        ]}
      >
        {children}
      </View>
    );
  }
};

export default LayoutSafeAreaView;
