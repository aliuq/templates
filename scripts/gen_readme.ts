import fs from 'fs-extra'

const files = await fs.readdir('templates')

for await (const file of files) {
  const exists = await fs.pathExists(`templates/${file}/README.md`)
  if (!exists) {
    const pkg = await fs.readJSON(`templates/${file}/package.json`)
    const name = pkg.name.split(/[_-]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
    const readme = format(`
    # ${name}

    ${pkg.description}

    ${pkg.dependencies ? `
      ## Dependencies
      \`\`\`json
      ${JSON.stringify(pkg.dependencies, null, 2)}
      \`\`\`
    ` : ''}

    ${pkg.devDependencies ? `
      ## Dev Dependencies
      \`\`\`json
      ${JSON.stringify(pkg.devDependencies, null, 2)}
      \`\`\`
    ` : ''}

    ${pkg.scripts ? `
      ## Scripts

      \`\`\`json
      ${JSON.stringify(pkg.scripts, null, 2)}
      \`\`\`
    ` : ''}
  `) + '\n'
    
    await fs.writeFile(`templates/${file}/README.md`, readme)
  }
}


function format(str) {
  let flag = false
  return str
    .trim()
    .replace(/^(.*?)$/gm, (_, s) => {
      let newS = s.trim()
      
      if (newS.startsWith('{')) {
        flag = true
        return newS
      }
      if (newS.startsWith('}')) {
        flag = false
        return newS
      }
      if (flag === true) {
        return s
      }      
      return newS
    })
    .replace(/^(.*?)\n+(##.*?)$/gms, '$1\n\n$2')
    .replace(/^(#.*?)\n+(.*?)$/gms, '$1\n\n$2')
}
