import { execSync } from "child_process"

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
  