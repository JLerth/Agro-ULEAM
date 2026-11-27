import { useState } from "react";
import { Sprout } from "lucide-react-native";

import GestionLayout from "../components/gestionLayout";
import GestionCard from "../components/gestionCard";

export default function InventaioScreen() {
    const [lots] = useState([
        {
            id: "--",
            status: "--",
            title: "--",
            subtitle: "--",
        },
    ]);
    return (
        <GestionLayout
            firstStat={{
                value: "-",
                label: "--",
            }}
            secondStat={{
                value: "-",
                label: "--",
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
                    onPress={() => {
                        console.log("Ingresar al lote:", lot.id);
                    }}
                />
            ))}
        </GestionLayout>
    );
}