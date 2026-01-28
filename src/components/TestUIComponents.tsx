import React, { useState} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '..//navigation/RootNavigator';
import { Colors } from '../constants/Constants';
import AppNavigationHeader from '../components/AppNavigationHeader';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'TestUIComponents'>;

const ArrowDownIcon = () => (
    <MaterialCommunityIcons name="arrow-collapse-down" size={24} color={Colors.yellowDark} />
);

const ArrowUpIcon = () => (
    <MaterialCommunityIcons name="arrow-up" size={24} color={Colors.greenDark} />
);

export default function TestUIComponents ({ navigation }: Props) {
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
            enableOnAndroid
            extraScrollHeight={300}
            keyboardShouldPersistTaps="handled">
                <AppNavigationHeader 
                titleText='Header Title'
                onLeftPressed={() => navigation.goBack()} 
                leftIsImage
                containerStyle={{marginBottom: 16}}
                titleStyle={{color: Colors.black}}
                />
                <AppNavigationHeader 
                titleText='Header Title'
                onLeftPressed={() => navigation.goBack()} 
                onRightPressed={() => navigation.goBack()} 
                leftIsImage
                rightIsImage
                containerStyle={{marginBottom: 16}}
                titleStyle={{color: Colors.greenDark}}
                />

                <AppNavigationHeader 
                titleText='Header Title'
                onLeftPressed={() => navigation.goBack()} 
                onRightPressed={() => navigation.goBack()} 
                titleLogo
                leftIsImage
                rightIsImage
                containerStyle={{marginBottom: 16}}
                titleStyle={{color: Colors.grayDark}}
                />

                <AppNavigationHeader 
                titleText='Header Title'
                titleLogo
                onLeftPressed={() => navigation.goBack()} 
                onRightPressed={() => navigation.goBack()} 
                leftText='Back'
                rightText='Close'
                containerStyle={{marginBottom: 16}}
                titleStyle={{color: Colors.grayDark}}
                />

                <View style={{paddingHorizontal: 16}}>
                    <AppButton 
                    style={{marginTop: 8}} 
                    title='Primary 1' 
                    variant='primary-1' 
                    onPress={navigation.goBack} 
                    />
                    <AppButton 
                    style={{marginTop: 8}} 
                    title='Primary 2' 
                    variant='primary-2' 
                    onPress={navigation.goBack} 
                    icon={ArrowDownIcon} 
                    />
                    <AppButton 
                    style={{marginTop: 8}} 
                    title='Secondary' 
                    variant='secondary' 
                    onPress={navigation.goBack} 
                    icon={ArrowUpIcon}
                    iconPositionRight 
                    />
                    <AppButton 
                    style={{marginTop: 8, marginBottom: 16}} 
                    title='Tertiary' 
                    variant='tertiary' 
                    onPress={navigation.goBack} 
                    />

                    <AppTextInput
                    titleText="Label"
                    placeholder='Placeholder Text'
                    keyboardType='default'
                    autoCapitalize='none'
                    variant={'default'}
                    errorText={'test error'}
                    right={<TextInput.Icon icon="phone" color={Colors.greenDark}/>}
                    value={inputValue1}
                    onChangeText={setInputValue1}
                    clearable
                    />

                    <AppTextInput
                    titleText="Label"
                    placeholder='Placeholder Text'
                    keyboardType='default'
                    autoCapitalize='none'
                    variant={'default'}
                    errorText={'test error'}
                    value={inputValue1}
                    onChangeText={setInputValue1}
                    clearable
                    />

                    <AppTextInput
                    titleText="Label"
                    placeholder='Placeholder Text'
                    secureTextEntry
                    variant={'default'}
                    autoCapitalize='none'
                    errorText={'test error'}
                    value={inputValue2}
                    onChangeText={setInputValue2}
                    />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  }
});