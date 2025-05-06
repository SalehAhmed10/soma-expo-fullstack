import React from 'react';
import { Text, TextProps } from 'react-native';
import clsx from 'clsx';

interface CustomTextProps extends TextProps {
    className?: string;
}

const CustomText: React.FC<CustomTextProps> = ({ style, className, ...props }) => {
    return (
        <Text
            className={clsx('', className)}
            style={[{ fontFamily: 'Epilogue, sans-serif' }, style]}
            {...props}
        />
    );
};

export default CustomText;