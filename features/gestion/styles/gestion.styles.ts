import { StyleSheet } from "react-native";

export const gestionStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topSection: {
        paddingHorizontal: 16,
        paddingTop: 4,
        paddingBottom: 6,
    },
    backButton: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingVertical: 2,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#999",
    },
    contentSection: {
        flex: 1,
    },
    statsContainer: {
        flexDirection: "row",
        gap: 12,
        padding: 16,
    },
    statItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: "bold",
    },
    filterBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    filterOptions: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    scrollArea: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    addButton: {
        alignSelf: "flex-end",
        padding: 12,
        margin: 16,
    },
});
