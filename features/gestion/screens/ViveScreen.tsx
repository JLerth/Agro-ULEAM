import { router } from "expo-router";
import { Sprout } from "lucide-react-native";

import GestionLayout from "../components/gestionLayout";
import GestionCard from "../components/gestionCard";

import { useViveros } from "../hooks/use-viveros";
import { VIVE_LOT_STATUS } from "../data/viveLots";

export default function ViverosScreen() {
    const lots = useViveros();
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
                    status={VIVE_LOT_STATUS[lot.status]}
                    title={lot.title}
                    subtitle={lot.subtitle}
                    icon={<Sprout size={22} />}
                    onPress={() =>
                        router.push({
                            pathname: "/(tabs)/(inicio)/detalle/vive",
                            params: {
                                id: lot.id,
                            },
                        })
                    }
                />
            ))}
        </GestionLayout>
    );
}