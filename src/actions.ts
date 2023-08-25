import { execSync } from "child_process"

export function am({ patchPath }: { patchPath: string }) {
  process.chdir("/verdaccio/storage")

  execSync(`git am ${patchPath}`)
}
