export async function getModrinthDownloads(projectId?: string) {
  if (!projectId) return null;
  try {
    const res = await fetch(
      `https://api.modrinth.com/v2/project/${projectId}`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (typeof data.downloads !== "number") return null;
    const downloads = data.downloads as number;
    return downloads >= 1000
      ? `${(downloads / 1000).toFixed(1).replace(/\.0$/, "")}k+`
      : `${downloads}`;
  } catch {
    return null;
  }
}
