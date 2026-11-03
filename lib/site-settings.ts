import { promises as fs } from "fs";
import path from "path";

const SETTINGS_PATH = path.join(process.cwd(), "data", "site-settings.json");

const defaultSettings = {
  contactEmail: process.env.CONTACT_TO_EMAIL ?? "r.alva@maxtermic.com",
};

async function ensureSettingsFile() {
  await fs.mkdir(path.dirname(SETTINGS_PATH), { recursive: true });

  try {
    await fs.access(SETTINGS_PATH);
  } catch {
    await fs.writeFile(SETTINGS_PATH, JSON.stringify(defaultSettings, null, 2), "utf8");
  }
}

export async function getSiteSettings() {
  await ensureSettingsFile();

  try {
    const content = await fs.readFile(SETTINGS_PATH, "utf8");
    const parsed = JSON.parse(content) as Partial<typeof defaultSettings>;

    return {
      contactEmail: process.env.CONTACT_TO_EMAIL ?? parsed.contactEmail ?? defaultSettings.contactEmail,
    };
  } catch {
    return { ...defaultSettings };
  }
}

export async function getContactRecipient() {
  const settings = await getSiteSettings();
  return settings.contactEmail || defaultSettings.contactEmail;
}

export async function setContactRecipient(email: string) {
  const normalizedEmail = email.trim();

  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error("Debes ingresar un correo válido para recibir las solicitudes.");
  }

  const nextSettings = {
    contactEmail: normalizedEmail,
  };

  await ensureSettingsFile();
  await fs.writeFile(SETTINGS_PATH, JSON.stringify(nextSettings, null, 2), "utf8");

  return normalizedEmail;
}
