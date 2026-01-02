import React from "react";
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HomeTabsNavigatorParamList } from "../../../navigation/HomeTabsNavigator";
import AppButton from "../../../components/AppButton";

type Props = {
  navigation: BottomTabNavigationProp<HomeTabsNavigatorParamList>;
};

const { width } = Dimensions.get('window');

const banners = [
  { id: '1', image: 'https://picsum.photos/200/300' },
  { id: '2', image: 'https://picsum.photos/200/300' },
  { id: '3', image: 'https://picsum.photos/200/300' },
];

export default function DashboardScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <FlatList
        data={banners}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.banner} />
        )}
        />
      </View>
      <View style={styles.content}>
        <AppButton titleText="Go to Profile" onPressed={() => navigation.navigate("Profile")} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  bannerContainer: {
    marginLeft: 16
  },
  banner: {
    marginTop: 16,
    width,
    height: 200,
    borderRadius: 12,
    marginRight: 16
  }
});
