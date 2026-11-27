import { useState } from "react";
import { Pressable, TextInput, type KeyboardTypeOptions } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { OPTION_SOURCES } from "../../data/optionSources";

import { Text, View } from "@/components/Themed";

import {
    toLocalISODate,
    type FormConfig,
    type FormOption,
    type FormQuestion,
    type FormValues,
} from "../../hooks/use-dynamic-form";

function getOptions(question: FormQuestion): FormOption[] {
    if (question.options) return question.options;

    const source = question.optionsSource
        ? OPTION_SOURCES[question.optionsSource]
        : undefined;

    return (source ?? []).map((item) => ({ label: item, value: item }));
}

function getKeyboardType(question: FormQuestion): KeyboardTypeOptions {
    if (question.type !== "number") return "default";

    return question.integer ? "number-pad" : "decimal-pad";
}

type FieldProps = {
    readonly question: FormQuestion;
    readonly value: string;
    readonly error?: string;
    readonly onChange: (value: string) => void;
};

export function FormQuestionField({
    question,
    value,
    error,
    onChange,
}: FieldProps) {
    const [pickerVisible, setPickerVisible] = useState(false);

    const options = question.type === "select" ? getOptions(question) : [];
    const isCustomValue =
        value !== "" && !options.some((option) => option.value === value);

    return (
        <View>
            <Text>{question.question}</Text>

            {Boolean(question.description) && (
                <Text>{question.description}</Text>
            )}

            {(question.type === "text" ||
                question.type === "number" ||
                question.type === "textarea") && (
                <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder={question.placeholder ?? "Escribe tu respuesta"}
                    maxLength={question.maxLength}
                    keyboardType={getKeyboardType(question)}
                    multiline={question.type === "textarea"}
                    numberOfLines={question.type === "textarea" ? 4 : 1}
                    textAlignVertical={
                        question.type === "textarea" ? "top" : "center"
                    }
                />
            )}

            {question.type === "date" && (
                <>
                    <Pressable onPress={() => setPickerVisible(true)}>
                        <Text>{value || "Seleccionar fecha"}</Text>
                    </Pressable>

                    {pickerVisible && (
                        <DateTimePicker
                            value={
                                value
                                    ? new Date(`${value}T12:00:00`)
                                    : new Date()
                            }
                            mode="date"
                            display="default"
                            maximumDate={
                                question.maxDate === "today"
                                    ? new Date()
                                    : undefined
                            }
                            onValueChange={(_, selectedDate) => {
                                setPickerVisible(false);
                                if (selectedDate) {
                                    onChange(toLocalISODate(selectedDate));
                                }
                            }}
                            onDismiss={() => setPickerVisible(false)}
                        />
                    )}
                </>
            )}

            {question.type === "select" && (
                <>
                    {options.map((option) => (
                        <Pressable
                            key={option.value}
                            onPress={() => onChange(option.value)}
                        >
                            <Text>
                                {value === option.value ? "● " : "○ "}
                                {option.label}
                            </Text>
                        </Pressable>
                    ))}

                    {question.allowCustom && (
                        <>
                            <Text>¿No encuentras la opción?</Text>
                            <TextInput
                                value={isCustomValue ? value : ""}
                                onChangeText={onChange}
                                placeholder={
                                    question.placeholder ?? "Escribe otra opción"
                                }
                            />
                        </>
                    )}
                </>
            )}

            {Boolean(error) && (
                <Text style={{ color: "#d33" }}>{error}</Text>
            )}
        </View>
    );
}

type ReviewProps = {
    readonly config: FormConfig;
    readonly values: FormValues;
};

export function FormReview({ config, values }: ReviewProps) {
    const questions = config.sections.flatMap((section) => section.questions);

    return (
        <View>
            <Text>Revisa la información del lote antes de finalizar.</Text>

            {questions.map((question) => {
                const answer = (values[question.id] ?? "").trim();
                const label = getOptions(question).find(
                    (option) => option.value === answer,
                )?.label;

                return (
                    <View key={question.id}>
                        <Text>{question.question}</Text>
                        <Text>{label ?? (answer || "Sin respuesta")}</Text>
                    </View>
                );
            })}
        </View>
    );
}