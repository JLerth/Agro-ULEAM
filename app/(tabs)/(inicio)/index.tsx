import { router } from "expo-router";
import { Button } from "react-native";
import { Text, View } from "@/components/Themed";

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12  }}>
            <Button title="Agricola" onPress={() => router.push("/gestion/agro")} />
            <Button title="Pecuaria" onPress={() => router.push("/gestion/pecu")} />
            <Button title="Viveveros" onPress={() => router.push("/gestion/vive")} />
            <Button title="Insumos" onPress={() => router.push("/gestion/insu")} />

            <Text>Inicio</Text>

            <Button title="Agregar" onPress={() => {}} />
        </View>
    );
}