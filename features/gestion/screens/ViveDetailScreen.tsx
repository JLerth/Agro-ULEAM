import { useLocalSearchParams } from "expo-router";

import GestionDetail from "../components/gestionDetail";
import ViveDetail from "../components/detail/viveDetail";

import { useViveros } from "../hooks/use-viveros";
import { updateViveroLotStatus } from "../repositories/viverosLotsRepository";

import { DETAIL_HEADERS } from "@/components/layout/screenheaders";

export default function ViveDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const lots = useViveros();
    const lot = lots.find((item) => item.id === id);

    return (
        <GestionDetail
            backRoute="/(tabs)/(inicio)/gestion/vive"
            title={DETAIL_HEADERS.vive.title}
            subtitle={DETAIL_HEADERS.vive.subtitle}
        >
            {lot && (
                <ViveDetail
                    lot={lot}
                    onStatusChange={(nextStatus) =>
                        updateViveroLotStatus(lot.id, nextStatus)
                    }
                />
            )}
        </GestionDetail>
    );
}