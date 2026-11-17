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
        backgroundColor: "transparent",
    },
    forecastValue: {
        fontSize: 14,
        fontWeight: "600",
    },
    todayForecastCard: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        gap: 16,
    },
    todayForecastMain: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        backgroundColor: "transparent",
    },
    todayForecastDescription: {
        flex: 1,
        gap: 5,
        backgroundColor: "transparent",
    },
    todayForecastTemperature: {
        fontSize: 32,
        fontWeight: "700",
    },
    todayForecastCondition: {
        fontSize: 14,
        textTransform: "capitalize",
    },
    todayForecastTemperatures: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: 1,
        paddingTop: 14,
        gap: 4,
        backgroundColor: "transparent",
    },
    todayForecastMetric: {
        flex: 1,
        alignItems: "center",
        gap: 6,
        backgroundColor: "transparent",
    },
    todayForecastMetricIcon: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "transparent",
    },
    dailyForecastList: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 10,
        paddingVertical: 4,
    },

    dailyForecastCard: {
        flex: 1,
        minWidth: 0,
        borderRadius: 14,
        borderWidth: 1,
        padding: 12,
        alignItems: "center",
        gap: 12,
    },
    dailyForecastHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    dailyForecastWeekday: {
        fontSize: 14,
        fontWeight: "700",
    },
    dailyForecastDate: {
        fontSize: 13,
    },
    dailyForecastTemperatures: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: "transparent",
    },
    dailyForecastMaximum: {
        fontSize: 16,
        fontWeight: "700",
    },
    dailyForecastMinimum: {
        fontSize: 14,
    },
    dailyForecastPrecipitation: {
        width: "100%",
        gap: 7,
        borderTopWidth: 1,
        paddingTop: 8,
        backgroundColor: "transparent",
    },
    dailyForecastPrecipitationItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        backgroundColor: "transparent",
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