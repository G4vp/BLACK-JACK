//SISTEMA DE CARTAS BLACK JACK - DECK DE 53 CARTAS
const SUITS = ['Clubs','Diamonds','Hearts','Spades'];
const CARDS = [[],[],[],[]]
const numRandom = (max,min) => Math.floor(Math.random()*(max - min + 1)) + min
const getACard = () => {
    while(CARDS[0].length!==0 && CARDS[1].length !== 0 && CARDS[2].length !== 0 &&CARDS[3].length !== 0){    
        let firstNum = [numRandom(3,0)];
        let secondNum = [numRandom(12,0)];
        if(CARDS[firstNum][secondNum]){
            return CARDS[firstNum].splice(CARDS[firstNum].indexOf(CARDS[firstNum][secondNum]),1)[0];
        }
    }
}
const cardCounter = (a) => {
    let total = 0
    a.forEach((el) => {
        if(el[1] === 'KING' || el[1] === 'JACK' || el[1] === 'QUEEN'){
            total += 10
        }
        else if(el[1] === 'ACE'){
            if(total <= 10){
                total += 11;
            }
            else{total += 1}
        }
        else if(el[1] > 0){
            total += el[1]
        }
    })
    return total
}
const verified = (x,y)=>{
    if(cardCounter(x) == 21 && cardCounter(y) == 21){
        return('Draw');
    }
    else if(cardCounter(x) == 21 && cardCounter(y) != 21){
        return('BLACK JACK - YOU WIN');
    }
    else if(cardCounter(x) > 21){
        return('You passed 21 - YOU LOSE ');
    }
    else if(cardCounter(y) == 21 && cardCounter(x) != 21){
        return('BLACK JACK for the dealer - YOU LOSE');
    }
    else if(cardCounter(y) > 21){
        return('The dealer passed 21 - YOU WIN')
    }
    else if(cardCounter(y) > cardCounter(x)){
        return('The dealer passed you - YOU LOSE');
    }
    else if(cardCounter(y) < cardCounter(x)){
        return('You passed the dealer - YOU WIN' );
    }
}
class Card{
    constructor(suit){
        this.suit = suit;
        this.pip = null;
        
    }
    get getPip(){
        return this.pip;
    }
    set setPip(pip){
        this.pip = pip;
    }
}
SUITS.forEach((value,index) => {
    for(let i  = 1; i <= 13; i++){
        
        const newCard = new Card(value)
        const checkPip = {
        
            1 : 'ACE',
            11: 'JACK',
            12: 'QUEEN',
            13: 'KING',
        }
        newCard.setPip = checkPip[i] || i;
        CARDS[index].push(newCard);
    }
})
// ahora toca el juego
let Start = '';
while(!(Start.toLowerCase() === 'yes' || Start.toLowerCase() === 'y')){
    Start = prompt(`
    START THE GAME 
    [Yes] [No]
    `);
}
let total = 100;

while(total){
    let bet;
    do{bet = Number(prompt(
        `You have a total of $ ${total} in the bank.
        
        Amount for bet: `));
        if(bet > 1000){
            alert('You dont have enought money')
        }
    }while(bet > 1000)
    total -= bet;
    
    const dealercards = [];
    const usercards = [];
    
    let dealercard = getACard();
    dealercards[0] = [];
    dealercards[0].push(dealercard.suit);dealercards[0].push(dealercard.getPip);
        
    let usercard1 = getACard();
    let usercard2 = getACard();
    usercards[0] = [];usercards[1] = [];
    usercards[0].push(usercard1.suit);usercards[0].push(usercard1.getPip);
    usercards[1].push(usercard2.suit);usercards[1].push(usercard2.getPip);
    
    //VERIFICAR ESTA SHIT
    
    if(cardCounter(usercards) !== 21){
        let continuar = '';
        let indexcard = 2
        do{ 
            continuar = prompt(`
            ${dealercards} ${cardCounter(dealercards)}
            
            ${usercards} ${cardCounter(usercards)}
            
            Want another card?
            [Yes] [No]
            `)
            if(continuar === 'y'){
                let usercardRandom = getACard();
                usercards[indexcard] = [];
                usercards[indexcard].push(usercardRandom.suit);
                usercards[indexcard].push(usercardRandom.getPip);
                indexcard++;
            }
            if(cardCounter(usercards) >= 21){
                break
            }
        }while(continuar === 'y');
    }
    let indexDealer = 1; 
    do{
        let dealercardRan = getACard();
        dealercards[indexDealer] = [];
        dealercards[indexDealer].push(dealercardRan.suit);
        dealercards[indexDealer].push(dealercardRan.getPip);
        indexDealer++
        alert(`
        ${dealercards} ${cardCounter(dealercards)}
        
        ${usercards} ${cardCounter(usercards)}
        
        `)
    }while(cardCounter(dealercards) < 16)

    alert(`
        Finals results:
        ${dealercards} ${cardCounter(dealercards)}
        
        ${usercards} ${cardCounter(usercards)}
        
        `);
    
    alert(verified(usercards,dealercards))
    

    if(verified(usercards,dealercards) == 'BLACK JACK' || verified(usercards,dealercards) == 'You passed the dealer'){
        total += (bet+bet+bet)
    }
}
    



