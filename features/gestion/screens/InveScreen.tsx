import GestionLayout from "../components/gestionLayout";

export default function InventaioScreen() {
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
        />
    );
}