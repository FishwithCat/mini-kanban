import { useSelector } from "react-redux"
import { RootState } from "@/web/redux/create-store"

export const useCardDetail = (streamId: string, cardId: string) => {
    const cardDetail = useSelector((state: RootState) => state.cardsReducer.cardDetail)

    return cardDetail
}