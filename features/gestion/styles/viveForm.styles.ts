import { StyleSheet } from "react-native";

export const viveFormStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },

    blur: {
        ...StyleSheet.absoluteFill,
    },

    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "rgba(0,0,0,0.25)",
    },

    formContainer: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 35,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: "hidden",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
    },

    subtitle: {
        fontSize: 13,
        color: "#888",
        marginTop: 4,
    },

    closeButton: {
        padding: 8,
    },

    scrollArea: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        padding: 20,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },

    navigationButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        padding: 8,
    },

    disabledButton: {
        opacity: 0.35,
    },

    pageIndicator: {
        fontSize: 13,
        color: "#777",
    },
});