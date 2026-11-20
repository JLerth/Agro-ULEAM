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
    contentSection: {
        flex: 1,
    }, 
});