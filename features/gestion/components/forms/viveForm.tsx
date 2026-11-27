import { BlurView } from "expo-blur";
import { Modal, Pressable, ScrollView } from "react-native";
import { X, ChevronLeft, ChevronRight } from "lucide-react-native";

import { Text, View } from "@/components/Themed";

import viveFormConfig from "../../data/viveForm.json";
import { viveFormStyles } from "../../styles/viveForm.styles";
import {
    useDynamicForm,
    type FormConfig,
    type FormResult,
} from "../../hooks/use-dynamic-form";
import { FormQuestionField, FormReview } from "./formFields";
import { AUTO_VALUES } from "../../data/autoValues";

type ViveFormProps = {
    readonly visible: boolean;
    readonly onClose: () => void;
    readonly onSave?: (data: FormResult) => void;
};

export default function ViveForm({ visible, onClose, onSave }: ViveFormProps) {
    const form = useDynamicForm(viveFormConfig as FormConfig, AUTO_VALUES);

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const handleSave = () => {
        const data = form.submit();
        if (!data) return;

        onSave?.(data);
        handleClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
            onRequestClose={handleClose}
        >
            <View style={viveFormStyles.container}>
                <BlurView
                    intensity={35}
                    tint="dark"
                    style={viveFormStyles.blur}
                />
                <View style={viveFormStyles.overlay} />

                <View style={viveFormStyles.formContainer}>
                    <View style={viveFormStyles.header}>
                        <View>
                            <Text style={viveFormStyles.title}>{form.config.title}</Text>
                            <Text style={viveFormStyles.subtitle}>
                                {form.page?.sectionTitle ?? "Finalizar"}
                            </Text>
                        </View>

                        <Pressable
                            onPress={handleClose}
                            style={viveFormStyles.closeButton}
                        >
                            <X size={22} color="#777" />
                        </Pressable>
                    </View>

                    <ScrollView
                        style={viveFormStyles.scrollArea}
                        contentContainerStyle={viveFormStyles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {form.page?.questions.map((question) => (
                            <FormQuestionField
                                key={question.id}
                                question={question}
                                value={form.values[question.id] ?? ""}
                                error={form.errors[question.id]}
                                onChange={(value) =>
                                    form.setValue(question.id, value)
                                }
                            />
                        ))}

                        {form.isReview && (
                            <FormReview
                                config={form.config}
                                values={form.values}
                            />
                        )}
                    </ScrollView>

                    <View style={viveFormStyles.footer}>
                        <Pressable
                            onPress={form.previous}
                            disabled={form.isFirst}
                            style={[
                                viveFormStyles.navigationButton,
                                form.isFirst && viveFormStyles.disabledButton,
                            ]}
                        >
                            <ChevronLeft size={20} color="#777" />
                            <Text>Anterior</Text>
                        </Pressable>

                        <Text style={viveFormStyles.pageIndicator}>
                            {form.isReview
                                ? "Finalizar"
                                : `Página ${form.step + 1} de ${form.totalSteps - 1}`}
                        </Text>

                        {form.isReview ? (
                            <Pressable
                                onPress={handleSave}
                                style={viveFormStyles.navigationButton}
                            >
                                <Text>Guardar lote</Text>
                            </Pressable>
                        ) : (
                            <Pressable
                                onPress={form.next}
                                style={viveFormStyles.navigationButton}
                            >
                                <Text>Siguiente</Text>
                                <ChevronRight size={20} color="#777" />
                            </Pressable>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
}