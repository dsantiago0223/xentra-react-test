import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, StyleSheet } from 'react-native';
import LayoutSafeAreaView from '../layout/LayoutSafeAreaView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { Colors } from '../../constants';
import LayoutNavigationHeader from '../layout/LayoutNavigationHeader';
import UIButton from '../ui/UIButton';
import UITextInput from '../ui/UITextInput';
import { TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAlert } from '../../context/AlertContext';
import { delay } from '../../utils/utils';

type Props = NativeStackScreenProps<RootStackParamList, 'TestUIComponents'>;

const ArrowUpIcon = () => (
  <MaterialCommunityIcons name="arrow-up" size={24} color={Colors.greenDark} />
);

export default function TestUIComponents({ navigation }: Props) {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const { showAlert } = useAlert();

  return (
    <LayoutSafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={300}
        keyboardShouldPersistTaps="handled"
      >
        <LayoutNavigationHeader
          titleText="Header Title"
          onLeftPressed={() => navigation.goBack()}
          leftIsImage
          containerStyle={{ marginBottom: 16 }}
          titleStyle={{ color: Colors.black }}
        />
        <LayoutNavigationHeader
          titleText="Header Title"
          onLeftPressed={() => navigation.goBack()}
          onRightPressed={() => navigation.goBack()}
          leftIsImage
          rightIsImage
          containerStyle={{ marginBottom: 16 }}
          titleStyle={{ color: Colors.greenDark }}
        />

        <LayoutNavigationHeader
          titleText="Header Title"
          onLeftPressed={() => navigation.goBack()}
          onRightPressed={() => navigation.goBack()}
          titleLogo
          leftIsImage
          rightIsImage
          containerStyle={{ marginBottom: 16 }}
          titleStyle={{ color: Colors.grayDark }}
        />

        <LayoutNavigationHeader
          titleText="Header Title"
          titleLogo
          onLeftPressed={() => navigation.goBack()}
          onRightPressed={() => navigation.goBack()}
          leftText="Back"
          rightText="Close"
          containerStyle={{ marginBottom: 16 }}
          titleStyle={{ color: Colors.grayDark }}
        />

        <View style={{ paddingHorizontal: 16 }}>
          <UIButton
            style={{ marginTop: 8 }}
            title="Primary 1"
            variant="primary"
            onPress={navigation.goBack}
          />
          <UIButton
            style={{ marginTop: 8 }}
            title="Secondary"
            variant="secondary"
            onPress={navigation.goBack}
            icon={ArrowUpIcon}
            iconPositionRight
          />
          <UIButton
            style={{ marginTop: 8 }}
            title="Tertiary"
            variant="tertiary"
            onPress={navigation.goBack}
          />

          <UIButton
            style={{ marginTop: 8, marginBottom: 16 }}
            title="Outlined"
            variant="outlined"
            onPress={navigation.goBack}
          />

          <UIButton
            style={{ marginTop: 8 }}
            title="Primary 1 Disabled"
            variant="primary"
            onPress={navigation.goBack}
            disabled
          />
          <UIButton
            style={{ marginTop: 8 }}
            title="Secondary Disabled"
            variant="secondary"
            onPress={navigation.goBack}
            icon={ArrowUpIcon}
            iconPositionRight
            disabled
          />
          <UIButton
            style={{ marginTop: 8 }}
            title="Tertiary Disabled"
            variant="tertiary"
            onPress={navigation.goBack}
            disabled
          />

          <UIButton
            style={{ marginTop: 8, marginBottom: 16 }}
            title="Outlined Disabled"
            variant="outlined"
            onPress={navigation.goBack}
            disabled
          />

          <UITextInput
            titleText="Label"
            placeholder="Placeholder Text"
            keyboardType="default"
            autoCapitalize="none"
            variant={'default'}
            errorText={'test error'}
            right={<TextInput.Icon icon="phone" color={Colors.greenDark} />}
            value={inputValue1}
            onChangeText={setInputValue1}
            clearable
          />

          <UITextInput
            titleText="Label"
            placeholder="Placeholder Text"
            keyboardType="default"
            autoCapitalize="none"
            variant={'default'}
            errorText={'test error'}
            value={inputValue2}
            onChangeText={setInputValue2}
            clearable
          />

          <UITextInput
            titleText="Label"
            placeholder="Placeholder Text"
            secureTextEntry
            variant={'default'}
            autoCapitalize="none"
            errorText={'test error'}
            value={inputValue3}
            onChangeText={setInputValue3}
          />

          <UIButton
            style={{ marginTop: 8 }}
            title="Alert Cancel OK"
            variant="primary"
            onPress={() => {
              showAlert({
                title: 'Logout?',
                message: 'Are you sure you want to logout?',
                onOk: () => {},
              });
            }}
          />
          <UIButton
            style={{ marginTop: 8 }}
            title="Alert OK"
            variant="primary"
            onPress={() => {
              showAlert({
                title: 'Success',
                message: 'Profile updated!',
                showCancel: false,
                onOk: () => {},
              });
            }}
          />
          <UIButton
            style={{ marginTop: 8 }}
            title="Custom"
            variant="primary"
            onPress={() => {
              showAlert({
                title: 'Delete item',
                message: 'This action cannot be undone.',
                okText: 'Delete',
                cancelText: 'Cancel',
                onOk: async () => {
                  await delay(3000);
                },
              });
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </LayoutSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
