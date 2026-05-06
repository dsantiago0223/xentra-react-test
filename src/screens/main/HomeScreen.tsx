import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import { Text, IconButton, Switch, Surface } from 'react-native-paper';
import LayoutSafeAreaView from '../../components/layout/LayoutSafeAreaView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { AuthContext } from '../../context/AuthContext';
import useUserAccountInfo from '../../hooks/useUserAccountInfo';
import useUserAccountBalance from '../../hooks/useUserAccountBalance';
import { Colors, Fonts } from '../../constants/Constants';
import UIUserAvatar from '../../components/ui/UIUserAvatar';
import { formatCurrency } from '../../utils/Utils';
import UIButton from '../../components/ui/UIButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { shadow } from '../../utils/Utils';
import LayoutPressable from '../../components/layout/LayoutPressable';
import HomeTransactionListItem from './HomeTransactionListItem';
import LayoutListSeparator from '../../components/layout/LayoutListSeparator';
import { useAlert } from '../../context/AlertContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useAppForeground from '../../hooks/useAppForeground';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const transactionArray = [
  {
    id: '1',
    title: 'Transfer from Jay',
    description: 'Today, 18:30 - Received',
    amount: '+$150.00',
    icon: 'arrow-left',
  },
  {
    id: '2',
    title: 'Cocoa Coffee House',
    description: 'Today, 18:30 - Received',
    amount: '-$8.95',
    icon: 'currency-usd',
  },
  {
    id: '3',
    title: 'BPL Electricity Bill',
    description: 'Today, 18:30 - Received',
    amount: '-$8.95',
    icon: 'currency-usd',
  },
  {
    id: '4',
    title: 'Cocoa Coffee House',
    description: 'Today, 18:30 - Received',
    amount: '-$5.50',
    icon: 'currency-usd',
  },
  {
    id: '5',
    title: 'Transfer from Jay',
    description: 'Today, 18:30 - Received',
    amount: '+$6.70',
    icon: 'arrow-left',
  },
];

