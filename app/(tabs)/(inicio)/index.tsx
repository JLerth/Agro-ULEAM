import { router } from "expo-router";
import { Button } from "react-native";
import { Text, View } from "@/components/Themed";

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12  }}>
            <Button title="Agricola" onPress={() => router.push("/gestion/agro")} />
            <Button title="Pecuaria" onPress={() => router.push("/gestion/pecu")} />
            <Button title="Viveros" onPress={() => router.push("/gestion/vive")} />
            <Button title="Inventario" onPress={() => router.push("/gestion/inve")} />

            <Text>Inicio</Text>

            <Button title="Agregar" onPress={() => {}} />
        </View>
    );
}