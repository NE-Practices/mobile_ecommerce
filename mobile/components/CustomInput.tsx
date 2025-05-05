import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";

interface CustomInputProps extends React.ComponentProps<typeof TextInput> {
  label: string;
  containerStyles?: string;
  inputStyles?: string;
  isPassword?: boolean;
}

const CustomInput = ({
  label,
  containerStyles = "",
  inputStyles = "",
  isPassword = false,
  ...props
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`mb-4 ${containerStyles}`}>
      <Text className="text-base font-semibold text-gray-700 mb-2">
        {label}
      </Text>
      <View className="flex-row items-center border border-gray-400 rounded-md px-3 bg-white">
        <TextInput
          className={`flex-1 text-base text-gray-800 ${inputStyles}`}
          autoCapitalize="none"
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor="#9CA3AF"
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;