const HomeScreen = ({ navigation }: Props) => {
  const { authedUser, logoutUser } = useContext(AuthContext);
  const { accountInfo } = useUserAccountInfo();
  const { accountBalance } = useUserAccountBalance();
  const { showAlert } = useAlert();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const imageUrl = 'https://i.pravatar.cc/150';
  const safeAreaInsets = useSafeAreaInsets();

  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  useAppForeground(() => {
    console.log('app resume from background');
  });

  return (
    <LayoutSafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <UIUserAvatar imageUrl={imageUrl} size={50} onPress={logout} />
        <View style={styles.headerUserNameContainer}>
          <Text
            variant="bodyMedium"
            style={styles.headerUserNameTextLine1}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Hello,
          </Text>
          <Text
            variant="bodyLarge"
            style={styles.headerUserNameTextLine2}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {accountInfo?.firstName ?? authedUser?.account.firstName ?? 'User'}
          </Text>
        </View>
        <View>
          <Switch
            style={Platform.select({
              ios: { transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] },
              android: { transform: [{ scaleX: 1 }, { scaleY: 1 }] },
            })}
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
          />
        </View>
        <IconButton
          icon={notificationIcon}
          iconColor={Colors.greenDark}
          size={24}
          onPress={() => {
            console.log('notification tapped');
          }}
          accessibilityLabel={balanceVisible ? 'Hide balance' : 'Show balance'}
        />
      </View>
      {/* Content Views */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainerStyle}
      >
        <View style={styles.scrollViewContent}>
          <ImageBackground
            style={styles.cardImageBackground}
            imageStyle={styles.cardImageStyle}
            resizeMode="cover"
            source={require('../../../assets/images/home_card_background.png')}
          >
            <View style={styles.cardBalanceContainer}>
              <Text variant="bodyMedium" style={styles.cardBalanceLabel}>
                available balance
              </Text>
              <View style={styles.cardAvailableBalanceContainer}>
                <Text
                  variant="headlineMedium"
                  style={styles.cardAvailableBalance}
                >
                  {balanceVisible
                    ? accountBalance !== ''
                      ? formatCurrency(Number(accountBalance))
                      : '$---,---'
                    : '****.**'}
                </Text>
                <IconButton
                  style={styles.cardAvailableBalanceIcon}
                  icon={balanceVisible ? 'eye' : 'eye-off'}
                  iconColor={Colors.white}
                  size={24}
                  onPress={toggleBalanceVisibility}
                  accessibilityLabel={
                    balanceVisible ? 'Hide balance' : 'Show balance'
                  }
                />
              </View>
            </View>
            <View style={styles.cardButtonsContainer}>
              <UIButton
                style={styles.cardLoadButton}
                labelStyle={styles.cardLoadButtonLabel}
                title="Load"
                variant="primary"
                onPress={logout}
                icon={arrowDownIcon}
                iconPositionRight
              />
              <View style={styles.cardButtonSpace} />
              <UIButton
                style={styles.cardTransferButton}
                title="Transfer"
                variant="secondary"
                onPress={()=> {
                  navigation.navigate('TestUIComponents')
                }}
                icon={arrowUpIcon}
                iconPositionRight
              />
            </View>
          </ImageBackground>
          <View style={styles.squareImageButtonContainer}>
            <LayoutPressable
              onPress={() => {
                console.log('mobile topup tapped');
              }}
            >
              <Surface elevation={1} style={styles.squareImageButtonSurface}>
                <Image
                  source={require('../../../assets/images/home_button_mobile_topup.png')}
                  style={styles.squareImageButton}
                  resizeMode="contain"
                />
              </Surface>
              <Text
                variant="bodyMedium"
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.squareImageButtonText}
              >
                Mobile{'\n'}Topup
              </Text>
            </LayoutPressable>
            <LayoutPressable
              onPress={() => {
                console.log('send money tapped');
              }}
            >
              <Surface elevation={1} style={styles.squareImageButtonSurface}>
                <Image
                  source={require('../../../assets/images/home_button_send_money.png')}
                  style={styles.squareImageButton}
                  resizeMode="contain"
                />
              </Surface>
              <Text
                variant="bodyMedium"
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.squareImageButtonText}
              >
                Send{'\n'}Money
              </Text>
            </LayoutPressable>
            <LayoutPressable
              onPress={() => {
                console.log('pay bills tapped');
              }}
            >
              <Surface elevation={1} style={styles.squareImageButtonSurface}>
                <Image
                  source={require('../../../assets/images/home_button_pay_bills.png')}
                  style={styles.squareImageButton}
                  resizeMode="contain"
                />
              </Surface>
              <Text
                variant="bodyMedium"
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.squareImageButtonText}
              >
                Pay Bills
              </Text>
            </LayoutPressable>
            <LayoutPressable
              onPress={() => {
                console.log('gift card tapped');
              }}
            >
              <Surface elevation={1} style={styles.squareImageButtonSurface}>
                <Image
                  source={require('../../../assets/images/home_button_gift_card.png')}
                  style={styles.squareImageButton}
                  resizeMode="contain"
                />
              </Surface>
              <Text
                variant="bodyMedium"
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.squareImageButtonText}
              >
                Gift Card
              </Text>
            </LayoutPressable>
          </View>
          <View style={[styles.transactionsContainer, shadow(1)]}>
            <View style={styles.transactionsTitleContainer}>
              <Text variant="bodyLarge" style={styles.transactionsTitle}>
                Transactions
              </Text>
              <LayoutPressable
                onPress={() => {
                  console.log('view all tapped');
                }}
              >
                <Text variant="bodyLarge" style={styles.transactionsViewAll}>
                  View All
                </Text>
              </LayoutPressable>
            </View>
            <FlatList
              style={styles.transactionsList}
              scrollEnabled={false}
              data={transactionArray}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <HomeTransactionListItem
                  title={item.title}
                  description={item.description}
                  amount={item.amount}
                  leftIcon={item.icon}
                  onPress={() => {
                    console.log('list item tapped');
                  }}
                />
              )}
              ItemSeparatorComponent={
                <LayoutListSeparator color={Colors.grayLight} />
              }
            />
          </View>
          <View style={[styles.referralContainer, shadow(1)]}>
            <Text
              variant="titleMedium"
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.referralTitle}
            >
              Receive $1 by referring a friend{' '}
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* Floating Views */}
      <View
        style={[
          styles.floatingViewContainer,
          { bottom: safeAreaInsets.bottom + 32 },
        ]}
      >
        <View style={[styles.floatingViewContent, shadow(1)]}>
          <LayoutPressable
            style={styles.floatingImageButtonLogoContainer}
            onPress={() => {
              console.log('floating logo tapped');
            }}
          >
            <Image
              source={require('../../../assets/images/logo2.png')}
              style={styles.floatingImageButtonLogo}
              resizeMode="contain"
            />
          </LayoutPressable>
          <LayoutPressable
            onPress={() => {
              console.log('card tapped');
            }}
          >
            <Image
              source={require('../../../assets/images/home_button_card.png')}
              style={styles.floatingImageButtonCard}
              resizeMode="contain"
            />
          </LayoutPressable>
        </View>
        <View style={[styles.floatingViewQRContent, shadow()]}>
          <LayoutPressable
            onPress={() => {
              console.log('qr code tapped');
            }}
          >
            <Image
              source={require('../../../assets/images/home_button_qr_code.png')}
              style={styles.floatingImageButtonQR}
              resizeMode="contain"
            />
          </LayoutPressable>
        </View>
      </View>
    </LayoutSafeAreaView>
  );

  function logout() {
    showAlert({
      title: 'Logout?',
      message: 'Are you sure you want to logout?',
      onOk: logoutUser,
    });
  }
};

