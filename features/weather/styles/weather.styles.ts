import { StyleSheet } from "react-native";

export const weatherStyles = StyleSheet.create({
/* -------------------------------------------------------------------------- */
/* Quick-view                                                                 */
/* -------------------------------------------------------------------------- */
    quickCard: {
        backgroundColor: "transparent",
        borderRadius: 20,
        borderWidth: 1,
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
        fontSize: 18,
        fontWeight: "800",
    },
    sectionSubtitle: {
        fontSize: 11,
    },
    quickContent: {
        paddingHorizontal: 14,
        paddingTop: 14,
        paddingBottom: 14,
        gap: 16,
    },
    metricSection: {
        gap: 10,
    },
    categoryTitle: {
        fontSize: 14,
        fontWeight: "700",
    },
    metricsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    metricCard: {
        width: "48%",
        flexGrow: 1,
        borderRadius: 14,
        borderWidth: 1,
        padding: 12,
        gap: 6,
    },
    metricLabel: {
        fontSize: 11,
    },
    metricValue: {
        fontSize: 16,
        fontWeight: "700",
    },

/* -------------------------------------------------------------------------- */
/* Forecast                                                                   */
/* -------------------------------------------------------------------------- */
    forecastSection: {
        backgroundColor: "transparent",
        borderRadius: 20,
        borderWidth: 1,
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
        borderRadius: 14,
        borderWidth: 1,
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
        borderRadius: 14,
        borderWidth: 1,
    },
    dailyTemperature: {
        fontSize: 14,
        fontWeight: "700",
    },
    dailyMinimum: {
        fontSize: 12,
    },
    forecastMetric: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    forecastValue: {
        fontSize: 14,
        fontWeight: "600",
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
        backgroundColor: "transparent",
    },
    scrollButton: {
        width: 32,
        height: 32,
        borderRadius: 10,
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
    },
    precipitationValue: {
        fontSize: 11,
        fontWeight: "600",
    },
    dailyCardToday: {
        borderWidth: 1.5,
    },
    dailyTodayText: {
        fontWeight: "800",
    },
/* -------------------------------------------------------------------------- */
/* Weather metrics                                                            */
/* -------------------------------------------------------------------------- */
    weatherMetricSection: {
        backgroundColor: "transparent",
        borderRadius: 20,
        borderWidth: 1,
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 24,
        padding: 14,
        gap: 18,
        overflow: "hidden",
    },
    weatherMetricSectionCompact: {
        flex: 1,
        minWidth: 0,
        width: 0,
        marginHorizontal: 0,
        marginTop: 0,
        marginBottom: 0,
        padding: 12,
        gap: 12,
    },
    metricCardCompact: {
        width: "100%",
        flexGrow: 0,
        flexShrink: 1,
        borderRadius: 14,
        borderWidth: 1,
        padding: 12,
        gap: 6,
    },
    weatherMetricsRow: {
        flexDirection: "row",
        alignItems: "stretch",
        gap: 12,
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 24,
    },
    metricsGridCompact: {
        flexDirection: "column",
        width: "100%",
        gap: 8,
    },
});