import GestionDetail from "../components/gestionDetail";
import ViveDetail from "../components/detail/viveDetail";

import { DETAIL_HEADERS } from "@/components/layout/screenheaders";

export default function ViveDetailScreen() {
    return (
        <GestionDetail 
            backRoute="/(tabs)/(inicio)/gestion/vive"
            title={DETAIL_HEADERS.vive.title}
            subtitle={DETAIL_HEADERS.vive.subtitle}
        >
            <ViveDetail
                id="ID pendiente"
                name="Nombre del lote"
            />
        </GestionDetail>
    );
}