export default HomeScreen;

function arrowDownIcon() {
  return (
    <MaterialCommunityIcons
      name="arrow-collapse-down"
      size={24}
      color={Colors.yellowDark}
    />
  );
}

function arrowUpIcon() {
  return (
    <MaterialCommunityIcons
      name="arrow-up"
      size={24}
      color={Colors.greenDark}
    />
  );
}

function notificationIcon() {
  return <Ionicons name="notifications" size={28} color={Colors.greenDark} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.nearWhite,
  },
  headerContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLightest,
  },
  headerUserNameContainer: {
    flex: 1,
  },
  headerUserNameTextLine1: {
    paddingHorizontal: 8,
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
  headerUserNameTextLine2: {
    paddingHorizontal: 8,
    fontFamily: Fonts.bold,
    color: Colors.black,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  scrollViewContentContainerStyle: {
    paddingBottom: 140,
  },
  scrollViewContent: {
    padding: 16,
  },
  cardImageBackground: {
    width: '100%',
    height: 200,
    borderRadius: 24,
    overflow: 'hidden',
  },
  cardImageStyle: {
    borderRadius: 24,
  },
  cardBalanceContainer: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  cardBalanceLabel: {
    fontFamily: Fonts.medium,
    color: Colors.white,
  },
  cardAvailableBalanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardAvailableBalance: {
    fontFamily: Fonts.bold,
    color: Colors.white,
    flex: 1,
  },
  cardAvailableBalanceIcon: {
    marginRight: 0,
  },
  cardButtonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 24,
    paddingHorizontal: 24,
  },
  cardLoadButton: {
    width: '48%',
  },
  cardLoadButtonLabel: {
    color: Colors.yellowDark,
  },
  cardButtonSpace: {
    width: '4%',
  },
  cardTransferButton: {
    width: '48%',
  },
  floatingViewContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 100,
    zIndex: 2,
  },
  floatingViewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    width: '85%',
    height: 80,
    backgroundColor: Colors.white,
    borderRadius: 40,
    zIndex: 1,
  },
  floatingViewQRContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: Colors.white,
    bottom: 8,
    zIndex: 2,
  },
  floatingImageButtonLogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 100 / 2,
    padding: 8,
  },
  floatingImageButtonLogo: {
    width: 40,
    height: 40,
  },
  floatingImageButtonQR: {
    width: 40,
    height: 40,
  },
  floatingImageButtonCard: {
    width: 45,
    height: 45,
  },
  squareImageButtonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-evenly',
  },
  squareImageButton: {
    width: 40,
    height: 40,
  },
  squareImageButtonSurface: {
    borderRadius: 12,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  squareImageButtonText: {
    marginTop: 8,
    textAlign: 'center',
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
  transactionsContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 24,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  transactionsTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '100%',
    paddingTop: 20,
  },
  transactionsTitle: {
    color: Colors.greenDark,
    fontFamily: Fonts.bold,
  },
  transactionsViewAll: {
    color: Colors.greenDark,
    fontFamily: Fonts.regular,
  },
  transactionsList: {
    marginTop: 16,
    marginBottom: 16,
  },
  referralContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 16,
  },
  referralTitle: {
    color: Colors.greenDark,
    fontFamily: Fonts.bold,
    textAlign: 'center',
  },
});
