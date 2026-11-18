import { Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { Text, View } from "@/components/Themed";
import { ArrowLeft, SlidersHorizontal, Plus } from "lucide-react-native";

import { gestionStyles } from "../styles/gestion.styles";

export default function AgricolaScreen() {
    return (
        <View style={gestionStyles.container}>
            {/* Sección superior */}
            <View style={gestionStyles.topSection}>
                <Pressable
                    onPress={() => router.replace("/(tabs)/(inicio)")}
                    style={gestionStyles.backButton}
                >
                    <ArrowLeft size={20} color="#999" />
                    <Text>Regresar</Text>
                </Pressable>
            </View>

            {/* Separador */}
            <View style={gestionStyles.divider} />

            {/* Sección inferior */}
            <View style={gestionStyles.contentSection}>
                {/* Resumen */}
                <View style={gestionStyles.statsContainer}>
                    <View style={gestionStyles.statItem}>
                        <Text style={gestionStyles.statNumber}>-</Text>
                        <Text>--</Text>
                    </View>

                    <View style={gestionStyles.statItem}>
                        <Text style={gestionStyles.statNumber}>-</Text>
                        <Text>--</Text>
                    </View>
                </View>
                {/* Filtros */}
                <View style={gestionStyles.filterBar}>
                    <View style={gestionStyles.filterOptions}>
                        <Pressable>
                            <Text>Todos</Text>
                        </Pressable>

                        {/* Aquí aparecerán los filtros seleccionados */}
                    </View>

                    <Pressable style={gestionStyles.filterButton}>
                        <Text>Filtro</Text>
                        <SlidersHorizontal size={20} color="#999" />
                    </Pressable>
                </View>
                {/* Tarjetas */}
                <ScrollView
                    style={gestionStyles.scrollArea}
                    contentContainerStyle={gestionStyles.scrollContent}
                >
                    {/* Aquí aparecerán las tarjetas */}
                </ScrollView>
                {/* Añadir */}
                <Pressable style={gestionStyles.addButton}>
                    <Plus size={26} color="#999" />
                </Pressable>
            </View>
        </View>
    );
}