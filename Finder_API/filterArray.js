var lst = [
    'Dilated Peoples  Love And War (prod  by Evidence) HD',
    'Drake - Crew Love (feat. The Weeknd) HQ',
    'Mobb Deep - Give Up The Goods (Just Step) (Official Video) ft. Big Noyd',
    'Mobb Deep Feat. Big Noyd - Give Up The Goods (Just Step) With Lyrics',
    'Crew Love - Drake Ft The Weeknd (Lyrics)'
];
var wordCount = {};

lst.forEach(result =>{
    var words = result.split(' ');
    words.filter((word) =>{
        if(word.replace(/[^A-Za-z]/g, "").toLowerCase() in wordCount){
            wordCount[word.replace(/[^A-Za-z]/g, "").toLowerCase()]++;
        }
        else{
            wordCount[word.replace(/[^A-Za-z]/g, "").toLowerCase()] = 1;
        }
    });
});



console.log(wordCount);