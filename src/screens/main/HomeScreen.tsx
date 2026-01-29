import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, Image, ImageBackground, FlatList } from 'react-native';
import { Text, IconButton, Switch, Surface } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { AuthContext } from '../../context/AuthContext';
import useGetUser from '../../hooks/useGetUser';
import { Colors, Fonts } from '../../constants/Constants';
import AppUserAvatar from '../../components/AppUserAvatar';
import { formatBalance } from '../../utils/Utils';
import AppButton from '../../components/AppButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { shadow } from '../../utils/Utils';
import AppPressable from '../../components/AppPressable';
import HomeTransactionListItem from './HomeTransactionListItem';
import AppListSeparator from '../../components/AppListSeparator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const transactionArray = [
  { id: '1', title: 'Transfer from Jay', description: 'Today, 18:30 - Received', amount: '+$150.00', icon: 'arrow-left' },
  { id: '2', title: 'Cocoa Coffee House', description: 'Today, 18:30 - Received', amount: '-$8.95', icon: 'currency-usd' },
  { id: '3', title: 'BPL Electricity Bill', description: 'Today, 18:30 - Received', amount: '-$8.95', icon: 'currency-usd' },
  { id: '4', title: 'Cocoa Coffee House', description: 'Today, 18:30 - Received', amount: '-$5.50', icon: 'currency-usd' },
  { id: '5', title: 'Transfer from Jay', description: 'Today, 18:30 - Received', amount: '+$6.70', icon: 'arrow-left' }
];

