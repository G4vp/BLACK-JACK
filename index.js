//SISTEMA DE CARTAS BLACK JACK - DECK DE 53 CARTAS
const SUITS = ['Clubs','Diamonds','Hearts','Spades'];
const CARDS = [[],[],[],[]]
let Start = '';
let total = 100;
let bet;

const numRandom = (max,min) => Math.floor(Math.random()*(max - min + 1)) + min //FUNCTION TO TAKE A RANDOM NUMBER
const getACard = () => {
    while(CARDS[0].length!==0 && CARDS[1].length !== 0 && CARDS[2].length !== 0 &&CARDS[3].length !== 0){    
        let firstNum = [numRandom(3,0)];
        let secondNum = [numRandom(12,0)];                  //YOU GET A CARD FROM DE DECK, AFTER GRAB THE CARD, THE CARD WILL BE REMOVE FROM THE DECK
        if(CARDS[firstNum][secondNum]){
            return CARDS[firstNum].splice(CARDS[firstNum].indexOf(CARDS[firstNum][secondNum]),1)[0];
        }
    }
}
const cardCounter = (a) => {    //FUNCTION TO COUNTER THE VALUE OF THE CARD
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
const verified = (x,y)=>{  //METHOD TO CHECK IF YOU LOSE OR WIN

    if(cardCounter(x) === cardCounter(y)){
        return('Draw');
    }
    else if(cardCounter(x) === 21 && cardCounter(y) !== 21 && x.length === 2){
        return('BLACK JACK - YOU WIN');
    }
    else if(cardCounter(x) === 21 && cardCounter(y) !== 21){
        return('21 - YOU WIN');
    }
    else if(cardCounter(x) > 21){
        return('You passed 21 - YOU LOSE ');
    }
    else if(cardCounter(y) === 21 && cardCounter(x) !== 21){
        return('21 for the dealer - YOU LOSE');
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
class Card{  //CONSTRUCTOR OF THE CARD
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
while(!(Start.toLowerCase() === 'yes' || Start.toLowerCase() === 'y')){ //START GAME
    Start = prompt(`
    START THE GAME 
    [Yes] [No]
    `);
}
while(total){
        
    const dealercards = [];
    const usercards = [];
    let dealercard = getACard();
    let usercard1 = getACard();
    let usercard2 = getACard();
    console.log(dealercard)
    do{bet = Number(prompt(
        `You have a total of $ ${total} in the bank.
        
        Amount for bet: `));
        if(bet > total){
            alert('You dont have enought money')
        }
        
    }while(bet > total || bet <= 0)
    total -= bet;
    dealercards[0] = [];
    dealercards[0].push(dealercard.suit);dealercards[0].push(dealercard.getPip);
    
    usercards[0] = [];usercards[1] = [];
    usercards[0].push(usercard1.suit);usercards[0].push(usercard1.getPip);
    usercards[1].push(usercard2.suit);usercards[1].push(usercard2.getPip);
    
    //VERIFICAR ESTA SHIT
    
    if(cardCounter(usercards) !== 21){
        let continuar = '';
        let indexcard = 2
        do{ 
            continuar = prompt(`
            ${dealercards.join(' | ')} 
            [DEALER CARD'S VALUE: ${cardCounter(dealercards)}]
            
            ${usercards.join(' | ')} 
            [USER CARD'S VALUE: ${cardCounter(usercards)}]
            
            Want another card?
            [Yes] [No]`)
            if(continuar.toLowerCase() === 'y' || continuar.toLowerCase() ==='yes'){
                let usercardRandom = getACard();
                usercards[indexcard] = [];
                usercards[indexcard].push(usercardRandom.suit);
                usercards[indexcard].push(usercardRandom.getPip);
                indexcard++;
            }
            if(cardCounter(usercards) >= 21){
                break
            }
        }while(continuar.toLowerCase() === 'y' || continuar.toLowerCase() ==='yes');
    }
    if(cardCounter(usercards) <= 21){
        let indexDealer = 1; 
        do{
            let dealercardRan = getACard();
            dealercards[indexDealer] = [];
            dealercards[indexDealer].push(dealercardRan.suit);
            dealercards[indexDealer].push(dealercardRan.getPip);
            indexDealer++
            alert(`
            ${dealercards.join(' | ')} 
            [DEALER CARD'S VALUE: ${cardCounter(dealercards)}]
            
            ${usercards.join(' | ')} 
            [USER CARD'S VALUE: ${cardCounter(usercards)}]
            `)
        }while(cardCounter(dealercards) < 16 && cardCounter(dealercards) < cardCounter(usercards))
    }
    alert(`
        Finals results:
        ${dealercards.join(' | ')} 
        [DEALER CARD'S VALUE: ${cardCounter(dealercards)}]
        
        ${usercards.join(' | ')}        
        [USERCARD'S VALUE: ${cardCounter(usercards)}]
        `);
    alert(verified(usercards,dealercards))
    if(verified(usercards,dealercards) == '21 - YOU WIN' || verified(usercards,dealercards) == 'You passed the dealer - YOU WIN' || verified(usercards,dealercards) == 'The dealer passed 21 - YOU WIN' || verified(usercards,dealercards) == 'BLACK JACK - YOU WIN'){
        total += (bet+bet)
    }
    else if(verified(usercards,dealercards) === 'DRAW'){
        total += bet
    }
}
    



