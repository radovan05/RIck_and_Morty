const wrapper = document.querySelector('.wrapper');
const maxPages =42;
const pageSelector= document.querySelector('.page-selector');
const goBack= document.querySelector('.goback');
const goUp= document.querySelector('.goup');
const pageNumber= document.querySelector('.page-number');
//pages 42
let startPageNumber=1;
let likedCards = []; 
if(!window.localStorage.getItem('likedCards')){
    window.localStorage.setItem("likedCards",[])
}else{ 
   likedCards= window.localStorage.getItem('likedCards')
}

const GET_ONE ="https://rickandmortyapi.com/api/character/1";//umesto jedan ide num koji nam treba
// JSON.stringify i JSON.parse  i na
function likeAnCard(id){ 
    likedCards +=`${id},`;
    window.localStorage.removeItem('likedCards')
    window.localStorage.setItem("likedCards",likedCards)
}
function unlikeAnCard(id){
    likedCards= window.localStorage.getItem('likedCards')
    let pom=likedCards.split(',')
    for(let i = 0 ; i < pom.length; i++){
        if(parseInt(pom[i])===id){
            pom.splice(i,1);
        }
    }
    likedCards = pom.join(',');
    window.localStorage.removeItem('likedCards')
    window.localStorage.setItem("likedCards",likedCards)
}
function checkIfLiked(id){
    likedCards= window.localStorage.getItem('likedCards')
    let pom=likedCards.split(',')
    for(let i = 0 ; i < pom.length; i++){
        if(parseInt(pom[i])===id){
            return true;
        }
    }
    return false; 
}




function makeCard(card){ 
    const cards = document.createElement('div');

    const picture = document.createElement('img');
    picture.src = card.image;

    const smallDiv= document.createElement('div');

    const text = document.createElement('p');
    text.textContent = card.name;

    const button =document.createElement('button');
    let like = "👍";
    button.innerHTML= `${like}`;
    if(checkIfLiked(card.id)){
        button.classList.add('liked');
    }else{ 
        button.classList.add('like-btn');
    }
   

    smallDiv.append(text,button); 
    cards.append(picture, smallDiv);
    cards.classList.add('card')
    wrapper.append(cards);
     
    button.addEventListener('click', ()=>{
      if(button.classList.contains('like-btn')){
        button.classList.add('liked');
        button.innerHTML= `${like}`;
        button.classList.remove('like-btn');
        likeAnCard(card.id);
      }else{ 
        button.classList.add('like-btn');
        button.innerHTML= `${like} `;
        button.classList.remove('liked');
        unlikeAnCard(card.id)
      }
    })

    button.addEventListener('mouseover', ()=>{
        if(button.classList.contains('like-btn')){
          button.innerHTML= `${like} Like`;
        }else{ 
          button.innerHTML= `${like} Unlike`;
        }
      })
      button.addEventListener('mouseleave', ()=>{
          button.innerHTML= `${like} `; 
          
      })
    

      picture.addEventListener('click',(el)=>{
        window.localStorage.removeItem('showDetails')
        window.localStorage.setItem("showDetails",JSON.stringify(card));
        window.localStorage.removeItem('pageNumber')
        window.localStorage.setItem("pageNumber",parseInt(pageNumber.textContent));
        location.replace('./info-page.html')
      })
}

function getCharacters(page){ 
    const GET_PAGE= `https://rickandmortyapi.com/api/character?page=${page}`;
    fetch(GET_PAGE).then(res => res.json()).then(el => formCards(el)).catch(er=> console.log(er))
}
function formCards(characters){
    wrapper.innerHTML='';
    const cards= characters.results;
    cards.forEach(el => {
        makeCard(el)
    });
}


window.addEventListener('load', ()=>{
    console.log("aaaaaaa")
    if(window.localStorage.getItem('pageNumber')){
        startPageNumber=window.localStorage.getItem('pageNumber');
        pageNumber.textContent=startPageNumber;
        getCharacters(startPageNumber);
    }else{ 
        getCharacters(1);
    }
    
    
})






goBack.addEventListener('click',()=>{
    if(parseInt(pageNumber.textContent)>1){
        pageNumber.textContent=parseInt(pageNumber.textContent)-1;  
       
        getCharacters(parseInt(pageNumber.textContent));
       
    }
})
goUp.addEventListener('click',()=>{
    if(parseInt(pageNumber.textContent)<maxPages){
        pageNumber.textContent=parseInt(pageNumber.textContent)+1;
      
        getCharacters(parseInt(pageNumber.textContent));
    } 
    
})

const getToFirstPage = document.querySelector(".header > p"); 
getToFirstPage.addEventListener('click', ()=>{
    pageNumber.textContent=1;
    getCharacters(1);
})

// for(let i =0 ;  i< likeButtons.length; i ++){ 
    // likeButtons[1].addEventListener('click',()=>{
    //     console.log(i)
    // })
// }


// let cardsRemove= document.querySelectorAll('.card');
// console.log(cardsRemove)

// const buttonss= document.querySelectorAll('.body-div > .wrapper > .card > div > button ');
// console.log(buttonss)
// const buttons = document.querySelectorAll(".like-btn");
// console.log(buttons)
// const clsBtn = document.getElementsByClassName('like-btn')
// console.log(clsBtn);

// clsBtn[1]?.addEventListener('click',()=>{
//     console.log("a")
// })
// for(let i=0; i < likeButtons.length; i++){ 
//     console.log("dsadasdas")
//     likeButtons[i].addEventListener('click', ()=>{
//         console.log(i)
        
      
//     })
// }




