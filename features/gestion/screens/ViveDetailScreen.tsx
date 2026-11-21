import GestionDetail from "../components/gestionDetail";
import ViveDetail from "../components/detail/viveDetail";

export default function ViveDetailScreen() {
    return (
        <GestionDetail  backRoute="/(tabs)/(inicio)/gestion/vive">
            <ViveDetail
                id="ID pendiente"
                name="Nombre del lote"
            />
        </GestionDetail>
    );
}