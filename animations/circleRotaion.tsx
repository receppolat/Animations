import React, {useRef} from 'react';
import {View, Text, StyleSheet, PanResponder, Animated} from 'react-native';

const CircleRotationPage = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      const {moveX, moveY} = gesture;
      const center = 150; // Dairenin merkezi
      const dx = moveX - center;
      const dy = moveY - center;

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      rotation.setValue(angle);
    },
  });
  let angle = 45;

  const rotateStyle = {
    transform: [{rotate: `${angle}deg`}],
  };

  const interpolatedRotation = rotation.interpolate({
    inputRange: [-180, 180],
    outputRange: ['-180deg', '180deg'],
  });

  const rotateAnimatedStyle = {
    transform: [{rotate: interpolatedRotation}],
  };

  const renderText = (text: string, index: number) => {
    angle = (360 / 8) * index;

    let top, right;
    if (index === 1) {
      top = 0;
    } else if (index === 2) {
      top = 40;
      right = 40;
    } else if (index === 3) {
      top = 110;
      right = 0;
    } else if (index === 4) {
      top = 190;
      right = 40;
    } else if (index === 5) {
      top = 220;
    } else if (index === 6) {
      top = 190;
      right = 190;
    } else if (index === 7) {
      top = 110;
      right = 220;
    } else if (index === 8) {
      top = 40;
      right = 190;
    }

    return (
      <View key={index} style={[styles.textContainer, {top, right}]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.circle, rotateStyle, rotateAnimatedStyle]}
        {...panResponder.panHandlers}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(number =>
          renderText(number.toString(), number),
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#00FF00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CircleRotationPage;
