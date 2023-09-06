import { execSync } from "child_process"
import { nanoid } from "nanoid"
import path from "path"

export type InputType = "names" | "file" | "squash"

export function am({ patchPath }: { patchPath: string }) {
  process.chdir("/verdaccio/storage")
  // execSync("git init")
  // execSync("git config user.name 'verdaccio'")
  // execSync("git config user.email 'verdaccio@email.com'")
  // execSync("git add .")
  // try {
    //   execSync('git commit -m "git commit before am"')
    // } catch {}
    execSync(`git am -3 ${patchPath}`)
  }
  
export function clear() {
  process.chdir("/verdaccio/storage")
  execSync("rm -rf ./.git/*")
  execSync("rm -rf ./data/*")
  execSync("git init")
  execSync("git config user.name 'verdaccio'")
  execSync("git config user.email 'verdaccio@email.com'")
}

export function generateOldPackagesPatch({ patchDir }: { patchDir: string }) {
  execSync(`rm -rf ${patchDir}/*`)
  
  process.chdir("/verdaccio/storage")
  const sha = execSync(
    'git commit-tree HEAD^{tree} -m "all old packages"'
    ).toString()
  if (/^fatal/.test(sha)) {
    throw new Error(sha)
  }
  const patchName = execSync(`git format-patch -1 -o ${patchDir} ${sha}`)
  .toString()
  .trim()
  
  const patchNameId = nanoid(8)
  const patchBaseName = `allOldPackages_${patchNameId}.patch`
  
  const patchNewName = path.join(patchDir, patchBaseName)
  execSync(`mv ${patchName} ${patchNewName}`)

  return patchNewName
}
  