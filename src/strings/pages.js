const all ={
    'testimony':'testimony',
    'question':'question',
    'commentary':'commentary',
    'message':'message',
    'song':'song',
    'podcast':'podcast',
    'edification':'edification',
    'ebooks':'e-books',
    'series':'series',
    'playlist':'playlist',
    'podcast':'podcast',
    'home':'home',
    'read':'read-recommend',
    'listen':'listen-recommend',
    'watch':'watch-recommend',
    'topics':'topics',
    
}

module.exports.all = all

module.exports.read = [all.testimony,all.question,all.commentary,all.edification,all.edification,all.series]

module.exports.listen=[all.playlist,all.edification,all.song,all.message,all.podcast]

module.exports.watch=[all.edification,all.testimony,all.question,all.song]