import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import useAuth from '@/hooks/useAuth'
import { validateEmail } from '@/lib/utils'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useToast } from 'react-native-toast-notifications'

const Signup = () => {
    const toast = useToast();
    const { register, registering } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = () => {
        if (!formData.email || !formData.password || !formData.name) {
            return toast.show("Please fill in all fields", {
                type: 'danger'
            });
        }
        if (!validateEmail(formData.email)) {
            return toast.show("Please enter a valid email", {
                type: 'danger'
            });
        }
        if (formData.password.length < 4) {
            return toast.show("Password must be at least 4 characters", {
                type: 'danger'
            });
        }
        if (formData.name.length < 2) {
            return toast.show("Name must be at least 2 characters", {
                type: 'danger'
            });
        }
        register(formData.name, formData.email, formData.password);
    }

    return (
        <SafeAreaView>
            <View className='h-full  justify-center px-6'>
                <Text className='text-2xl font-semibold'>Create account</Text>
                <Text className='text-gray-500 text-base'>Join thousands of other users today.</Text>
                <View className='w-full mt-10'>
                    <CustomInput
                        label='Full Name'
                        value={formData.name}
                        onChangeText={(val) => setFormData({ ...formData, name: val })}
                    />
                    <CustomInput
                        label='Email'
                        value={formData.email}
                        onChangeText={(val) => setFormData({ ...formData, email: val })}
                        containerStyles='mt-3'
                    />
                    <CustomInput
                        label='Password'
                       
                        isPassword
                        onChangeText={(val) => setFormData({ ...formData, password: val })}
                        containerStyles='mt-3'
                    />
                </View>
                <CustomButton
                    title='Signup'
                    handlePress={handleSubmit}
                    containerStyles='mt-8'
                    isLoading={registering}
                />
                <View className='flex flex-row gap-1 mt-3'>
                    <Text className='text-base'>Already have an account?</Text>
                    <Link href={'/login'}>
                        <Text className='text-orange-600 text-base'>login</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Signup

