import { View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import CustomButton from './CustomButton'

interface SocialButtonProps {
    onPress: () => void
    icon: string
    bgColor?: string
    iconColor?: string
    className?: string  // Add className prop
}

export default function SocialButton({
    onPress,
    icon,
    bgColor = 'white',
    iconColor = '#000',
    className = ''
}: SocialButtonProps) {
    return (
        <CustomButton
            onPress={onPress}
            variant="secondary"
            showBorder={false}
            className={`w-[48px] h-[48px] ${bgColor === 'white' ? 'bg-white' : `bg-[${bgColor}]`
                } ${icon === 'google' ? '' : 'mr-4'} ${className}`}
        >
            <FontAwesome5 name={icon} size={20} color={iconColor} />
        </CustomButton>
    )
}