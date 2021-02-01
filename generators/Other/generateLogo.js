const fs = require('fs')

module.exports =()=>{
    fs.copyFile(`./generators/Other/logo/${process.env.LANG_CODE}.tsx`, './src/images/ACLogo/index.tsx', (err) => { 
        if (err) { 
          console.log("Error Found:", err); 
        } 
        else { 
        
          // Get the current filenames 
          // after the function 
          console.log(`copied file ${process.env.LANG_CODE}.tsx to src/images/ACLogo/index.tsx`)
        } 
      }); 
}