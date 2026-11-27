const DEFAULT_USER = "Usuario";

export const AUTO_VALUES: Record<string, () => string> = {
    authenticated_user: () => DEFAULT_USER,
    current_datetime: () => new Date().toISOString(),
};