import React from 'react';
import { View, Image } from 'react-native';
import { images } from '@themes';

const styles = {
  logoContainer: {
    width: '100%',
    height: 100
  },
  logo: {
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  }
};

function Logo() {
  return (
    <>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={images.wednesdayLogo}
          resizeMode="contain"
        />
      </View>
    </>
  );
}

export default Logo;
