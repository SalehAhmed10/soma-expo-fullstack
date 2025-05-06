import { cn } from '@/utils/cn'; // Assuming you have a utility function for classnames
import React from 'react';
import { Text, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
    className?: string;
}

const CustomText: React.FC<CustomTextProps> = ({ className, ...props }) => {
    return (
        <Text
            className={cn('font-epilogue', className)}
            {...props}
        />
    );
};

export default CustomText;