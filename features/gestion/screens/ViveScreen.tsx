import GestionLayout from "../components/gestionLayout";

export default function ViverosScreen() {
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
        />
    );
}
