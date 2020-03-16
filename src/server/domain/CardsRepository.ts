import CardsDomain from './CardsDomain';

/**
 * singleton
 */
class CardsRepository {
    private cardsDomainMap: Record<string, CardsDomain>
    private static instance: CardsRepository;

    constructor() {
        this.cardsDomainMap = {}
    }

    static getRepository = () => {
        if (!CardsRepository.instance) {
            CardsRepository.instance = new CardsRepository()
        }
        return CardsRepository.instance
    }

    getCardsDomain = (streamId: string) => {
        if (!this.cardsDomainMap[streamId]) {
            this.cardsDomainMap[streamId] = new CardsDomain(streamId)
        }
        return this.cardsDomainMap[streamId]
    }
}

export default CardsRepository