const HomeScreen = ({ navigation }: Props) => {

  const { logoutUser } = useContext(AuthContext);
  const { user } = useGetUser();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const balance = 12107.20
  const imageUrl = 'https://i.pravatar.cc/150';
  
  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <AppUserAvatar imageUrl={imageUrl} size={50} onPress={logout} />
        <View style={styles.headerUserNameContainer}>
          <Text 
          variant='bodyMedium' 
          style={styles.headerUserNameTextLine1} 
          numberOfLines={1} 
          ellipsizeMode='tail'>
            Hello,
          </Text>
          <Text 
          variant='bodyLarge' 
          style={styles.headerUserNameTextLine2} 
          numberOfLines={1} 
          ellipsizeMode='tail'>
            {user?.first_name !== '' ? user?.first_name : 'User' }
          </Text>
        </View>
        <View>
          <Switch
          style={
            Platform.select({
              ios: {transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }]},
              android: {transform: [{ scaleX: 1 }, { scaleY: 1 }]}
            })
          }
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          />
        </View>
        <IconButton
        icon={notificationIcon}
        iconColor={Colors.greenDark}
        size={24}
        onPress={toggleBalanceVisibility}
        accessibilityLabel={balanceVisible ? 'Hide balance' : 'Show balance'}
        />
      </View>
      {/* Content Views */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContentContainerStyle}>
        <View style={styles.scrollViewContent}>
          <ImageBackground
          style={styles.cardImageBackground}
          imageStyle={styles.cardImageStyle}
          resizeMode='cover'
          source={require('../../../assets/images/home_card_background.png')}>
              <View style={styles.cardBalanceContainer}>
                <Text variant='bodyMedium' style={styles.cardBalanceLabel}>available balance</Text>
                <View style={styles.cardAvailableBalanceContainer}>
                  <Text variant='headlineMedium' style={styles.cardAvailableBalance}>
                    {balanceVisible ? formatBalance(balance) : '****.**'}
                  </Text>
                  <IconButton
                  style={styles.cardAvailableBalanceIcon}
                  icon={balanceVisible ? 'eye' : 'eye-off'}
                  iconColor={Colors.white}
                  size={24}
                  onPress={toggleBalanceVisibility}
                  accessibilityLabel={balanceVisible ? 'Hide balance' : 'Show balance'}
                  />
                </View>
              </View>
              <View style={styles.cardButtonsContainer}>
                <AppButton 
                style={styles.cardLoadButton} 
                title='Load' 
                variant='primary-2' 
                onPress={toggleBalanceVisibility} 
                icon={arrowDownIcon} 
                iconPositionRight 
                />
                <View style={styles.cardButtonSpace}/>
                <AppButton 
                style={styles.cardTransferButton} 
                title='Transfer' 
                variant='secondary' 
                onPress={toggleBalanceVisibility} 
                icon={arrowUpIcon}
                iconPositionRight 
                />
              </View>
            </ImageBackground>
            <View style={styles.squareImageButtonContainer}>
              <AppPressable onPress={toggleBalanceVisibility}>
                <Surface elevation={1} style={styles.squareImageButtonSurface}>
                  <Image
                  source={require('../../../assets/images/home_button_mobile_topup.png')}
                  style={styles.squareImageButton}
                  resizeMode='contain'
                  />
                </Surface>
                <Text variant='bodyMedium' numberOfLines={2} ellipsizeMode='tail' style={styles.squareImageButtonText}>Mobile{'\n'}Topup</Text>
              </AppPressable>
              <AppPressable onPress={toggleBalanceVisibility}>
                <Surface elevation={1} style={styles.squareImageButtonSurface}>
                  <Image
                  source={require('../../../assets/images/home_button_send_money.png')}
                  style={styles.squareImageButton}
                  resizeMode='contain'
                  />
                </Surface>
                <Text variant='bodyMedium' numberOfLines={2} ellipsizeMode='tail' style={styles.squareImageButtonText}>Send{'\n'}Money</Text>
              </AppPressable>
              <AppPressable onPress={toggleBalanceVisibility}>
                <Surface elevation={1} style={styles.squareImageButtonSurface}>
                  <Image
                  source={require('../../../assets/images/home_button_pay_bills.png')}
                  style={styles.squareImageButton}
                  resizeMode='contain'
                  />
                </Surface>
                <Text variant='bodyMedium' numberOfLines={2} ellipsizeMode='tail' style={styles.squareImageButtonText}>Pay Bills</Text>
              </AppPressable>
              <AppPressable onPress={toggleBalanceVisibility}>
                <Surface elevation={1} style={styles.squareImageButtonSurface}>
                  <Image
                  source={require('../../../assets/images/home_button_gift_card.png')}
                  style={styles.squareImageButton}
                  resizeMode='contain'
                  />
                </Surface>
                <Text variant='bodyMedium' numberOfLines={2} ellipsizeMode='tail' style={styles.squareImageButtonText}>Gift Card</Text>
              </AppPressable>
            </View>
            <View style={[styles.transactionsContainer, shadow(1)]}>
              <View style={styles.transactionsTitleContainer}>
                <Text variant='bodyLarge' style={styles.transactionsTitle}>Transactions</Text>
                <AppPressable onPress={toggleBalanceVisibility}>
                  <Text variant='bodyLarge' style={styles.transactionsViewAll}>View All</Text>
                </AppPressable>
              </View>
              <FlatList
              style={styles.transactionsList}
              scrollEnabled={false}
              data={transactionArray}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <HomeTransactionListItem
                title={item.title}
                description={item.description}
                amount={item.amount}
                leftIcon={item.icon}
                onPress={toggleBalanceVisibility}
                />
              )}
              ItemSeparatorComponent={<AppListSeparator color={Colors.grayLight} />}
              />
            </View>
            <View style={[styles.referralContainer, shadow(1)]}>
              <Text variant='titleMedium' numberOfLines={2} ellipsizeMode='tail' style={styles.referralTitle}>Receive $1 by referring a friend </Text>
            </View>
        </View>
      </ScrollView>
      {/* Floating Views */}
      <View style={styles.floatingViewContainer}>
        <View style={[styles.floatingViewContent, shadow(1)]}>
          <AppPressable style={styles.floatingImageButtonLogoContainer}onPress={toggleBalanceVisibility}>
            <Image
            source={require('../../../assets/images/logo_yellow.png')}
            style={styles.floatingImageButtonLogo}
            resizeMode='contain'
            />
          </AppPressable>
          <AppPressable onPress={toggleBalanceVisibility}>
            <Image
            source={require('../../../assets/images/home_button_card.png')}
            style={styles.floatingImageButtonCard}
            resizeMode='contain'
            />
          </AppPressable>
        </View>
        <View style={[styles.floatingViewQRContent, shadow()]}>
            <AppPressable onPress={toggleBalanceVisibility}>
              <Image
              source={require('../../../assets/images/home_button_qr_code.png')}
              style={styles.floatingImageButtonQR}
              resizeMode='contain'
              />
          </AppPressable>
        </View>
      </View>
    </View>
  );

  function logout() {
    logoutUser();
  }

}

