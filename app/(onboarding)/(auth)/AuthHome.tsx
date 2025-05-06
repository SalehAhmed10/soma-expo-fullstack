/**
 * Codia React Native App
 * https://codia.ai
 * https://github.com/facebook/react-native
 *
 * @format
 */
import CustomText from '@/components/CustomText';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Pressable, SafeAreaView, ScrollView, View } from 'react-native';

const { height } = Dimensions.get('window');

interface AuthProvider {
    provider: string;
    icon: string;
    color: string;
    brandColor: string;
}

interface AuthProviderButtonProps {
    provider: string;
    icon: string;
    color: string;
    brandColor: string;
    onPress: () => void;
}

const AuthProviderButton: React.FC<AuthProviderButtonProps> = ({
    provider,
    icon,
    color,
    brandColor,
    onPress
}) => {
    return (
        <Pressable
            onPress={onPress}
            className="w-[335px] h-[60px] border border-[#a36d47] rounded-full flex-row items-center justify-center gap-5 px-6 my-2"
        >
            <View className=" ">
                <FontAwesome5 name={icon} size={24} color={brandColor} />
            </View>

            <CustomText className="text-base text-dark-brown font-medium">
                Continue with {provider}
            </CustomText>
        </Pressable>
    );
};

export default function AuthHome(): React.JSX.Element {
    const authProviders: AuthProvider[] = [
        {
            provider: 'Apple',
            icon: 'apple',
            color: '#000000',
            brandColor: '#000000'
        },
        {
            provider: 'Google',
            icon: 'google',
            color: '#4285F4',
            brandColor: '#DB4437'
        },
        {
            provider: 'Facebook',
            icon: 'facebook',
            color: '#1877F2',
            brandColor: '#4267B2'
        },
        {
            provider: 'Email',
            icon: 'envelope',
            color: '#31170C',
            brandColor: '#31170C'
        }
    ];
    return (
        <SafeAreaView className="flex-1  bg-screen-bg">
            <ScrollView className="flex-1 px-4">
                <View className="items-center justify-start py-20" >
                    <View className="w-full items-center py-8 mb-20">
                        <Image
                            source={require("../../../assets/images/soma/logo.png")}
                            className="w-[175px] h-[45px]"
                            resizeMode="contain"
                        />
                    </View>

                    <CustomText className="text-xl font-semibold text-dark-brown mb-10 text-center">
                        Create an Account
                    </CustomText>

                    <View className="w-full items-center gap-y-2">
                        {authProviders.map((item, index) => (
                            <AuthProviderButton
                                key={index}
                                provider={item.provider}
                                icon={item.icon}
                                color={item.color}
                                brandColor={item.brandColor}
                                onPress={() => console.log(`${item.provider} pressed`)}
                            />
                        ))}
                    </View>

                    <CustomText className="text-base text-dark-brown font-normal mt-8">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary">Log in</Link>
                    </CustomText>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
// export default function App(): React.JSX.Element {
//     return (
//         <SafeAreaView>
//             <ScrollView
//                 scrollEnabled={true}
//                 contentInsetAdjustmentBehavior='automatic'
//             >
//                 <View
//                     className='flex-1 bg-red'
//                 >
//                     <ImageBackground
//                         style={{
//                             width: 175.344,
//                             height: 44.855,
//                             position: 'relative',
//                             zIndex: 10,
//                             marginTop: 64.862,
//                             marginRight: 0,
//                             marginBottom: 0,
//                             marginLeft: 108.828,
//                         }}
//                         source={require("../../../assets/images/soma/logo.png")}
//                         resizeMode='cover'
//                     />
//                     <Text
//                         style={{
//                             display: 'flex',
//                             width: 247,
//                             height: 27,
//                             justifyContent: 'center',
//                             alignItems: 'flex-start',
//                             fontFamily: 'Epilogue',
//                             fontSize: 26,
//                             fontWeight: '600',
//                             lineHeight: 26.65,
//                             color: '#31170c',
//                             position: 'relative',
//                             textAlign: 'center',
//                             zIndex: 11,
//                             marginTop: 86.393,
//                             marginRight: 0,
//                             marginBottom: 0,
//                             marginLeft: 73,
//                         }}
//                         numberOfLines={1}
//                     >
//                         Create an account
//                     </Text>
//                     <View
//                         style={{
//                             width: 335.876,
//                             height: 59.928,
//                             borderTopLeftRadius: 29.964,
//                             borderTopRightRadius: 29.964,
//                             borderBottomRightRadius: 29.964,
//                             borderBottomLeftRadius: 29.964,
//                             borderWidth: 1,
//                             borderColor: '#a36d47',
//                             borderStyle: 'solid',
//                             position: 'relative',
//                             zIndex: 12,
//                             marginTop: 42.228,
//                             marginRight: 0,
//                             marginBottom: 0,
//                             marginLeft: 28.563,
//                         }}
//                     >
//                         <ImageBackground
//                             style={{
//                                 width: '11.68%',
//                                 height: '65.46%',
//                                 position: 'absolute',
//                                 top: '13.04%',
//                                 left: '21.46%',
//                                 zIndex: 19,
//                             }}
//                         // source={require('./assets/images/b69886d9-3d16-4a6b-becb-5f67cfd37a08.png')}
//                         />
//                         <Text
//                             style={{
//                                 display: 'flex',
//                                 height: 16,
//                                 justifyContent: 'flex-start',
//                                 alignItems: 'flex-start',
//                                 fontFamily: 'Epilogue',
//                                 fontSize: 16.089296340942383,
//                                 fontWeight: '500',
//                                 lineHeight: 16,
//                                 color: '#31170c',
//                                 position: 'absolute',
//                                 top: 20.964,
//                                 left: 112.652,
//                                 textAlign: 'left',
//                                 zIndex: 17,
//                             }}
//                             numberOfLines={1}
//                         >
//                             Continue with Apple
//                         </Text>
//                     </View>
//                     <View
//                         style={{
//                             width: 335.876,
//                             height: 59.928,
//                             borderTopLeftRadius: 29.964,
//                             borderTopRightRadius: 29.964,
//                             borderBottomRightRadius: 29.964,
//                             borderBottomLeftRadius: 29.964,
//                             borderWidth: 1,
//                             borderColor: '#a36d47',
//                             borderStyle: 'solid',
//                             position: 'relative',
//                             zIndex: 13,
//                             marginTop: 15.839,
//                             marginRight: 0,
//                             marginBottom: 0,
//                             marginLeft: 28.563,
//                         }}
//                     >
//                         <ImageBackground
//                             style={{
//                                 width: '14.29%',
//                                 height: '76.76%',
//                                 position: 'absolute',
//                                 top: '9.95%',
//                                 left: '19.81%',
//                                 zIndex: 27,
//                             }}
//                         // source={require('./assets/images/a887f606-690c-45b6-8369-7e97bd1ff4c4.png')}
//                         />
//                         <Text
//                             style={{
//                                 display: 'flex',
//                                 height: 16,
//                                 justifyContent: 'flex-start',
//                                 alignItems: 'flex-start',
//                                 fontFamily: 'Epilogue',
//                                 fontSize: 16.089296340942383,
//                                 fontWeight: '500',
//                                 lineHeight: 16,
//                                 color: '#31170c',
//                                 position: 'absolute',
//                                 top: 20.964,
//                                 left: 113.652,
//                                 textAlign: 'left',
//                                 zIndex: 25,
//                             }}
//                             numberOfLines={1}
//                         >
//                             Continue with Google
//                         </Text>
//                     </View>
//                     <View
//                         style={{
//                             width: 335.876,
//                             height: 59.928,
//                             borderTopLeftRadius: 29.964,
//                             borderTopRightRadius: 29.964,
//                             borderBottomRightRadius: 29.964,
//                             borderBottomLeftRadius: 29.964,
//                             borderWidth: 1,
//                             borderColor: '#a36d47',
//                             borderStyle: 'solid',
//                             position: 'relative',
//                             zIndex: 14,
//                             marginTop: 15.839,
//                             marginRight: 0,
//                             marginBottom: 0,
//                             marginLeft: 28.563,
//                         }}
//                     >
//                         <ImageBackground
//                             style={{
//                                 width: '8.34%',
//                                 height: '46.72%',
//                                 position: 'absolute',
//                                 top: '24.97%',
//                                 left: '17.89%',
//                                 zIndex: 22,
//                             }}
//                         // source={require('./assets/images/ff062b74-8293-4430-a949-ac3af8b9b67a.png')}
//                         />
//                         <Text
//                             style={{
//                                 display: 'flex',
//                                 height: 16,
//                                 justifyContent: 'flex-start',
//                                 alignItems: 'flex-start',
//                                 fontFamily: 'Epilogue',
//                                 fontSize: 16.089296340942383,
//                                 fontWeight: '500',
//                                 lineHeight: 16,
//                                 color: '#31170c',
//                                 position: 'absolute',
//                                 top: 20.964,
//                                 left: 98.44,
//                                 textAlign: 'left',
//                                 zIndex: 23,
//                             }}
//                             numberOfLines={1}
//                         >
//                             Continue with Facebook
//                         </Text>
//                     </View>
//                     <View
//                         style={{
//                             width: 335.876,
//                             height: 59.928,
//                             borderTopLeftRadius: 29.964,
//                             borderTopRightRadius: 29.964,
//                             borderBottomRightRadius: 29.964,
//                             borderBottomLeftRadius: 29.964,
//                             borderWidth: 1,
//                             borderColor: '#a36d47',
//                             borderStyle: 'solid',
//                             position: 'relative',
//                             zIndex: 15,
//                             marginTop: 15.839,
//                             marginRight: 0,
//                             marginBottom: 0,
//                             marginLeft: 28.563,
//                         }}
//                     >
//                         <ImageBackground
//                             style={{
//                                 width: 24,
//                                 height: 24,
//                                 position: 'absolute',
//                                 top: 17.849,
//                                 left: 71.187,
//                                 overflow: 'hidden',
//                                 zIndex: 30,
//                             }}
//                             // source={require('./assets/images/977b67ed-c8ef-4291-87a1-1e11c39f2636.png')}
//                             resizeMode='cover'
//                         />
//                         <Text
//                             style={{
//                                 display: 'flex',
//                                 height: 16,
//                                 justifyContent: 'flex-start',
//                                 alignItems: 'flex-start',
//                                 fontFamily: 'Epilogue',
//                                 fontSize: 16.089296340942383,
//                                 fontWeight: '500',
//                                 lineHeight: 16,
//                                 color: '#31170c',
//                                 position: 'absolute',
//                                 top: 21.849,
//                                 left: 105.688,
//                                 textAlign: 'left',
//                                 zIndex: 29,
//                             }}
//                             numberOfLines={1}
//                         >
//                             Continue with Email
//                         </Text>
//                     </View>
//                     <Text
//                         style={{
//                             width: 254,
//                             height: 16,
//                             fontFamily: 'Epilogue',
//                             fontSize: 16.089296340942383,
//                             fontWeight: '300',
//                             lineHeight: 16,
//                             position: 'relative',
//                             textAlign: 'left',
//                             zIndex: 31,
//                             marginTop: 34.688,
//                             marginRight: 0,
//                             marginBottom: 0,
//                             marginLeft: 69.5,
//                         }}
//                     >
//                         <Text
//                             style={{
//                                 fontFamily: 'Epilogue',
//                                 fontSize: 16.089296340942383,
//                                 fontWeight: '300',
//                                 lineHeight: 16.492,
//                                 color: '#31170c',
//                                 position: 'relative',
//                                 textAlign: 'left',
//                             }}
//                         >
//                             Already have an account?&nbsp;
//                         </Text>
//                         <Text
//                             style={{
//                                 fontFamily: 'Epilogue',
//                                 fontSize: 16.089296340942383,
//                                 fontWeight: '600',
//                                 lineHeight: 16.492,
//                                 color: '#834518',
//                                 position: 'relative',
//                                 textAlign: 'left',
//                             }}
//                         >
//                             Log in
//                         </Text>
//                     </Text>
//                     <View
//                         style={{
//                             width: 428,
//                             height: 42,
//                             position: 'relative',
//                             overflow: 'hidden',
//                             zIndex: 8,
//                             marginTop: 150.745,
//                             marginRight: 0,
//                             marginBottom: 0,
//                             marginLeft: -19.521,
//                         }}
//                     >
//                         <ImageBackground
//                             style={{
//                                 width: 185,
//                                 height: 4,
//                                 position: 'relative',
//                                 zIndex: 9,
//                                 marginTop: 19,
//                                 marginRight: 0,
//                                 marginBottom: 0,
//                                 marginLeft: 121,
//                             }}
//                             // source={require('./assets/images/2f474a5f-5e8a-41f4-9759-8adf2245b627.png')}
//                             resizeMode='cover'
//                         />
//                     </View>
//                     <ImageBackground
//                         style={{
//                             width: 417.507,
//                             height: 768.209,
//                             position: 'absolute',
//                             top: 472.872,
//                             left: 0,
//                         }}
//                         // source={require('./assets/images/d157dfac-e559-4c10-bd4d-ca11d0647fca.png')}
//                         resizeMode='cover'
//                     />
//                 </View>
//             </ScrollView>
//         </SafeAreaView >
//     );
// }
