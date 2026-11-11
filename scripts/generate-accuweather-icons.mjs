
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const iconsDirectory = path.resolve("assets/weather/icons");
const outputDirectory = path.resolve("features/weather/constants");
const outputFile = path.join(
    outputDirectory,
    "accuweather-icons.ts"
);

const files = await readdir(iconsDirectory);

const iconFiles = files
    .filter((file) => /^\d{2}\.svg$/i.test(file))
    .sort((a, b) => Number.parseInt(a) - Number.parseInt(b));

if (iconFiles.length === 0) {
    throw new Error("No se encontraron archivos SVG de dos dígitos.");
}

const iconEntries = await Promise.all(
    iconFiles.map(async (file) => {
        const code = Number.parseInt(file.slice(0, 2), 10);

        const content = await readFile(
            path.join(iconsDirectory, file),
            "utf8"
        );

        if (!content.includes("<svg")) {
            throw new Error(
                `El archivo ${file} no parece ser un SVG válido.`
            );
        }

        return [code, content];
    })
);

const icons = Object.fromEntries(iconEntries);

await mkdir(outputDirectory, { recursive: true });

const generatedContent = [
    "// Archivo generado automáticamente. No editar manualmente.",
    "export const ACCUWEATHER_ICONS: Readonly<Record<number, string>> = {",
    ...Object.entries(icons).map(
        ([code, svg]) => `    ${code}: ${JSON.stringify(svg)},`
    ),
    "};",
    "",
].join("\n");

await writeFile(outputFile, generatedContent, "utf8");

console.log(`Catálogo generado: ${outputFile}`);
console.log(`Iconos incorporados: ${iconFiles.length}`);
