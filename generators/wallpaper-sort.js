const hueClusters = [
    {
        name:'Rose',
        slug:"dusky-rose",
        color:[190,107,109],
        "hue-max":361,
        'hue-min': 320,
        quotes:[]
        },
        {
        name:'Purple',
        slug:'purple',
        color:[156, 109, 171],
        "hue-max":320,
        'hue-min':260,
        quotes:[]
        },
        {
        name:'Blue',
        slug:'wild-blue',
        color:[114, 148, 186],
        "hue-max":260,
        'hue-min':210,
        quotes:[]
        },
        {
        name:'Mint Blue',
        slug:'mint-blue',
        color:[95, 185, 185],
        "hue-max":210,
        'hue-min':160,
        quotes:[]
        },
        {
        name:'Green',
        slug:'green',
        color:[169, 198, 83],
        "hue-max":160,
        'hue-min':60,
        quotes:[]
        },
        {
        name:'Yellow',
        slug:'yellow',
        color:[207, 189, 74],
        "hue-max":60,
        'hue-min':40,
        quotes:[]
        },
        {
        name:'Orange',
        slug:'orange',
        color:[207, 114, 74],
        "hue-max":40,
        "hue-min":0,
        quotes:[]
        }
]

const brightnessClusters = [
    {
        name:'Dark',
        slug:'dark',
        color:[6, 5, 4],
        "brightness-max":30,
        'brightness-min':0,
        quotes:[]
        },
        {
        name:'Light',
        slug:'light',
        color:[209, 209, 209],
        "brightness-max":100,
        "brightness-min":70,
        quotes:[]
        }
]

function rgbToHsl(c) {
    var r = c[0] / 255, g = c[1] / 255, b = c[2] / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return new Array(h * 360, s * 100, l * 100);
  }
  
  function sortArrayByHsl(rgbArr) {
  
    var sortedRgbArr = rgbArr.map(function (q, i) {
        const hslColor=rgbToHsl(q.color)
        const hue=hslColor[0]
        const brightness=hslColor[2]
        hueClusters.forEach((c,k)=>{
            
            if(hue<c["hue-max"] && hue>c["hue-min"] ){
                hueClusters[k].quotes.push(q)
            }
        })

        if(brightness<brightnessClusters[0]["brightness-max"]){
            brightnessClusters[0].quotes.push(q)
        }
        if(brightness>brightnessClusters[1]["brightness-min"]){
            brightnessClusters[0].quotes.push(q)
        }
        // Convert to HSL and keep track of original indices
        return { color: hslColor, index: i };
    }).sort(function (c1, c2) {
        // Sort by hue
        return c1.color[0] - c2.color[0];
    }).map(function (data) {
        // Retrieve original RGB color
        return ({...rgbArr[data.index],hsl:data.color});
    }).reverse();
  
    return ({
        sortedRgbAllQuotes:sortedRgbArr,
        byHue:hueClusters,
        byBrightness:brightnessClusters

    })
  }
  


  const sortByTopicsAndAuthor = (quotes)=>{
    const sortedByTopics = {}
    const sortedByAuthor={}
    quotes.forEach(q => {
        const {topics,author}=q
        if(topics && topics.length>0){
            topics.forEach(t => {
                if(sortedByTopics[t.id]){
                    sortedByTopics[t.id].quotes.push(q)
                } else {
                    sortedByTopics[t.id]={...t,quotes:[q]}
                }
            });
        }
        if(author){
            if(sortedByAuthor[author.id]){
                sortedByAuthor[author.id].quotes.push(q)
            } else {
                sortedByAuthor[author.id]={...author,quotes:[q]}
            }
        }
    });
    return ({
        sortedByTopics,
        sortedByAuthor
    })
}

const sort= (quoteArray)=>{
    /*By colors */
    const sortedColors=sortArrayByHsl(quoteArray)
    const sortedTNA=sortByTopicsAndAuthor(sortedColors.sortedRgbAllQuotes)

    /*By Featured Authors*/
    const selectedAuthors = ['108501','1508', '1597','1773', '1511','1557','108500','1546']
    const featuredAuthorQuotes =selectedAuthors
        .map(id=>{
            const a =sortedTNA.sortedByAuthor[id]
            return {...a,nrOfQuotes:a.quotes.length}
        })
        .sort((quoteA,quoteB)=>{
            if (quoteA.nrOfQuotes < quoteB.nrOfQuotes) {
                return 1;
            } else if (quoteA.nrOfQuotes > quoteB.nrOfQuotes) {
                return -1;
            } else {
                return 0;
            }
    })

    /*merge all comfort related posts*/

    const getComfortedQuotes=()=>{
        const comfortAndStrengthTopicIds=['1517','117','1516','1522','17132','186']
        const quotes=[]
        comfortAndStrengthTopicIds.forEach(id=>{
        quotes.push(...sortedTNA.sortedByTopics[id].quotes)
        })
    return quotes
    }

    const comfortQuotes=getComfortedQuotes()

    sortedTNA.sortedByTopics['comfort-and-strenth']={
        name:'Comfort and strength',
        slug:'comfort-and-strength',
        quotes:comfortQuotes
    }

    /*sort by topics*/
    const sortedByTopics = Object.keys(sortedTNA.sortedByTopics)
        .map(k=>{
            const author = sortedTNA.sortedByTopics[k]
            return ({...author,nrOfQuotes:sortedTNA.sortedByTopics[k].quotes.length})
        })
        .sort((quoteA,quoteB)=>{
            if (quoteA.nrOfQuotes < quoteB.nrOfQuotes) {
                return 1;
            } else if (quoteA.nrOfQuotes > quoteB.nrOfQuotes) {
                return -1;
            } else {
                return 0;
            }
        })


    return ({
        ...sortedColors,
        byTopics: sortedByTopics,
        byFeaturedAuthors:featuredAuthorQuotes,
    })
}

module.exports = sort
