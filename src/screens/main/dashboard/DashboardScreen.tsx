import React, {useRef, useState} from "react";
import { View, StyleSheet, FlatList, Image, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.banner} />
        )}
        />
      </View>
      <View style={styles.dotsContainer}>
        {banners.map((_, index) => (
          <View
          key={index}
          style={[
            styles.dot,
            activeIndex === index && styles.activeDot,
          ]}
          />
        ))}
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
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4
  },
  activeDot: {
    backgroundColor: '#4A90E2',
    width: 8
  }
});
