import { useState } from "react";
import { Modal, Pressable, ScrollView } from "react-native";
import { Check, Pause, Pencil, Play, LayoutDashboard, Sprout, ShieldCheck, Package, ArrowLeftRight, } from "lucide-react-native";
import { Text, View } from "@/components/Themed";

import { detailStyles } from "../../styles/detail.styles";

type ViveDetailProps = {
    readonly id: string;
    readonly name: string;
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

type LotStatus = "active" | "paused" | "finished";

export default function ViveDetail({ id, name }: ViveDetailProps) {
    const [status, setStatus] = useState<LotStatus>("active");
    const [confirmVisible, setConfirmVisible] = useState(false);

    const [selectedSection, setSelectedSection] =
        useState<ViveSection>("resumen");

    const isFinished = status === "finished";

    const handleFinish = () => {
        setStatus("finished");
        setConfirmVisible(false);
    };

    const STATUS_LABELS: Record<LotStatus, string> = {
        active: "Activo",
        paused: "Pausado",
        finished: "Finalizado",
    };

    return (
        <View style={detailStyles.container}>
            {/* Primera división */}
            <View style={detailStyles.headerSection}>
                <View style={detailStyles.identification}>
                    <Text style={detailStyles.id}>{id}</Text>

                    <Pressable
                        onPress={() => {}}
                        style={detailStyles.editButton}
                        accessibilityRole="button"
                        accessibilityLabel="Editar tarjeta"
                    >
                        <Pencil size={18} color="#888" />
                    </Pressable>
                </View>

                <Text style={detailStyles.name}>{name}</Text>

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
                            {STATUS_LABELS[status]}
                        </Text>
                    </View>

                    {!isFinished && (
                        <View style={detailStyles.actions}>
                            <Pressable
                                onPress={() =>
                                    setStatus(
                                        status === "active" ? "paused" : "active"
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
                <View style={detailStyles.optionsRow}>
                    <Pressable
                        style={[
                            detailStyles.option,
                            selectedSection === "resumen" && detailStyles.optionActive,
                        ]}
                        onPress={() => setSelectedSection("resumen")}
                    >
                        <LayoutDashboard size={20} />
                        <Text>Resumen</Text>
                    </Pressable>

                    <Pressable
                        style={[
                            detailStyles.option,
                            selectedSection === "etapas" && detailStyles.optionActive,
                        ]}
                        onPress={() => setSelectedSection("etapas")}
                    >
                        <Sprout size={20} />
                        <Text>Etapas</Text>
                    </Pressable>

                    <Pressable
                        style={[
                            detailStyles.option,
                            selectedSection === "fitosanitario" && detailStyles.optionActive,
                        ]}
                        onPress={() => setSelectedSection("fitosanitario")}
                    >
                        <ShieldCheck size={20} />
                        <Text>Fitosanitario</Text>
                    </Pressable>
                </View>

                <View style={detailStyles.optionsRow}>
                    <Pressable
                        style={[
                            detailStyles.option,
                            selectedSection === "insumos" && detailStyles.optionActive,
                        ]}
                        onPress={() => setSelectedSection("insumos")}
                    >
                        <Package size={20} />
                        <Text>Insumos</Text>
                    </Pressable>

                    <Pressable
                        style={[
                            detailStyles.option,
                            selectedSection === "movimientos" && detailStyles.optionActive,
                        ]}
                        onPress={() => setSelectedSection("movimientos")}
                    >
                        <ArrowLeftRight size={20} />
                        <Text>Movimientos</Text>
                    </Pressable>
                </View>
            </View>
            {/* Tercera división */}
            <ScrollView style={detailStyles.contentSection}>
                <Text style={detailStyles.sectionTitle}>
                    {SECTION_TITLES[selectedSection]}
                </Text>
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