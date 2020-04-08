import CardsDomain from './CardsDomain';


type StreamId = string;

/**
 * singleton
 */
class CardsRepository {
    private cardsDomainMap: Record<StreamId, CardsDomain>
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

    getCardsDomain = (streamId: StreamId) => {
        if (!this.cardsDomainMap[streamId]) {
            this.cardsDomainMap[streamId] = new CardsDomain(streamId)
        }
        return this.cardsDomainMap[streamId]
    }
}

export default CardsRepository