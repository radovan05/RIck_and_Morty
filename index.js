const wrapper = document.querySelector('.wrapper');
const maxPages =42;
const pageSelector= document.querySelector('.page-selector');
const goBack= document.querySelector('.goback');
const goUp= document.querySelector('.goup');
const pageNumbers= document.querySelectorAll('.page-number')
// const pageNumber= document.querySelector('.page-number');
//pages 42
let pageNumber=1;
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
        window.localStorage.setItem("pageNumber",pageNumber);
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
        pageNumber=parseInt(window.localStorage.getItem('pageNumber'));
        // pageNumber.textContent=startPageNumber;
       if(pageNumber>=3 && pageNumber<=40 ){
         pageNumbers[0].textContent=pageNumber-2;
        pageNumbers[1].textContent=pageNumber-1;
        pageNumbers[2].textContent=pageNumber;
        pageNumbers[3].textContent=pageNumber+1;
        pageNumbers[4].textContent=pageNumber+2;
       }else if(pageNumber<3){
        pageNumbers[0].textContent=1;
        pageNumbers[1].textContent=2;
        pageNumbers[2].textContent=3;
        pageNumbers[3].textContent=4;
        pageNumbers[4].textContent=5;
       }else if(pageNumber>40 ){
        pageNumbers[0].textContent=38;
        pageNumbers[1].textContent=39;
        pageNumbers[2].textContent=40;
        pageNumbers[3].textContent=41;
        pageNumbers[4].textContent=42;
       }
       
        selectPage();
        getCharacters(pageNumber);
    }else{ 
        getCharacters(1);
    }
    
    
})

function selectPage(){ 
    pageNumbers.forEach( (el)=>{
        if(pageNumber===parseInt(el.textContent)){
            el.classList.add('selected')
        }else{ 
            el.classList.remove('selected')
        }
    })
}




goBack.addEventListener('click',()=>{
    if(parseInt(pageNumbers[0].textContent)>1){
        pageNumbers.forEach((el)=>{
            el.textContent=parseInt(el.textContent)-1;  
        })
        selectPage();
    }
})
goUp.addEventListener('click',()=>{
    if(parseInt(pageNumbers[pageNumbers.length-1].textContent)<maxPages){
            for(let i =0 ; i < pageNumbers.length; i++){
                pageNumbers[i].textContent = parseInt(pageNumbers[i].textContent)+1;
                
            }
           selectPage();
    } 
    
})


for(let i =0 ; i <pageNumbers.length ; i ++)
{
    pageNumbers[i].addEventListener('click',()=>{
       pageNumber=parseInt(pageNumbers[i].textContent);
       getCharacters(pageNumber)
       selectPage();
       if(i===4){
        if(parseInt(pageNumbers[pageNumbers.length-1].textContent)<maxPages){
            for(let i =0 ; i < pageNumbers.length; i++){
                pageNumbers[i].textContent = parseInt(pageNumbers[i].textContent)+1;
                
            }
           selectPage();
        } 
       }else if(i===0){
        if(parseInt(pageNumbers[0].textContent)>1){
            pageNumbers.forEach((el)=>{
                el.textContent=parseInt(el.textContent)-1;  
            })
            selectPage();
        }
       }
    })
}






const getToFirstPage = document.querySelector(".header > p"); 
getToFirstPage.addEventListener('click', ()=>{
    pageNumber = 1;
    selectPage();
    
    getCharacters(1);
})
//new paging system

// treba mi selected page da svetli tj dobija svoju classu 
// treba da se pojavljuju strane levo desno puno pravila isk isk








