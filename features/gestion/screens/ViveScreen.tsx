import { router } from "expo-router";
import { useState } from "react";
import { Sprout } from "lucide-react-native";

import GestionLayout from "../components/gestionLayout";
import GestionCard from "../components/gestionCard";

export default function ViverosScreen() {
    const [lots] = useState([
        {
            id: "LOT-001",
            status: "Activo",
            title: "Café",
            subtitle: "Lote de producción",
        },
    ]);
    return (
        <GestionLayout
            firstStat={{
                value: "-",
                label: "Lotes activos",
            }}
            secondStat={{
                value: "-",
                label: "Plantas",
            }}
        >
            {lots.map((lot) => (
                <GestionCard
                    key={lot.id}
                    id={lot.id}
                    status={lot.status}
                    title={lot.title}
                    subtitle={lot.subtitle}
                    icon={<Sprout size={22} />}
                    onPress={() => 
                        router.push("/(tabs)/(inicio)/detalle/vive")
                    }
                />
            ))}
        </GestionLayout>
    );
}