import { StyleSheet } from "react-native";

export const detailStyles = StyleSheet.create({
/* -------------------------------------------------------------------------- */
/* Encabezado                                                                 */
/* -------------------------------------------------------------------------- */
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
    titleSection: {
        gap: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 14,
        color: "#888",
    },
/* -------------------------------------------------------------------------- */
/* Viveros                                                                    */
/* -------------------------------------------------------------------------- */
    //Primera division
    headerSection: {
        paddingHorizontal: 16,
        paddingVertical: 2,
        gap: 6,
    },
    identification: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    id: {
        fontSize: 12,
        color: "#888",
    },
    editButton: {
        padding: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    statusSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
    },
    activeBadge: {
        backgroundColor: "#DDF3E4",
    },
    pausedBadge: {
        backgroundColor: "#FFF0D5",
    },
    finishedBadge: {
        backgroundColor: "#E5E5E5",
    },
    statusText: {
        fontSize: 12,
        fontWeight: "600",
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingVertical: 6,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    confirmDialog: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 20,
        gap: 16,
    },
    confirmTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222222",
    },
    confirmActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
    },
    cancelButton: {
        padding: 10,
    },
    finishButton: {
        backgroundColor: "#333333",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 6,
    },
    finishText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
    //Segunda division
    optionsSection: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 8,
    },
    optionsRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
    },
    option: {
        flex: 1,
        minHeight: 58,
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 8,
        padding: 6,
    },
    optionActive: {
        borderColor: "#4CAF50",
        backgroundColor: "#EAF5EC",
    },
    // Tercera división
    contentSection: {
        flex: 1,
        gap: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
});