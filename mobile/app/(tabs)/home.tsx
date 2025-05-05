import CustomButton from "@/components/CustomButton";
import useAuth from "@/hooks/useAuth";
import useProducts from "@/hooks/useProducts";
import { useRouter } from "expo-router";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useAuth();
  const { products } = useProducts();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="mb-6">
            <Text className="text-2xl font-semibold text-gray-800">
              Welcome, {user?.name}
            </Text>
            <Text className="text-base text-gray-500 mt-1">
              Here are the products you’ve created
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
            <Text className="text-lg font-semibold text-gray-800">
              {item.name}
            </Text>
            <Text className="text-sm text-gray-500 mt-1 mb-2">
              {item.description}
            </Text>
            <Text className="text-base font-medium text-cyan-700">
              ${item.price}
            </Text>

            <CustomButton
              title="View"
              handlePress={() => router.push(`/product/${item.id}`)}
              containerStyles="mt-4 border border-cyan-600"
              titleStyles="text-base text-cyan-700"
              variant="outline"
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center py-32">
            <Image
              source={require("../../assets/images/no-data.png")}
              className="w-48 h-48 rounded-lg"
              resizeMode="contain"
            />
            <Text className="text-lg text-gray-600 mt-4 text-center px-4">
              You haven’t created any products yet.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
