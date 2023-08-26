import { execSync } from "child_process"

export function am({ patchPath }: { patchPath: string }) {
  process.chdir("/verdaccio/storage")
  execSync("git init")
  execSync("git config user.name 'verdaccio'")
  execSync("git config user.email 'verdaccio@email.com'")
  execSync("git add .")
  execSync('git commit -m "git commit before am"')
  execSync(`git am -3 ${patchPath}`)
}

export function clear() {
  process.chdir("/verdaccio/storage")
  execSync("rm -rf ./.git/*")
  execSync("git init")
  execSync("rm -rf ./data/*")
}
