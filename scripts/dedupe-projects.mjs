import fs from "fs";

for (const file of [
  "client/src/shared/projectEntriesA.ts",
  "client/src/shared/projectEntriesB.ts",
]) {
  let s = fs.readFileSync(file, "utf8");
  if (!s.includes("projectShape")) {
    s = 'import { projectEntry, shot } from "./projectShape";\n' + s;
  }
  s = s.replace(
    /\{\r?\n\s*src: ([^,]+),\r?\n\s*alt: ("(?:\\.|[^"])*"),\r?\n\s*caption: ("(?:\\.|[^"])*"),\r?\n\s*\},/g,
    "shot($1, $2, $3),",
  );
  for (const line of [
    '    categoryColor: "primary",\n',
    '    deployment: "Vercel",\n',
    '    status: "Live",\n',
    '    teamSize: "Solo",\n',
    '    category: "Web Application",\n',
  ]) {
    s = s.split(line).join("");
  }
  s = s.replace("export const projectEntries", "const projectEntriesRaw");
  const name = file.includes("EntriesA") ? "projectEntriesA" : "projectEntriesB";
  s = s.trimEnd() + `\n\nexport const ${name} = projectEntriesRaw.map(projectEntry);\n`;
  fs.writeFileSync(file, s);
  console.log(file, s.split("\n").length);
}
