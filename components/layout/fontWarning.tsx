import { Pressable, StyleSheet } from "react-native";

import { View, Text } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

type FontWarningProps = {
    readonly onClose: () => void;
};

export default function FontWarning({ onClose }: FontWarningProps) {
    const theme = useColorScheme();
    const colors = Colors[theme];

    return (
        <View pointerEvents="box-none" style={styles.overlay}>
            <View
                colorName="surface"
                style={[
                    styles.warning,
                    { borderColor: colors.border },
                ]}
            >
                <View colorName="surface" style={styles.message}>
                    <Text
                        colorName="primary"
                        style={styles.title}
                    >
                        Aviso de recursos
                    </Text>

                    <Text
                        colorName="text"
                        style={styles.description}
                    >
                        No se pudieron cargar algunos recursos visuales.
                        La aplicación continuará funcionando, pero algunos
                        iconos podrían no mostrarse.
                    </Text>
                </View>

                <Pressable
                    onPress={onClose}
                    accessibilityRole="button"
                    accessibilityLabel="Cerrar aviso"
                    hitSlop={10}
                    style={styles.closeButton}
                >
                    <Text colorName="primary" style={styles.closeText}>
                        ×
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 12,
        left: 16,
        right: 16,
        zIndex: 1000,
        elevation: 10,
    },
    warning: {
        flexDirection: "row",
        alignItems: "flex-start",
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        gap: 12,
    },
    message: {
        flex: 1,
        gap: 5,
    },
    title: {
        fontSize: 14,
        fontWeight: "700",
    },
    description: {
        fontSize: 12,
        lineHeight: 18,
    },
    closeButton: {
        paddingHorizontal: 4,
    },
    closeText: {
        fontSize: 24,
        lineHeight: 24,
    },
});