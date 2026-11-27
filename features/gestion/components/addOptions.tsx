import { Modal, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import { Plus, ClipboardList, X } from "lucide-react-native";

import { optionsStyles } from "../styles/options.styles";

type AddOptionsProps = {
    readonly visible: boolean;
    readonly onClose: () => void;
    readonly onCreate: () => void;
    readonly onRegister: () => void;
};

export default function AddOptions({
    visible,
    onClose,
    onCreate,
    onRegister,
}: AddOptionsProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <Pressable
                style={optionsStyles.overlay}
                onPress={onClose}
            >
                <Pressable
                    onPress={(event) => event.stopPropagation()}
                    style={optionsStyles.container}
                >
                    <View style={optionsStyles.header}>
                        <Text style={optionsStyles.title}>
                            Agregar
                        </Text>

                        <Pressable
                            onPress={onClose}
                            style={optionsStyles.closeButton}
                        >
                            <X size={22} color="#999" />
                        </Pressable>
                    </View>

                    <Pressable
                        onPress={onCreate}
                        style={optionsStyles.option}
                    >
                        <Plus size={22} color="#999" />

                        <View style={optionsStyles.optionContent}>
                            <Text style={optionsStyles.optionTitle}>
                                Crear
                            </Text>
                            <Text style={optionsStyles.optionDescription}>
                                Crear un registro nuevo
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={onRegister}
                        style={optionsStyles.optionLast}
                    >
                        <ClipboardList size={22} color="#999" />

                        <View style={optionsStyles.optionContent}>
                            <Text style={optionsStyles.optionTitle}>
                                Registrar
                            </Text>
                            <Text style={optionsStyles.optionDescription}>
                                Registrar información existente
                            </Text>
                        </View>
                    </Pressable>
                </Pressable>
            </Pressable>
        </Modal>
    );
}