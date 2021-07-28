const formatsAll = {
    "edification":{
        keyId: 108206,
        keyname: "edification",
    },
    "testimony":{
        keyId: 345,
        keyname: "testimony",
    },
    "question":{
        keyId: 1503,
        keyname: "question",
    },
  "commentary":{
      keyId: 108201,
      keyname: "commentary",
  },
  "animation":{
    keyId: 108212,
    keyname: "animation",
  },
  "song": {
      keyId: 108204,
      keyname: "song",
  },
  "message":{
        keyId: 36170,
        keyname: "message",
    },
  "interview":{
    keyId: 108211,
    keyname: "interview",
    }
}

if(process.env.LISTEN_SECTION==="all" || process.env.LISTEN_SECTION==="podcast_only"){
    formatsAll["podcast"]={
        keyId: 108205,
        keyname: "podcast"
    }
}
const typesAll={
  "read":{
      keyId:108196,
      keyname:"read"
  },
  "watch":{
      keyId:108198,
      keyname:"watch"
  },
  "listen":{
      keyId:108197,
      keyname:"listen"
  }
}

const groupAll={
  format:4,  
  type:5
}

const formatsIds = {}
const typeIds = {}

module.exports.formatsAll=formatsAll
module.exports.typesAll = typesAll
module.exports.groupAll=groupAll

module.exports.formatScope = Object.keys(formatsAll).map(key=>{
    const id =formatsAll[key].keyId
    formatsIds[id]=formatsAll[key]
    return formatsAll[key]
})
module.exports.typeScope = Object.keys(typesAll).map(key=>{
    const id =typesAll[key].keyId
    typeIds[id]=typesAll[key]
    return typesAll[key]
})

module.exports.formatsIds=formatsIds
module.exports.typeIds=typeIds

module.exports.podcast={
    intro_post:195759,
    topic_id:108205
}