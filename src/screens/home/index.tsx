import {View,Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Screen, {ScreenTypes} from '../../components/organisms/wrapperScreen';
import {useThemeStore} from '../../zustand/useThemeStore';
import {
  BookingButton,
  CustomTabs,
  ImageSlider,
  ServiceStats,
} from './components';
import {tabsData, travelDestinations} from './data';
import {useHomeHandlers} from './hooks/useHomeHandlers';
import {generateStyles} from './styles';

const Home = () => {
  const {bottom} = useSafeAreaInsets();
  const {Theme} = useThemeStore();
  const styles = generateStyles(Theme, bottom);
  const {
    handleBookPress,
    handleSendMessagePress,
    handleDestinationPress,
    handleTabChange,
  } = useHomeHandlers();

  return (
    <View style={styles.container}>
      <Screen
        unSafeHorizontal
        unSafeBottom
        unSafeVertical
        CustomeStyle={styles.contentContainer}
        present={ScreenTypes.SCROLL}>
        <ImageSlider
          data={travelDestinations}
          onDestinationPress={handleDestinationPress}
        />

        <ServiceStats />

        <CustomTabs
          tabs={tabsData}
          initialActiveTab="features-addons"
          onTabChange={handleTabChange}
        />
      </Screen>

      <BookingButton
        price="3549"
        validUntil="30 ديسمبر"
        onBookPress={handleBookPress}
        onSendMessagePress={handleSendMessagePress}
      />
    </View>
  );
};

export {Home};
