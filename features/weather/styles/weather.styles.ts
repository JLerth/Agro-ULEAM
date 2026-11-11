import { StyleSheet } from "react-native";

export const weatherStyles = StyleSheet.create({
/* -------------------------------------------------------------------------- */
/* Quick-view                                                                 */
/* -------------------------------------------------------------------------- */
    quickCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 20,
        overflow: "hidden",
    },
    quickHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 18,
    },
    quickHeaderText: {
        flex: 1,
        gap: 4,
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: "700",
        color: "#111827",
    },
    sectionSubtitle: {
        fontSize: 12,
        color: "#6B7280",
    },
    quickContent: {
        paddingHorizontal: 14,
        paddingBottom: 14,
        gap: 16,
    },
    metricSection: {
        gap: 10,
    },
    categoryTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#374151",
    },
    metricsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    metricCard: {
        width: "48%",
        flexGrow: 1,
        backgroundColor: "#F8FAFC",
        borderRadius: 12,
        padding: 12,
        gap: 6,
    },
    metricLabel: {
        fontSize: 12,
        color: "#64748B",
    },
    metricValue: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },

/* -------------------------------------------------------------------------- */
/* Forecast                                                                   */
/* -------------------------------------------------------------------------- */
    forecastSection: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 24,
        padding: 14,
        gap: 18,
        overflow: "hidden",
    },
    forecastHeader: {
        marginBottom: 2,
    },
    forecastHeaderText: {
        gap: 4,
    },
    forecastGroup: {
        gap: 12,
    },
    hourlyList: {
        gap: 10,
        paddingRight: 16,
    },
    hourlyCard: {
        width: 125,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        padding: 12,
        gap: 12,
    },
    dailyList: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 6,
        paddingVertical: 12,
    },

    dailyCard: {
        flex: 1,
        minWidth: 0,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        paddingVertical: 14,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    dailyTemperature: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
    },

    dailyMinimum: {
        fontSize: 13,
        color: "#64748B",
    },
    forecastMetric: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",

    },
    forecastValue: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },
    forecastTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    scrollHint: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    scrollButton: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
    },
    dailyPrecipitation: {
        alignItems: "center",
        gap: 5,
        backgroundColor: "transparent",
        width: "100%",
    },

    precipitationLabel: {
        fontSize: 10,
        color: "#64748B",
    },

    precipitationValue: {
        fontSize: 12,
        fontWeight: "600",
        color: "#64748B",
    },
    dailyCardToday: {
        backgroundColor: "#EFF6FF",
        borderColor: "#3B82F6",
        borderWidth: 2,
    },

    dailyTodayText: {
        color: "#2563EB",
        fontWeight: "800",
    },
});