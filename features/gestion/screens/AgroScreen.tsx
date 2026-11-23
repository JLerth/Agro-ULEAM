import { router } from "expo-router";
import { Sprout } from "lucide-react-native";

import GestionLayout from "../components/gestionLayout";
import GestionCard from "../components/gestionCard";
import { agroLots } from "../data/agroLots";
export default function AgricolaScreen() {
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
            {agroLots.map((lot) => (
                <GestionCard
                    key={lot.id}
                    id={lot.id}
                    status={lot.status}
                    title={lot.title}
                    subtitle={lot.subtitle}
                    icon={<Sprout size={22} />}
                    onPress={() => {
                        router.push({
                            pathname: "/(tabs)/(inicio)/detalle/agro",
                            params: {
                                id: lot.id,
                            },
                        })
                    }}
                />
            ))}
        </GestionLayout>
    );
}