const input1 = document.getElementById("input");
const infoText1 = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const title1 = document.getElementById("title");
const meaning1 = document.getElementById("meaning");
const audio1 = document.getElementById("audio");


async function fetchWord(word){
    try {
        infoText1.style.display = "block";
        meaningContainer.style.display = "none";
        infoText1.innerText = `Searching the meaning of ${word}`;

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then(res => res.json());

        if(result.title){
            meaningContainer.style.display = "none";
            infoText1.style.display = "none";
            title1.innerText = word;
            meaning1.innerText = "N/A";
            audio1.style.display = "none";
        }else{

            infoText1.style.display = "none";
            meaningContainer.style.display = "block";
            
            title1.innerText = result[0].word;
            meaning1.innerText = 
            result[0].meanings[0].definitions[0].definition;
            if(
                result[0].phonetics.length > 0 && result[0].phonetics[0].audio
            ){
                audio1.style.display = "inline-flex";
                audio.src = result[0].phonetics[0].audio;
            }else{
                audio1.style.display = "none";
            }

        }
    }catch (error){
        console.log(error);
        infoText1.innerText = "An error happened, try again later ";

    }
}

input1.addEventListener("keyup", (e) =>{
    if (e.target.value && e.key === "Enter") {
        fetchWord(e.target.value);
    }
});
