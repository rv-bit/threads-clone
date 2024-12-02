import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import Input from '@/components/Input';

export default function Post() {
    const [title, setTitle] = useState('');
    const [images, setImages] = useState<string[]>([]);

    const onAddImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.6,
            base64: true,
        });

        if (!result.canceled) {
            const uri = `data:image/png;base64,${(result.assets[0] as { base64: string }).base64}`;
            setImages([...images, uri]);
        }
    }

    return (
        <Animated.View
            entering={FadeIn}
            className={'flex-1 justify-center items-center bg-white bg-opacity-80'}
        >
            <Animated.View
                entering={SlideInDown}
                style={{
                    width: '90%',
                    height: '80%',
                }}
                className={'flex-1 py-5 justify-start items-start'}
            >
                <View className='flex flex-col gap-3 items-start justify-start w-full h-full'>
                    <Input
                        title={'Title'}
                        placeholder={'Title'}
                        value={title}
                        onChange={(e) => {
                            setTitle(e);
                            console.log(e);
                        }}
                        className='w-full'
                    />
                    <Input
                        title={'Title'}
                        placeholder={'Title'}
                        value={title}
                        onChange={(e) => {
                            setTitle(e);
                            console.log(e);
                        }}
                        className='w-full'
                    />

                    <Pressable
                        onPress={onAddImages}
                        className='w-full h-10 bg-blue-500 rounded-md justify-center items-center'>
                        <Text style={{ color: 'white' }}>Add Images</Text>
                    </Pressable>

                    {images.length > 0 && (
                        <View className='w-full flex flex-row gap-2'>
                            {images.map((image, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: image }}
                                    style={{ width: 100, height: 100 }}
                                />
                            ))}
                        </View>
                    )}

                    <View className='flex flex-col gap-2'>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Modal Screen</Text>
                        <Pressable
                            onPress={() => {
                                router.back();
                            }}
                        >
                            <Text style={{ color: 'blue' }}>← Go back</Text>
                        </Pressable>
                    </View>
                </View>

            </Animated.View>
        </Animated.View>
    );
}