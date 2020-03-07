import { useSelector } from "react-redux"
import { RootState } from "@/web/redux/create-store"

export const useCardDetail = (cardId: string) => {
    const cardDetail = useSelector((state: RootState) => {
        const detail = state.cardsReducer.cardDetail
        if (detail?.id !== cardId) return null
        return detail
    })

    return cardDetail
}