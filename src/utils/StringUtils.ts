export const buildQueryString = (params: Record<string, any>) => {
  if (!params) return "";

  const build = (obj: Record<string, any>, prefix = ""): string[] => {
    return Object.entries(obj).flatMap(([key, value]) => {
      const fullKey = prefix ? `${prefix}[${key}]` : key;

      if (Array.isArray(value)) {
        return value.map(
          (v) => `${encodeURIComponent(fullKey)}[]=${encodeURIComponent(v)}`
        );
      }

      if (value !== null && typeof value === "object") {
        return build(value, fullKey);
      }

      if (value === null || value === undefined) return [];

      return [`${encodeURIComponent(fullKey)}=${encodeURIComponent(value)}`];
    });
  };

  const query = build(params).join("&");
  return query ? `?${query}` : "";
};
