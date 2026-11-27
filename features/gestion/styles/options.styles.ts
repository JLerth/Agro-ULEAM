
import { StyleSheet } from "react-native";

export const optionsStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "flex-end",
    },
    container: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        paddingBottom: 32,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    closeButton: {
        padding: 4,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#f2f2f2",
        marginBottom: 12,
    },
    optionLast: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#f2f2f2",
    },
    optionContent: {
        marginLeft: 14,
    },
    optionTitle: {
        fontWeight: "bold",
    },
    optionDescription: {
        color: "#777",
        fontSize: 13,
    },
});