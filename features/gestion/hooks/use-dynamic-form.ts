import { useMemo, useState } from "react";

export type FormOption = { label: string; value: string };

export type FormQuestion = {
    id: string;
    question: string;
    description?: string;
    type: "text" | "number" | "date" | "select" | "textarea";
    required?: boolean;
    placeholder?: string;
    integer?: boolean;
    min?: number;
    maxDate?: "today";
    maxLength?: number;
    options?: FormOption[];
    optionsSource?: string;
    allowCustom?: boolean;
};

export type FormSectionConfig = {
    id: string;
    title: string;
    questions: FormQuestion[];
};

export type AutoField = {
    id: string;
    type: string;
    source?: string;
    generator?: string;
};

export type FormConfig = {
    formId: string;
    title: string;
    maxQuestionsPerPage: number;
    sections: FormSectionConfig[];
    autoFields?: AutoField[];
};

export type FormValues = Record<string, string>;
export type FormErrors = Record<string, string>;
export type FormResult = Record<string, string | number>;

/** Fecha local en formato YYYY-MM-DD (toISOString usa UTC y puede cambiar el día). */
export function toLocalISODate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function chunk<T>(items: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < items.length; i += size) {
        result.push(items.slice(i, i + size));
    }
    return result;
}

function validateNumber(question: FormQuestion, value: string): string | null {
    const number = Number(value);

    if (!Number.isFinite(number)) return "Ingresa un número válido.";

    if (question.integer && !Number.isInteger(number)) {
        return "Debe ser un número entero.";
    }

    if (question.min !== undefined && number < question.min) {
        return `El valor mínimo es ${question.min}.`;
    }

    return null;
}

function validateDate(question: FormQuestion, value: string): string | null {
    const isFuture =
        question.maxDate === "today" && value > toLocalISODate(new Date());

    return isFuture ? "La fecha no puede ser futura." : null;
}

function validateByType(question: FormQuestion, value: string): string | null {
    if (question.type === "number") return validateNumber(question, value);
    if (question.type === "date") return validateDate(question, value);
    return null;
}

export function validateQuestion(
    question: FormQuestion,
    rawValue: string | undefined,
): string | null {
    const value = (rawValue ?? "").trim();

    if (value === "") {
        return question.required ? "Este campo es obligatorio." : null;
    }

    const typeError = validateByType(question, value);
    if (typeError) return typeError;

    if (question.maxLength && value.length > question.maxLength) {
        return `Máximo ${question.maxLength} caracteres.`;
    }

    return null;
}
export function useDynamicForm(
    config: FormConfig,
    autoResolvers: Record<string, () => string> = {},
) {
    // Cada página es un grupo de preguntas; la última "página" es la revisión.
    const pages = useMemo(
        () =>
            config.sections
                .filter((section) => section.questions.length > 0)
                .flatMap((section) =>
                    chunk(section.questions, config.maxQuestionsPerPage).map(
                        (questions, index) => ({
                            key: `${section.id}-${index}`,
                            sectionTitle: section.title,
                            questions,
                        }),
                    ),
                ),
        [config],
    );

    const [values, setValues] = useState<FormValues>({});
    const [errors, setErrors] = useState<FormErrors>({});
    const [step, setStep] = useState(0);

    const isReview = step >= pages.length;
    const page = isReview ? null : pages[step];

    const setValue = (id: string, value: string) => {
        setValues((previous) => ({ ...previous, [id]: value }));
        setErrors((previous) => {
            if (!previous[id]) return previous;
            const next = { ...previous };
            delete next[id];
            return next;
        });
    };

    const validate = (questions: FormQuestion[]) => {
        const found: FormErrors = {};
        questions.forEach((question) => {
            const error = validateQuestion(question, values[question.id]);
            if (error) found[question.id] = error;
        });
        return found;
    };

    const next = () => {
        if (!page) return;
        const found = validate(page.questions);
        setErrors(found);
        if (Object.keys(found).length > 0) return;
        setStep((current) => current + 1);
    };

    const previous = () => setStep((current) => Math.max(0, current - 1));

    const reset = () => {
        setValues({});
        setErrors({});
        setStep(0);
    };

    /** Devuelve los datos listos para guardar, o null si hay errores. */
    const submit = (): FormResult | null => {
        for (let i = 0; i < pages.length; i++) {
            const found = validate(pages[i].questions);
            if (Object.keys(found).length > 0) {
                setErrors(found);
                setStep(i); // lleva al usuario a la página con el error
                return null;
            }
        }

        const data: FormResult = {};

        config.sections.forEach((section) =>
            section.questions.forEach((question) => {
                const value = (values[question.id] ?? "").trim();
                if (value === "") return;
                data[question.id] =
                    question.type === "number" ? Number(value) : value;
            }),
        );

        config.autoFields?.forEach((field) => {
            const key = field.source ?? field.generator;
            const resolver = key ? autoResolvers[key] : undefined;
            if (resolver) data[field.id] = resolver();
        });

        return data;
    };

    return {
        config,
        values,
        errors,
        page,
        step,
        totalSteps: pages.length + 1,
        isFirst: step === 0,
        isReview,
        setValue,
        next,
        previous,
        reset,
        submit,
    };
}