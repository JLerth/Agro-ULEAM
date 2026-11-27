import { useState } from "react";
import { Modal, Pressable, ScrollView } from "react-native";
import {
    Check,
    Pause,
    Pencil,
    Play,
    LayoutDashboard,
    Sprout,
    ShieldCheck,
    Package,
    ArrowLeftRight,
} from "lucide-react-native";
import { Text, View } from "@/components/Themed";

import {
    VIVE_LOT_STATUS,
    VIVE_STAGE_LABELS,
    type LotStatus,
    type ViveLot,
} from "../../data/viveLots";
import { detailStyles } from "../../styles/detail.styles";

type ViveDetailProps = {
    readonly lot: ViveLot;
    readonly onStatusChange: (status: LotStatus) => void;
};

type ViveSection =
    | "resumen"
    | "etapas"
    | "fitosanitario"
    | "insumos"
    | "movimientos";

const SECTION_TITLES: Record<ViveSection, string> = {
    resumen: "Resumen",
    etapas: "Etapas",
    fitosanitario: "Fitosanitario",
    insumos: "Insumos",
    movimientos: "Movimientos",
};

const SECTION_OPTIONS: {
    id: string;
    options: {
        key: ViveSection;
        icon: typeof Sprout;
    }[];
}[] = [
    {
        id: "primary",
        options: [
            { key: "resumen", icon: LayoutDashboard },
            { key: "etapas", icon: Sprout },
            { key: "fitosanitario", icon: ShieldCheck },
        ],
    },
    {
        id: "secondary",
        options: [
            { key: "insumos", icon: Package },
            { key: "movimientos", icon: ArrowLeftRight },
        ],
    },
];

function formatDate(isoDate: string) {
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
}

function getSummaryRows(lot: ViveLot) {
    const rows = [
        { label: "Código", value: lot.id },
        { label: "Especie", value: lot.title },
        { label: "Cantidad", value: `${lot.quantity} plantas` },
        { label: "Fecha de ingreso", value: formatDate(lot.entryDate) },
        {
            label: "Etapa inicial",
            value: VIVE_STAGE_LABELS[lot.stage] ?? lot.stage,
        },
        { label: "Responsable", value: lot.responsible },
        {
            label: "Registrado",
            value: new Date(lot.createdAt).toLocaleString("es-EC"),
        },
    ];

    if (lot.observations) {
        rows.push({ label: "Observaciones", value: lot.observations });
    }

    return rows;
}

export default function ViveDetail({ lot, onStatusChange }: ViveDetailProps) {
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [selectedSection, setSelectedSection] =
        useState<ViveSection>("resumen");

    const { status } = lot;
    const isFinished = status === "finished";

    const handleFinish = () => {
        onStatusChange("finished");
        setConfirmVisible(false);
    };

    return (
        <View style={detailStyles.container}>
            {/* Primera división */}
            <View style={detailStyles.headerSection}>
                <View style={detailStyles.identification}>
                    <Text style={detailStyles.id}>{lot.id}</Text>

                    <Pressable
                        onPress={() => {}}
                        style={detailStyles.editButton}
                        accessibilityRole="button"
                        accessibilityLabel="Editar tarjeta"
                    >
                        <Pencil size={18} color="#888" />
                    </Pressable>
                </View>

                <Text style={detailStyles.name}>{lot.title}</Text>

                <View style={detailStyles.statusSection}>
                    <View
                        style={[
                            detailStyles.statusBadge,
                            status === "active" && detailStyles.activeBadge,
                            status === "paused" && detailStyles.pausedBadge,
                            status === "finished" && detailStyles.finishedBadge,
                        ]}
                    >
                        <Text style={detailStyles.statusText}>
                            {VIVE_LOT_STATUS[status]}
                        </Text>
                    </View>

                    {!isFinished && (
                        <View style={detailStyles.actions}>
                            <Pressable
                                onPress={() =>
                                    onStatusChange(
                                        status === "active" ? "paused" : "active",
                                    )
                                }
                                style={detailStyles.actionButton}
                            >
                                {status === "active" ? (
                                    <Pause size={16} color="#888" />
                                ) : (
                                    <Play size={16} color="#888" />
                                )}
                                <Text>
                                    {status === "active" ? "Pausar" : "Iniciar"}
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => setConfirmVisible(true)}
                                style={detailStyles.actionButton}
                            >
                                <Check size={16} color="#888" />
                                <Text>Finalizar</Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>

            {/* Segunda división: opciones */}
            <View style={detailStyles.optionsSection}>
                {SECTION_OPTIONS.map(({ id, options }) => (
                    <View key={id} style={detailStyles.optionsRow}>
                        {options.map(({ key, icon: Icon }) => (
                            <Pressable
                                key={key}
                                style={[
                                    detailStyles.option,
                                    selectedSection === key &&
                                        detailStyles.optionActive,
                                ]}
                                onPress={() => setSelectedSection(key)}
                            >
                                <Icon size={20} />
                                <Text>{SECTION_TITLES[key]}</Text>
                            </Pressable>
                        ))}
                    </View>
                ))}
            </View>

            {/* Tercera división */}
            <ScrollView style={detailStyles.contentSection}>
                <Text style={detailStyles.sectionTitle}>
                    {SECTION_TITLES[selectedSection]}
                </Text>

                {selectedSection === "resumen" &&
                    getSummaryRows(lot).map((row) => (
                        <View key={row.label}>
                            <Text>{row.label}</Text>
                            <Text>{row.value}</Text>
                        </View>
                    ))}
            </ScrollView>

            <Modal
                visible={confirmVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setConfirmVisible(false)}
            >
                <View style={detailStyles.modalOverlay}>
                    <View style={detailStyles.confirmDialog}>
                        <Text style={detailStyles.confirmTitle}>
                            Finalizar lote
                        </Text>

                        <Text>
                            ¿Estás seguro de que deseas finalizar este lote?
                            Esta acción no permitirá reanudarlo.
                        </Text>

                        <View style={detailStyles.confirmActions}>
                            <Pressable
                                onPress={() => setConfirmVisible(false)}
                                style={detailStyles.cancelButton}
                            >
                                <Text>Cancelar</Text>
                            </Pressable>

                            <Pressable
                                onPress={handleFinish}
                                style={detailStyles.finishButton}
                            >
                                <Text style={detailStyles.finishText}>
                                    Confirmar
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}