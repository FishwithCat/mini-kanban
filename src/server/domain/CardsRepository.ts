import CardsDomain from './CardsDomain';

/**
 * singleton
 */
class CardsRepository {
    private cardsDomainMap: Record<string, CardsDomain>

    constructor() {
        this.cardsDomainMap = {}
    }

    static getRepository = () => {
        let singleton;
        if (!singleton) {
            singleton = new CardsRepository()
        }
        return singleton
    }

    getCardsDomain = (streamId: string) => {
        if (!this.cardsDomainMap[streamId]) {
            this.cardsDomainMap[streamId] = new CardsDomain(streamId)
        }
        return this.cardsDomainMap[streamId]
    }
}

export default CardsRepository