import fs from "node:fs";
import path from "node:path";
import { HOME_VIDEO } from "./constants";

/**
 * Serveur uniquement. Vrai si le fichier de la vidéo d'accueil est présent
 * dans /public. Sert à afficher la section vidéo et à garder la numérotation
 * des sections de la page d'accueil juste, avec ou sans vidéo.
 */
export function hasHomeVideo(): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", HOME_VIDEO.src));
}
