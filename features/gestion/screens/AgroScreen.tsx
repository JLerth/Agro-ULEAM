import GestionLayout from "../components/gestionLayout";

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
        />
    );
}