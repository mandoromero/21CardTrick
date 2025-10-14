import cardImages from "../src/components/CardImages/CardImages";

const allCardsData= cardImages.map((card) => ({
    name: card.name, 
    src: card.src,
}));

export default allCardsData;