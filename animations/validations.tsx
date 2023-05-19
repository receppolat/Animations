import React, {useEffect, useRef} from 'react';
import {Animated, View, StyleSheet} from 'react-native';

const VerificationPage = () => {
  const animRefs = useRef<any>([]);

  useEffect(() => {
    animRefs.current.forEach((anim: any, index: number) => {
      startAnimation(anim, index * 500);
    });
  }, []);

  const startAnimation = (animation: any, delay: number) => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const createAnimationRefs = () => {
    const animations = [];
    for (let i = 0; i < 4; i++) {
      animations.push(useRef(new Animated.Value(0)).current);
    }
    animRefs.current = animations;
  };

  createAnimationRefs();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {animRefs.current.map((anim: any, index: number) => (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              {
                opacity: anim,
                transform: [
                  {
                    translateX: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-200, 0],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
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
  row: {
    flexDirection: 'row',
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: '#00FF00',
    marginHorizontal: 10,
  },
});

export default VerificationPage;
