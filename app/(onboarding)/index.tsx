import CustomText from '@/components/CustomText';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ImageBackground, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../assets/onboarding.gif")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View className='flex-1 py-20 items-center justify-between'>
          <View className="flex justify-center items-center">
            <Image
              source={require("../../assets/images/soma/logo.png")}
              style={{ width: width / 2, height: width / 2, resizeMode: 'contain' }}
            />
          </View>

          <View className="flex gap-3 px-5">

            <CustomText className="text-3xl font-bold text-primary-bg">Journey Deeper</CustomText>
            <CustomText className="text-base text-primary-bg">Transformative sound experiences for every intention.</CustomText>


            <View className="justify-center flex h-[100px] text-primary-bg">
              <Link href="/AuthHome" className="flex items-center justify-center h-[50px] w-[200px] ">
                <View className="flex flex-row items-center">
                  <CustomText className='text-base text-white'>
                    Let's Begin
                  </CustomText>
                  <View className="w-12 h-12 flex justify-center items-center" style={{ marginLeft: 10, borderWidth: 1, borderColor: 'white', borderRadius: 50, padding: 5 }}>
                    <FontAwesome5 name="arrow-right" size={24} color="white" />
                  </View>
                </View>
              </Link>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

}