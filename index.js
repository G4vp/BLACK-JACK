const SUITS = ['Clubs','Diamonds','Hearts','Spades'];
const CARDS = [[],[],[],[]]
const numRandom = (max,min) => Math.floor(Math.random()*(max - min + 1)) + min
const getACard = () => {

    while(true){    
        let firstNum = [numRandom(3,0)];
        let secondNum = [numRandom(12,0)];

        if(CARDS[firstNum][secondNum]){
            let CardString = `
--------------
|            | 
|   ${CARDS[firstNum][secondNum].suit}      
|            |
|   ${CARDS[firstNum][secondNum].getPip}      
|            |
|            |                                                
|            |
--------------`;
            CARDS[firstNum].splice(CARDS[firstNum].indexOf(CARDS[firstNum][secondNum]),1)[0];
            return CardString; 
        }
        if(CARDS[0].length==0 && CARDS[1].length == 0 && CARDS[2].length == 0 &&CARDS[3].length == 0){
            break;
        }
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
        CARDS[index].push(newCard)
    }
})



console.log(CARDS)

console.log(CARDS[0].length,CARDS[1].length,CARDS[2].length,CARDS[3].length)










