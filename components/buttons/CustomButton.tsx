import CustomText from '@/components/CustomText';
import { TouchableOpacity } from 'react-native';

interface ButtonProps {
    onPress?: () => void;
    variant?: 'primary' | 'secondary';
    children: string | React.ReactNode;
    className?: string;
    showBorder?: boolean;
    disabled?: boolean;
}

export default function CustomButton({
    onPress,
    variant = 'primary',
    children,
    className = '',
    showBorder = true,
    disabled = false
}: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            className={`
                h-[50px]
                items-center
                justify-center
                rounded-full
                ${variant === 'primary'
                    ? 'bg-color-primary' // Use the Tailwind CSS class name
                    : `${showBorder ? 'border border-color-primary' : ''}` // Use the Tailwind CSS class name
                }
                ${disabled ? 'opacity-50' : ''}
                ${className}
            `}
        >
            <CustomText
                className={variant === 'primary'
                    ? 'text-white font-medium'
                    : 'text-color-primary font-medium' // Use the Tailwind CSS class name
                }
            >
                {children}
            </CustomText>
        </TouchableOpacity>
    );
}