export default HomeScreen

function arrowDownIcon() { 
  return (
    <MaterialCommunityIcons name="arrow-collapse-down" size={24} color={Colors.yellowDark} />
  );
}

function arrowUpIcon() { 
  return (
    <MaterialCommunityIcons name="arrow-up" size={24} color={Colors.greenDark} />
  );
}

function notificationIcon() { 
  return (
    <Ionicons name="notifications" size={28} color={Colors.greenDark} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.nearWhite
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
    flex: 1
  },
  headerUserNameTextLine1: {
    paddingHorizontal: 8,
    fontFamily: Fonts.regular, 
    color: Colors.black
  },
  headerUserNameTextLine2: {
    paddingHorizontal: 8,
    fontFamily: Fonts.bold,
    color: Colors.black
  },
  scrollView: {
    flex: 1,
    zIndex: 1
  },
  scrollViewContentContainerStyle: {
    paddingBottom: 140
  },
  scrollViewContent: {
    padding: 16
  },
  cardImageBackground: {
    width: '100%',
    height: 200, 
    borderRadius: 24,
    overflow: 'hidden'
  },
  cardImageStyle: {
    borderRadius: 24
  },
  cardBalanceContainer: {
    paddingHorizontal: 24,
    marginTop: 16
  },
  cardBalanceLabel: {
    fontFamily: Fonts.medium,
    color: Colors.white
  },
  cardAvailableBalanceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardAvailableBalance: {
    fontFamily: Fonts.bold,
    color: Colors.white,
    width: '90%'
  },
  cardAvailableBalanceIcon: {
    paddingRight: 16
  },
  cardButtonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 24,
    paddingHorizontal: 24
  },
  cardLoadButton: {
    width: '48%'
  },
  cardButtonSpace: {
    width: '4%'
  },
  cardTransferButton: {
    width: '48%'
  },
  floatingViewContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center', 
    width: '100%',
    height: 100,
    bottom: 32,
    zIndex: 2
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
    zIndex: 1
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
    zIndex: 2
  },
  floatingImageButtonLogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greenDark,
    borderRadius: 100 / 2,
    padding: 8
  },
  floatingImageButtonLogo: {
    width: 40,
    height: 40
  },
  floatingImageButtonQR: {
    width: 40,
    height: 40
  },
  floatingImageButtonCard: {
    width: 45,
    height: 45
  },
  squareImageButtonContainer: {
    flexDirection: 'row', marginTop: 16, justifyContent: 'space-evenly'
  },
  squareImageButton: {
    width: 40,
    height: 40
  },
  squareImageButtonSurface: {
    borderRadius: 12,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  squareImageButtonText: {
    marginTop: 8,
    textAlign: 'center',
    fontFamily: Fonts.regular,
    color: Colors.black
  },
  transactionsContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 24,
    paddingHorizontal: 24,
    marginTop: 16
  },
  transactionsTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '100%',
    paddingTop: 20
  },
  transactionsTitle: {
    color: Colors.greenDark,
    fontFamily: Fonts.bold
  },
  transactionsViewAll: {
    color: Colors.greenDark,
    fontFamily: Fonts.regular
  },
  transactionsList: {
    marginTop: 16, 
    marginBottom: 16
  },
  referralContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 16
  },
  referralTitle: {
    color: Colors.greenDark,
    fontFamily: Fonts.bold,
    textAlign: 'center'
  }
});
