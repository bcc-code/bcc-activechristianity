
const clusters = [
    { name: 'Red', leadColor: [255, 0, 0], quotes: [] },
    { name: 'Orange', leadColor: [255, 128, 0], quotes: [] },
    { name: 'Yellow', leadColor: [255, 255, 0], quotes: [] },
    { name: 'Chartreuse', leadColor: [128, 255, 0], quotes: [] },
    { name: 'Green', leadColor: [0, 255, 0], quotes: [] },
    { name: 'Spring green', leadColor: [0, 255, 128], quotes: [] },
    { name: 'Cyan', leadColor: [0, 255, 255], quotes: [] },
    { name: 'Azure', leadColor: [0, 127, 255], quotes: [] },
    { name: 'Blue', leadColor: [0, 0, 255], quotes: [] },
    { name: 'Violet', leadColor: [127, 0, 255], quotes: [] },
    { name: 'Magenta', leadColor: [255, 0, 255], quotes: [] },
    { name: 'Rose', leadColor: [255, 0, 128], quotes: [] },
    { name: 'Black', leadColor: [0, 0, 0], quotes: [] },
    { name: 'Grey', leadColor: [235, 235, 235], quotes: [] },
    { name: 'White', leadColor: [255, 255, 255], quotes: [] },
  ];
  
  function colorDistance(color1, color2) {
    const x =
      Math.pow(color1[0] - color2[0], 2) +
      Math.pow(color1[1] - color2[1], 2) +
      Math.pow(color1[2] - color2[2], 2);
    return Math.sqrt(x);
  }

  /* BUILDER */

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
  
  

  function oneDimensionSorting(quotes, dim) {
    return quotes
      .sort((quoteA, quoteB) => {
        if (rgbToHsl(quoteA.color)[dim] < rgbToHsl(quoteB.color)[dim]) {
          return -1;
        } else if ((quoteA.color)[dim] > rgbToHsl(quoteB.color)[dim]) {
          return 1;
        } else {
          return 0;
        }
      });
  }

  
  function sortWithClusters(quotesToSort) {

    quotesToSort.forEach(quote=>{
        let minDistance;
        let minDistanceClusterIndex;
        const {color}=quote

        clusters.forEach((cluster, clusterIndex) => {
            const distance = colorDistance(color, cluster.leadColor);

            if (typeof minDistance === 'undefined' || minDistance > distance) {
            minDistance = distance;
            minDistanceClusterIndex = clusterIndex;
            }
        });

        clusters[minDistanceClusterIndex].quotes.push(quote);
        
        })
        
        clusters.forEach((cluster) => {
            const dim = ['white', 'grey', 'black'].includes(cluster.name) ? 'l' : 's';
            cluster.quotes = oneDimensionSorting(cluster.quotes, dim)
          });

          return clusters
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

const sort= (data)=>{
    /*By colors */
    const colors=sortWithClusters(data)
    const byColors=colors.filter(c=>c.quotes.length>0)
    const sortedTNA=sortByTopicsAndAuthor(data)

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
        byColors:byColors,
        byTopics: sortedByTopics,
        byFeaturedAuthors:featuredAuthorQuotes,
    })
}

module.exports = sort