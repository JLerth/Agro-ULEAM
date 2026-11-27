import { useState } from "react";
import { router } from "expo-router";
import { Sprout } from "lucide-react-native";

import GestionLayout from "../components/gestionLayout";
import GestionCard from "../components/gestionCard";

import ViveForm from "../components/forms/viveForm";
import AddOptions from "../components/addOptions";

import { useViveros } from "../hooks/use-viveros";
import { createViveroLot } from "../repositories/viverosLotsRepository";
import { VIVE_LOT_STATUS } from "../data/viveLots";
import type { FormResult } from "../hooks/use-dynamic-form";

export default function ViveScreen() {
    const [addOptionsVisible, setAddOptionsVisible] = useState(false);
    const [viveFormVisible, setViveFormVisible] = useState(false);
    const lots = useViveros();

    const activeLots = lots.filter((lot) => lot.status !== "finished").length;

    const handleSave = (data: FormResult) => {
        const quantity = Number(data.initial_quantity);

        createViveroLot({
            title: String(data.species),
            subtitle: `${quantity} plantas`,
            quantity,
            entryDate: String(data.entry_date),
            stage: String(data.initial_stage),
            responsible: String(data.responsible),
            createdAt: String(data.created_at),
            observations: data.observations ? String(data.observations) : undefined,
        });
    };

    return (
        <>
            <GestionLayout
                firstStat={{
                    value: String(activeLots),
                    label: "Lotes activos",
                }}
                secondStat={{
                    value: "-", // se calcula cuando ViveLot guarde `quantity`
                    label: "Plantas",
                }}
                onAdd={() => setAddOptionsVisible(true)}
            >
                {lots.map((lot) => (
                    <GestionCard
                        key={lot.id}
                        id={lot.id}
                        status={VIVE_LOT_STATUS[lot.status]}
                        title={lot.title}
                        subtitle={lot.subtitle}
                        icon={<Sprout size={22} />}
                        onPress={() =>
                            router.push({
                                pathname: "/(tabs)/(inicio)/detalle/vive",
                                params: { id: lot.id },
                            })
                        }
                    />
                ))}
            </GestionLayout>

            <AddOptions
                visible={addOptionsVisible}
                onClose={() => setAddOptionsVisible(false)}
                onCreate={() => {
                    setAddOptionsVisible(false);
                    setViveFormVisible(true);
                }}
                onRegister={() => {
                    setAddOptionsVisible(false);
                    // Posteriormente abriremos viveRegisterForm
                }}
            />

            <ViveForm
                visible={viveFormVisible}
                onClose={() => setViveFormVisible(false)}
                onSave={handleSave}
            />
        </>
    );
}